import React from "react";
import { Image, VStack, Text, Center, Box } from "@chakra-ui/react";

const WorkflowDiagram: React.FC = () => {
  return (
    <Box mx="auto" maxWidth="80vw" p={4} marginTop="20px">
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="bold" color="brand.700">
          Workflow
        </Text>
        <Text fontSize="md" color="gray.600">
          The flowchart below shows the core workflow of our project, including
          the main activities at each stage.
        </Text>
        <Center
          width="100%"
          p="2"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="black"
          maxWidth="60vw"
          bg="white"
        >
          <Image
            src={`${process.env.PUBLIC_URL}/workflow-diagram.png`}
            alt="Workflow Diagram"
            width="100%"
            height="auto"
          />
        </Center>
      </VStack>
    </Box>
  );
};

export default WorkflowDiagram;
