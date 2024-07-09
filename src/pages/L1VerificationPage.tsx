import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Card from "../components/Card";
import { Transaction, ethers } from "ethers";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ProofDisplay from "../components/ProofDisplay";
import TransactionDetails from "../components/TransactionDetails";
import { useEthereum } from "../contexts/EthereumContext";

const L1VerificationPanel: React.FC = () => {
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
    <Flex direction="column" align="center" p="5">
      <Card
        title="Submit for L1 Verification"
        description="Submit the zero-knowledge proof to Layer 1 to confirm the existence of the transaction hash on Layer 2 securely."
        buttonText="Submit Proof"
        onClick={() => handleVerification("ExampleTxHash")}
      />
      <ProofDisplay />
      <TransactionDetails />
    </Flex>
  );
};

export default L1VerificationPanel;
