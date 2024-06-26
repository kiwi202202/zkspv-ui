import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Box, Text, VStack } from "@chakra-ui/react";
import { TransactionResponse } from "ethers";
import { useSelector } from 'react-redux';
import { fetchTransaction } from '../features/zksync/transactionSlice';
import { RootState } from "../store";

const TransactionDetails: React.FC = () => {
  const { transaction, error, loading } = useSelector((state: RootState) => state.transaction);

  // const [transaction, setTransaction] = useState<TransactionResponse | null>(
  //   null
  // );
  // const [error, setError] = useState<string>("");


  // useEffect(() => {
  //   const providerUrl = process.env.REACT_APP_ZKSYNC_RPC_URL;
  //   const provider = new ethers.JsonRpcProvider(providerUrl);
  //   const txHash =
  //     "0x4eee6ec7564c7e004f5341b2babde2279c10ae6a91eba9a6b25655b55cd68a50";
  //   // const txHash =
  //   // "0x17746241b1f45457c4808d42c1fe27186a7e8a468e7148536b06e0a727c03d93";
  //   try {
  //     const fetchTransaction = async () => {
  //       const tx = await provider.getTransaction(txHash);
  //       setTransaction(tx);
  //       // console.log(tx?.chainId);
  //       // console.log(tx?.from);
  //       // console.log(tx?.data);
  //     };

  //     fetchTransaction();
  //   } catch (err) {
  //     console.error("Error fetching transaction:", err);
  //     setError("Failed to fetch transaction details.");
  //   }
  // }, []);

  return (
    <Box p={5} shadow="none" border="1px solid black" bg="white">
      <VStack spacing={1} align="stretch">
        {transaction ? (
          <>
            <Text fontSize="lg" fontWeight="bold" color="brand.500">
              "Compressed" data in tx hash:
            </Text>
            <Text>Chain ID: {transaction.chainId.toString()}</Text>
            <Text>Nonce: {transaction.nonce}</Text>
            <Text>
              Max Priority Fee Per Gas:{" "}
              {transaction.maxPriorityFeePerGas?.toString()}
            </Text>
            <Text>Max Fee Per Gas: {transaction.maxFeePerGas?.toString()}</Text>
            <Text>Gas Limit: {transaction.gasLimit?.toString()}</Text>
            <Text>To: {transaction.to}</Text>
            <Text>Value: {transaction.value?.toString()}</Text>
            <Text style={{ wordBreak: "break-word" }}>
              CallData: {transaction.data}
            </Text>
            <Text>Access List: {JSON.stringify(transaction.accessList)}</Text>
            <Text>V: {transaction.signature.v}</Text>
            <Text>R: {transaction.signature.r}</Text>
            <Text>S: {transaction.signature.s}</Text>
          </>
        ) : (
          <Text>{error || "Loading transaction details..."}</Text>
        )}
      </VStack>
    </Box>
  );
};

export default TransactionDetails;
