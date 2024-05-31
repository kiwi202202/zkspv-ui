import { configureStore } from '@reduxjs/toolkit';
import zkpReducer from './features/zkp/zkpSlice'; 

const store = configureStore({
  reducer: {
    zkp: zkpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
