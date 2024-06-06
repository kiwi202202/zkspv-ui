import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';

const fetchProofFromBackend = async (txHash: string): Promise<string> => {
  try {
    const requestUrl = process.env.REACT_APP_BACKEND_RPC_URL!; 
    const requestBody = {
      jsonrpc: '2.0',
      method: 'GetChallengeProof',
      params: [txHash, "http://127.0.0.1:8101"],
      id: 1
    };

    const response = await axios.post(requestUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.error) {
      throw new Error(`Error from server: ${response.data.error.message}`);
    }
    const proof = response.data.result.proof;
    if (proof === "0x") {
      throw new Error('Proof computation is not yet complete');
    }
    console.log(response);
    return proof;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

// Async thunk action to fetch proof
export const fetchProof = createAsyncThunk(
  'zkp/fetchProof',
  async (txHash: string, { rejectWithValue }) => {
    try {
      const response = await fetchProofFromBackend(txHash);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

interface ZKPState {
  proof: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ZKPState = {
  proof: '',
  status: 'idle',
  error: null
};

const zkpSlice = createSlice({
  name: 'zkp',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProof.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProof.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.proof = action.payload;
      })
      .addCase(fetchProof.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { reset } = zkpSlice.actions;
export default zkpSlice.reducer;
