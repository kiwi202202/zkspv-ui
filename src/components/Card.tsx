import React, { useState } from "react";
import { Box, Button, Text, Input, Flex } from "@chakra-ui/react";

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
      width="1280px"
      border="1.5px solid black"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      marginBottom="20px"
      marginTop="20px"
      borderRadius="0"
    >
      <Box
        bg="white"
        boxShadow="sm"
        p={4}
        padding={6}
        borderWidth="1px"
        borderColor="grey.200"
        textAlign="left"
        width="100%"
      >
        <Text variant="title" mb={2}>
          {title}
        </Text>
        <Text variant="description" mb={4}>
          {description}
        </Text>
        <Flex gap="2" alignItems="center">
          <Input
            marginRight="10px"
            height="52px"
            placeholder="Enter tx hash"
            value={txHash}
            onChange={handleChange}
            marginBottom={0}
          />
          <Button
            size="xl"
            height="52px"
            width="200px"
            minWidth="200px"
            flexShrink={0}
            onClick={() => onClick(txHash)}
          >
            {buttonText}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Card;
