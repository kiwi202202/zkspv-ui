import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Card from "../components/Card";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { fetchProof } from "../features/zkp/zkpSlice";
import { AppDispatch } from "../store";
import ProofDisplay from "../components/ProofDisplay";
import TransactionDetails from "../components/TransactionDetails";
import WorkflowDiagram from "../components/WorkflowDiagram";
import { useToast } from "@chakra-ui/react";
import { useEthereum } from "../contexts/EthereumContext";
import axios from "axios";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const { signer } = useEthereum();
  const contractAddress = "0xFfce55B5fBBCD12f9ba7ee44166638dD43880b09";
  const [abi, setAbi] = useState<ethers.InterfaceAbi | undefined>(undefined);

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

  const handleTransaction = async (txHash: string) => {
    const providerUrl = process.env.REACT_APP_ZKSYNC_RPC_URL;
    const provider = new ethers.JsonRpcProvider(providerUrl);

    // Step 1: Check the transaction
    try {
      const tx = await provider.getTransaction(txHash);
      if (tx && tx.type === 2) {
        toast({
          title: "Transaction type check",
          description: "This is an EIP-1559 transaction.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Transaction type check",
          description: "This is not an EIP-1559 transaction.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
      toast({
        title: "Error",
        description: "Failed to fetch transaction.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return; // Stop further execution if the transaction fetch fails
    }

    // Step 2: Interact with a contract (Assuming you have a method like initiateQuery in your contract)
    if (signer) {
      if (abi) {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        await contract.initiateQuery(txHash, {
          value: ethers.parseEther("0.05"),
        });
      }
    }

    // Step 3: Make an RPC call to the backend
    const rpcData = {
      jsonrpc: "2.0",
      method: "GenerateChallengeProofWithSpvFrontMode",
      params: [txHash, "324"],
      id: 1,
    };
    const rpcUrl = "http://127.0.0.1:8100/rpc";
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
  };

  const checkTransaction = async (txHash: string) => {
    const providerUrl = process.env.REACT_APP_ZKSYNC_RPC_URL;
    const provider = new ethers.JsonRpcProvider(providerUrl);
    try {
      const tx = await provider.getTransaction(txHash);
      if (tx && tx.type === 2) {
        toast({
          title: "Transaction type check",
          description: "This is an EIP-1559 transaction.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Transaction type check",
          description: "This is not an EIP-1559 transaction.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
      toast({
        title: "Error",
        description: "Failed to fetch transaction.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
              onClick={() => dispatch(fetchProof())}
            />
            <ProofDisplay />
            <TransactionDetails />
          </TabPanel>
          <TabPanel display="flex" flexDirection="column" alignItems="center">
            <Card
              title="Submit for L1 Verification"
              description="Submit the zero-knowledge proof to Layer 1 to confirm the existence of the transaction hash on Layer 2 securely."
              buttonText="Submit Proof"
              onClick={() => console.log("interaction3")}
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
