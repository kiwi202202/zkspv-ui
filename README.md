# ZK Light Client

## Overview

The ZK Light Client leverages zero-knowledge proofs to facilitate the verification of Layer 2 (L2) transaction hashes on Layer 1 (Ethereum). Just like a light client, it operates to verify transactions, but it does so across L1 and L2, enabling efficient and secure L1 verification of L2 transactions.

For detailed zk constraints, please refer to our [zkspv-circuits GitHub repository](https://github.com/Orbiter-Finance/zkspv-circuits/tree/demo).

## How It Works

1. **User Queries L2 Transaction Hash**: The user submits a query on [L1 contracts](https://github.com/kiwi202202/zk-light-client-contracts) with the L2 transaction hash they want to verify.
2. **Retrieve ZK Proof**: The user retrieves the corresponding zero-knowledge proof from the [zk prover](https://github.com/Orbiter-Finance/zkspv-circuits/tree/demo).
3. **L1 Verification**: The zero-knowledge proof is used to confirm the validity and existence of the L2 transaction on the L1 blockchain.

## Current Limitations

1. **EIP-1559 Transactions Only**: The current implementation only supports EIP-1559 type transactions.
2. **zkSync L2 Network**: At this stage, we only support the zkSync L2 network.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kiwi202202/zkspv-ui
   ```
2. Navigate to the project directory:
   ```bash
   cd zkspv-ui
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.
