import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Simulate fetching proof from backend
const fetchProofFromBackend = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('{ "proofValue": "exampleProofData" }');
    }, 1000);
  });
};

// Async thunk action to fetch proof
export const fetchProof = createAsyncThunk(
  'zkp/fetchProof',
  async () => {
    const response = await fetchProofFromBackend();
    return response;
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProof.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProof.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.proof = action.payload;
      })
      .addCase(fetchProof.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch proof';
      });
  }
});

export default zkpSlice.reducer;
