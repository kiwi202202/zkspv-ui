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
    <Box
      width="60vw"
      border="1px solid black"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      marginBottom="20px"
    >
      <Box
        bg="white"
        boxShadow="sm"
        p={4}
        rounded="md"
        borderWidth="1px"
        borderColor="grey.200"
        textAlign="center"
        width="100%"
      >
        <Text color="black" fontSize="lg" fontWeight="bold" mb={2}>
          {title}
        </Text>
        <Text color="black" mb={4}>
          {description}
        </Text>
        <Input
          placeholder="Enter tx hash"
          value={txHash}
          onChange={handleChange}
          mb={2}
        />
        <Button onClick={() => onClick(txHash)}>{buttonText}</Button>
      </Box>
    </Box>
  );
};

export default Card;
