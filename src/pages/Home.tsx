import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Card from "../components/Card";
import { Transaction, ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { fetchProof, reset } from "../features/zkp/zkpSlice";
import { AppDispatch, RootState } from "../store";
import ProofDisplay from "../components/ProofDisplay";
import TransactionDetails from "../components/TransactionDetails";
import WorkflowDiagram from "../components/WorkflowDiagram";
import { useToast } from "@chakra-ui/react";
import { useEthereum } from "../contexts/EthereumContext";
import axios from "axios";
import { fetchTransaction } from "../features/zksync/transactionSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const { signer } = useEthereum();
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS!;
  const [abi, setAbi] = useState<ethers.InterfaceAbi | undefined>(undefined);
  const { proof } = useSelector((state: RootState) => state.zkp);

  useEffect(() => {
    const fetchABI = async () => {
      try {
        const response = await fetch("/ZkLightClient.json");
        const json = await response.json();
        setAbi(json.abi);
      } catch (error) {
        console.error("Failed to fetch ABI", error);
      }
    };

    fetchABI();
  }, []);

  const checkTransaction = async (txHash: string) => {
    const zksyncProviderUrl = process.env.REACT_APP_ZKSYNC_RPC_URL!;
    const sepoliaProviderUrl = process.env.REACT_APP_SEPOLIA_RPC_URL!;
    const graphQLUrl = process.env.REACT_APP_GRAPHQL_URL!;

    const zksyncProvider = new ethers.JsonRpcProvider(zksyncProviderUrl);

    try {
      const tx = await zksyncProvider.getTransaction(txHash);
      if (!tx) throw new Error("Transaction not found.");
      if (tx.type !== 2)
        throw new Error("This is not an EIP-1559 transaction.");

      const response = await axios.post(zksyncProviderUrl, {
        jsonrpc: "2.0",
        id: 1,
        method: "zks_getTransactionDetails",
        params: [txHash],
      });

      const ethCommitTxHash = response.data.result?.ethCommitTxHash;
      if (!ethCommitTxHash)
        throw new Error("This transaction has not been committed to L1 yet.");

      const sepoliaProvider = new ethers.JsonRpcProvider(sepoliaProviderUrl);
      const commitTx = await sepoliaProvider.getTransaction(ethCommitTxHash);
      if (!commitTx || !commitTx.blockNumber)
        throw new Error("Commit transaction not found.");

      const queryGTE = `
  query historyBlocksRootGTE {
    historyBlocksRootSaveds(where: {id_gte: "${commitTx.blockNumber}"}, orderBy: id, orderDirection: desc) {
      id
      blocksRoot
    }
  }`;

      const queryLTE = `
  query historyBlocksRootLTE {
    historyBlocksRootSaveds(where: {id_lte: "${commitTx.blockNumber}"}, orderBy: id, orderDirection: desc) {
      id
      blocksRoot
    }
  }`;

      const [responseGTE, responseLTE] = await Promise.all([
        axios.post(
          graphQLUrl,
          { query: queryGTE },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        ),
        axios.post(
          graphQLUrl,
          { query: queryLTE },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        ),
      ]);

      const resultsGTE = responseGTE.data.data.historyBlocksRootSaveds;
      const resultsLTE = responseLTE.data.data.historyBlocksRootSaveds;
      if (resultsGTE.length === 0 || resultsLTE.length === 0)
        throw new Error(
          "Block history check failed, one or both directions are missing data."
        );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error during transaction check: ${error.message}`);
      } else {
        throw new Error(`Error during transaction check: unknown error`);
      }
    }
  };

  const handleTransaction = async (txHash: string) => {
    // Step 1: Check the transaction
    try {
      await checkTransaction(txHash);
      toast({
        title: "Success",
        description: "Transaction and block history checks passed.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }

    // Step 2: Interact with a contract
    if (signer && abi) {
      try {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        await contract.initiateQuery(txHash, {
          value: ethers.parseEther("0.05"),
        });

        // Step 3: Make an RPC call to the backend
        const rpcData = {
          jsonrpc: "2.0",
          method: "GenerateChallengeProofWithSpvFrontMode",
          params: [txHash, "300"],
          id: 1,
        };
        const rpcUrl = process.env.REACT_APP_BACKEND_RPC_URL!;
        try {
          const response = await axios.post(rpcUrl, rpcData);
          console.log("RPC Response:", response.data);
        } catch (error) {
          console.error("RPC Error:", error);
          toast({
            title: "RPC Error",
            description: "Failed to make backend call.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (contractError) {
        console.error("Contract Interaction Error:", contractError);
        toast({
          title: "Contract Error",
          description: "Failed to interact with the contract.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return; // Stop further execution if contract interaction fails
      }
    } else {
      console.error("Signer or ABI is missing");
      toast({
        title: "Initialization Error",
        description: "Signer or contract ABI is not properly initialized.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return; // Stop execution if the signer or ABI is missing
    }
  };

  const hanldleGetProof = async (txHash: string) => {
    dispatch(reset());
    dispatch(fetchTransaction(txHash));
    dispatch(fetchProof(txHash));
  };

  const handleVerification = async (txHash: string) => {
    if (signer && proof && abi && txHash) {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const rpcUrl = process.env.REACT_APP_ZKSYNC_RPC_URL;
        const provider = new ethers.JsonRpcProvider(rpcUrl);

        const txResponse = await provider.getTransaction(txHash);
        if (!txResponse) {
          console.log("Transaction not found");
          return;
        }
        const transaction = Transaction.from(txResponse);
        console.log("Serialized transaction:", transaction.serialized);

        try {
          const result = await contract.verifyQuery(txHash, proof);
          console.log("Verification result:", result);
        } catch (error) {
          console.error("Contract interaction failed", error);
        }
        console.log("I am here!");

        console.log("Serialized transaction:", transaction.serialized);
      } catch (error) {
        console.error("Transaction fetch failed", error);
      }
    } else {
      console.log("Signer, ABI, Proof, or Transaction Hash is missing");
    }
  };

  return (
    <div>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em" border="1px solid black" borderRadius="0">
          <Tab>Query L2 TX Hash on L1</Tab>
          <Tab>Retrieve ZK Proof</Tab>
          <Tab>L1 Verification</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display="flex" flexDirection="column" alignItems="center">
            <Card
              title="Query Transaction Hash"
              description="Enter a transaction hash to query its existence on L2 and lock 0.05 ETH."
              buttonText="Submit Query"
              onClick={handleTransaction}
            />
            <WorkflowDiagram />
          </TabPanel>
          <TabPanel display="flex" flexDirection="column" alignItems="center">
            <Card
              title="Retrieve ZK Proof"
              description="Retrieve the zero-knowledge proof for the specified transaction."
              buttonText="Retrieve Proof"
              onClick={hanldleGetProof}
            />
            <ProofDisplay />
            <TransactionDetails />
          </TabPanel>
          <TabPanel display="flex" flexDirection="column" alignItems="center">
            <Card
              title="Submit for L1 Verification"
              description="Submit the zero-knowledge proof to Layer 1 to confirm the existence of the transaction hash on Layer 2 securely."
              buttonText="Submit Proof"
              onClick={handleVerification}
            />
            <ProofDisplay />
            <TransactionDetails />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Home;
