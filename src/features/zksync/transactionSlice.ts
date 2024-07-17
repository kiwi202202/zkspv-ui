import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";

// Misleading Name, actually is an SerializableTransaction + receiptStatus
interface SerializableTransaction {
  chainId: string;
  nonce: number;
  maxPriorityFeePerGas?: string;
  maxFeePerGas?: string;
  gasLimit: string;
  to?: string;
  value: string;
  data: string;
  accessList?: string;
  signature: {
    v: number;
    r: string;
    s: string;
  };
  receiptStatus?: string;
}

interface TransactionState {
  transaction: SerializableTransaction | null;
  error: string | null;
  loading: boolean;
}

const initialState: TransactionState = {
  transaction: null,
  error: null,
  loading: false,
};

export const fetchTransaction = createAsyncThunk<
  SerializableTransaction | null,
  string
>(
  "transaction/fetchTransaction",
  async (txHash: string, { rejectWithValue }) => {
    try {
      const providerUrl = process.env.REACT_APP_ZKSYNC_RPC_URL;
      const provider = new ethers.JsonRpcProvider(providerUrl);
      const transaction = await provider.getTransaction(txHash);

      if (!transaction) {
        return null;
      }

      const transactionReceipt = await provider.getTransactionReceipt(txHash);
      const receiptStatus: string =
        transactionReceipt?.status === 1 ? "success" : "false";

      const serializableTransaction: SerializableTransaction = {
        chainId: transaction.chainId.toString(),
        nonce: transaction.nonce,
        maxPriorityFeePerGas: transaction.maxPriorityFeePerGas?.toString(),
        maxFeePerGas: transaction.maxFeePerGas?.toString(),
        gasLimit: transaction.gasLimit.toString(),
        to: transaction.to || undefined,
        value: transaction.value.toString(),
        data: transaction.data,
        accessList: JSON.stringify(transaction.accessList),
        signature: {
          v: transaction.signature.v,
          r: transaction.signature.r,
          s: transaction.signature.s,
        },
        receiptStatus: receiptStatus,
      };

      return serializableTransaction;
    } catch (err) {
      return rejectWithValue("Failed to fetch transaction details.");
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTransaction.fulfilled,
      (state, action: PayloadAction<SerializableTransaction | null>) => {
        state.transaction = action.payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(
      fetchTransaction.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload as string;
        state.loading = false;
        state.transaction = null;
      }
    );
  },
});

export default transactionSlice.reducer;
