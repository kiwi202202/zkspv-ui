import React from "react";
import { Flex } from "@chakra-ui/react";
import Card from "../components/Card";
import { useDispatch } from "react-redux";
import { fetchProof, reset } from "../features/zkp/zkpSlice";
import { AppDispatch } from "../store";
import ProofDisplay from "../components/ProofDisplay";
import TransactionDetails from "../components/TransactionDetails";

import { fetchTransaction } from "../features/zksync/transactionSlice";

const RetrieveZKProofPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleGetProof = async (txHash: string) => {
    dispatch(reset());
    dispatch(fetchTransaction(txHash));
    dispatch(fetchProof(txHash));
  };

  return (
    <Flex direction="column" align="center" p="5">
      <Card
        title="Retrieve ZK Proof"
        description="Retrieve the zero-knowledge proof for the specified transaction."
        buttonText="Retrieve Proof"
        onClick={handleGetProof}
      />
      <ProofDisplay />
      <TransactionDetails />
    </Flex>
  );
};

export default RetrieveZKProofPage;
