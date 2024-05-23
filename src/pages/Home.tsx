import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Card from "../components/Card";
import { ethers } from "ethers";

const Home: React.FC = () => {
  const checkTransaction = async (txHash: string) => {
    const provider = new ethers.JsonRpcProvider(
      "https://sepolia.era.zksync.dev"
    );
    try {
      const tx = await provider.getTransaction(txHash);
      if (tx && tx.type === 2) {
        alert("This is an EIP-1559 transaction.");
      } else {
        alert("This is not an EIP-1559 transaction or no transaction found.");
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
      alert("Failed to fetch transaction.");
    }
  };

  return (
    <div>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>query L2 TX Hash on L1</Tab>
          <Tab>get ZK Proof</Tab>
          <Tab>L1 Verification</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Card
              title="query tx hash"
              description="fill in txhash, queryTxHash, and lock 0.05ETH"
              buttonText="submit query"
              onClick={checkTransaction}
            />
          </TabPanel>
          <TabPanel>
            <Card
              title="get ZK proof"
              description="get the proof"
              buttonText="get proof"
              onClick={() => console.log("interaction2")}
            />
          </TabPanel>
          <TabPanel>
            <Card
              title="L1 Verificaion"
              description="submit ZK proof"
              buttonText="submit proof"
              onClick={() => console.log("interaction3")}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Home;
