import { Flex, Button, useColorMode, Box } from "@chakra-ui/react";
import { FiGithub, FiTwitter } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { useEthereum } from "../contexts/EthereumContext";

const Banner = () => {
  const { account, connect } = useEthereum();
  const { colorMode } = useColorMode();

  return (
    <Box
      as="nav"
      bg="rgba(255, 255, 255, 0.5)"
      p={4}
      color="black"
      borderBottom="2px solid"
      borderColor={colorMode === "dark" ? "gray.800" : "gray.200"}
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
            href="https://github.com/KiwiChen2022"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button leftIcon={<FiGithub />} variant="solid" colorScheme="red">
              GitHub
            </Button>
          </a>
          <a
            href="https://discord.gg/8wZA5p5n"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button leftIcon={<FaDiscord />} variant="solid" colorScheme="red">
              Discord
            </Button>
          </a>
          <a
            href="https://twitter.com/kiwichen2022"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button leftIcon={<FiTwitter />} variant="solid" colorScheme="red">
              Twitter
            </Button>
          </a>
        </Flex>

        <Flex align="center">
          {account ? (
            <Button variant="solid" colorScheme="red">
              {account.slice(0, 6) + "..." + account.slice(-4)}
            </Button>
          ) : (
            <Button onClick={connect} variant="solid" colorScheme="red">
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Banner;
