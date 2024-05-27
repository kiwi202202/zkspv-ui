import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Card from "../components/Card";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { fetchProof } from "../features/zkp/zkpSlice";
import { AppDispatch } from "../store";
import ProofDisplay from "../components/ProofDisplay";
import TransactionDetails from "../components/TransactionDetails";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const checkTransaction = async (txHash: string) => {
    const providerUrl = process.env.REACT_APP_ZKSYNC_RPC_URL;
    const provider = new ethers.JsonRpcProvider(providerUrl);
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
              title="Query Transaction Hash"
              description="Enter a transaction hash to query its existence on L2 and lock 0.05 ETH."
              buttonText="Submit Query"
              onClick={checkTransaction}
            />
          </TabPanel>
          <TabPanel>
            <Card
              title="Retrieve ZK Proof"
              description="Retrieve the zero-knowledge proof for the specified transaction."
              buttonText="Retrieve Proof"
              onClick={() => dispatch(fetchProof())}
            />
            <ProofDisplay />
            <TransactionDetails />
          </TabPanel>
          <TabPanel>
            <Card
              title="Submit for L1 Verification"
              description="Submit the zero-knowledge proof to Layer 1 to confirm the existence of the transaction hash on Layer 2 securely."
              buttonText="Submit Proof"
              onClick={() => console.log("interaction3")}
            />
            <ProofDisplay />
            <TransactionDetails />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Home;
