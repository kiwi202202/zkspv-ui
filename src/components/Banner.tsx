import { Flex, Button, Box } from "@chakra-ui/react";
import { FiGithub, FiTwitter } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { useEthereum } from "../contexts/EthereumContext";

const Banner = () => {
  const { account, connect } = useEthereum();

  return (
    <Box
      as="nav"
      bg="rgba(255, 255, 255, 0.5)"
      p={4}
      color="black"
      borderBottom="2px solid"
    >
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        maxW="1200px"
        m="0 auto"
      >
        <Flex align="center" gap="2">
          <a
            href="https://github.com/Orbiter-Finance/zkspv-circuits/tree/demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button leftIcon={<FiGithub />} variant="ghost" colorScheme="gray">
              GitHub
            </Button>
          </a>
          <a
            href="https://discord.gg/FbztTBvnBT"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button leftIcon={<FaDiscord />} variant="ghost" colorScheme="gray">
              Discord
            </Button>
          </a>
          <a
            href="https://twitter.com/OrbiterResearch"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button leftIcon={<FiTwitter />} variant="ghost" colorScheme="gray">
              Twitter
            </Button>
          </a>
        </Flex>

        <Flex align="center">
          {account ? (
            <Button variant="solid">
              {account.slice(0, 6) + "..." + account.slice(-4)}
            </Button>
          ) : (
            <Button onClick={connect} variant="solid">
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Banner;
