import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Box, Text, VStack } from "@chakra-ui/react";
import { TransactionResponse } from "ethers";
import { useSelector } from "react-redux";
import { fetchTransaction } from "../features/zksync/transactionSlice";
import { RootState } from "../store";

const TransactionDetails: React.FC = () => {
  const { transaction, error, loading } = useSelector(
    (state: RootState) => state.transaction
  );

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
    <Box
      p={5}
      shadow="none"
      border="1.5px solid black"
      bg="white"
      width="1280px"
      padding={6}
    >
      <VStack spacing={1} align="stretch">
        <Text variant="title">Transaction Receipt</Text>
        <Text variant="description">
          Status: {transaction?.receiptStatus?.toString() || "N/A"}
        </Text>
        <Text variant="title">"Compressed" data in tx hash</Text>
        <Text variant="description">
          Chain ID: {transaction?.chainId?.toString() || "N/A"}
        </Text>
        <Text variant="description">Nonce: {transaction?.nonce || "N/A"}</Text>
        <Text variant="description">
          Max Priority Fee Per Gas:{" "}
          {transaction?.maxPriorityFeePerGas?.toString() || "N/A"}
        </Text>
        <Text variant="description">
          Max Fee Per Gas: {transaction?.maxFeePerGas?.toString() || "N/A"}
        </Text>
        <Text variant="description">
          Gas Limit: {transaction?.gasLimit?.toString() || "N/A"}
        </Text>
        <Text variant="description">To: {transaction?.to || "N/A"}</Text>
        <Text variant="description">
          Value: {transaction?.value?.toString() || "N/A"}
        </Text>
        <Text variant="description" style={{ wordBreak: "break-word" }}>
          CallData: {transaction?.data || "N/A"}
        </Text>
        <Text variant="description">
          Access List: {JSON.stringify(transaction?.accessList) || "N/A"}
        </Text>
        <Text variant="description">
          V: {transaction?.signature?.v || "N/A"}
        </Text>
        <Text variant="description">
          R: {transaction?.signature?.r || "N/A"}
        </Text>
        <Text variant="description">
          S: {transaction?.signature?.s || "N/A"}
        </Text>
      </VStack>
    </Box>
  );
};

export default TransactionDetails;
