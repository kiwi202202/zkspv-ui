import { configureStore } from '@reduxjs/toolkit';
import zkpReducer from './features/zkp/zkpSlice';
import transactionReducer from './features/zksync/transactionSlice';

const store = configureStore({
  reducer: {
    zkp: zkpReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
