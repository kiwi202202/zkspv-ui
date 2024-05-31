import { createContext, useContext, useState, ReactNode } from "react";
import { ethers } from "ethers";
import * as et from "ethers";

interface EthereumContextType {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  connect: () => Promise<void>;
  error: string;
}

const EthereumContext = createContext<EthereumContextType | undefined>(
  undefined
);

export const useEthereum = (): EthereumContextType => {
  const context = useContext(EthereumContext);
  if (context === undefined) {
    throw new Error("useEthereum must be used within an EthereumProvider");
  }
  return context;
};

interface EthereumProviderProps {
  children: ReactNode;
}

const checkNetwork = async (
  provider: ethers.BrowserProvider
): Promise<boolean> => {
  const expectedChainId = process.env.REACT_APP_CHAINID;
  try {
    const network = await provider.getNetwork();
    if (network.chainId.toString() !== expectedChainId) {
      console.log(
        `Connected to chainId ${network.chainId}, but expected ${expectedChainId}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error checking network chainId:", error);
    return false;
  }
};

export const EthereumProvider = ({ children }: EthereumProviderProps) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [error, setError] = useState<string>("");
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  const connect = async () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed. Please install MetaMask.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      const networkOk = await checkNetwork(provider);
      if (!networkOk) {
        setError("You're connected to an unsupported network.");
        return;
      }

      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();

      setAccount(account);
      setSigner(signer);
      setError("");
    } catch (error) {
      console.error("Failed to connect MetaMask", error);
      setError("Failed to connect MetaMask.");
    }
  };

  return (
    <EthereumContext.Provider
      value={{ account, provider, signer, connect, error }}
    >
      {children}
    </EthereumContext.Provider>
  );
};
