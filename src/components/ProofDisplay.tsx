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
