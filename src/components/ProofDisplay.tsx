import React from "react";
import { useSelector } from "react-redux";
import { Box, Text, Code } from "@chakra-ui/react";

interface RootState {
  zkp: {
    proof: string;
  };
}

const ProofDisplay: React.FC = () => {
  const proof = useSelector((state: RootState) => state.zkp.proof);

  return (
    <Box width="100%" p={5} bg="white">
      <Text>Proof:</Text>
      <Code width="100%" p={2} overflowX="auto" bg="white" color="red">
        {proof}
      </Code>
    </Box>
  );
};

export default ProofDisplay;
