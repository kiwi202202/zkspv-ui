import React, { useState } from "react";
import { Box, Button, Text, Input } from "@chakra-ui/react";

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: (txHash: string) => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  onClick,
}) => {
  const [txHash, setTxHash] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxHash(event.target.value);
  };

  return (
    <Box bg="white" boxShadow="sm" p={4} rounded="md">
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        {title}
      </Text>
      <Text mb={4}>{description}</Text>
      <Input
        placeholder="Enter tx hash"
        value={txHash}
        onChange={handleChange}
        mb={2}
      />
      <Button colorScheme="red" onClick={() => onClick(txHash)}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default Card;
