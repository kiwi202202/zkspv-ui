import React from "react";
import { Image, VStack, Text, Center, Box } from "@chakra-ui/react";

const WorkflowDiagram: React.FC = () => {
  return (
    <Box
      mx="auto"
      width="1280px"
      height="640px"
      p={4}
      marginTop="20px"
      borderRadius="0"
      borderWidth="1.5px"
      borderColor="black"
      bg="white"
      padding={6}
    >
      <VStack spacing={4} align="start">
        <Text variant="title">Workflow</Text>
        <Text variant="description">
          The flowchart below shows the core workflow of our project, including
          the main activities at each stage.
        </Text>
        {/* <Center width="100%" p="2" bg="white"> */}
        <Image
          src={`${process.env.PUBLIC_URL}/workflow-diagram.png`}
          alt="Workflow Diagram"
          maxWidth="80%"
          height="auto"
        />
        {/* </Center> */}
      </VStack>
    </Box>
  );
};

export default WorkflowDiagram;
