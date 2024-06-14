import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import selectedMonthSlice from "./slices/selectedMonth.slice";

const store = configureStore({
  reducer: {
    selectedMonthSlice,
    authSlice,
  },
});

export default store;
