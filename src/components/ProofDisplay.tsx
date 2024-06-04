import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Box, Text, Code, useToast } from "@chakra-ui/react";

interface RootState {
  zkp: {
    proof: string;
    error: string | null;
  };
}

const ProofDisplay: React.FC = () => {

  const toast = useToast();
  const proof = useSelector((state: RootState) => state.zkp.proof);
  const error = useSelector((state: RootState) => state.zkp.error);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]); 


  return (
    <Box
      width="60vw"
      p={5}
      bg="white"
      border="1px solid black"
      marginBottom="20px"
    >
      <Text>Proof:</Text>
      <Code width="100%" p={2} overflowX="auto" bg="white" color="brand.700">
        {proof}
      </Code>
    </Box>
  );
};

export default ProofDisplay;
