import React, { useEffect, useState } from "react";
import { Flex, useToast } from "@chakra-ui/react";
import Card from "../components/Card";
import { Transaction, ethers } from "ethers";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ProofDisplay from "../components/ProofDisplay";
import TransactionDetails from "../components/TransactionDetails";
import { useEthereum } from "../contexts/EthereumContext";

const L1VerificationPage: React.FC = () => {
  const { signer } = useEthereum();
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS!;
  const [abi, setAbi] = useState<ethers.InterfaceAbi | undefined>(undefined);
  const { proof } = useSelector((state: RootState) => state.zkp);
  const toast = useToast();

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
          toast({
            title: "Success",
            description:
              "Zero-knowledge proof submitted on-chain successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } catch (error) {
          console.error("Contract interaction failed", error);
          toast({
            title: "Error",
            description: "Failed to submit the zero-knowledge proof on-chain.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
        // console.log("I am here!");

        console.log("Serialized transaction:", transaction.serialized);
      } catch (error) {
        console.error("Transaction fetch failed", error);
      }
    } else {
      console.log("Signer, ABI, Proof, or Transaction Hash is missing");
      toast({
        title: "Error",
        description: "Signer, ABI, Proof, or Transaction Hash is missing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" align="center" p="5">
      <Card
        title="Submit for L1 Verification"
        description="Submit the zero-knowledge proof to Layer 1 to confirm the existence of the transaction hash on Layer 2 securely."
        buttonText="Submit Proof"
        onClick={handleVerification}
      />
      <ProofDisplay />
      <TransactionDetails />
    </Flex>
  );
};

export default L1VerificationPage;
