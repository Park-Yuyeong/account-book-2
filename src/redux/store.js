import { configureStore } from "@reduxjs/toolkit";
import expenditureSlice from "./slices/expenditure.slice";
import selectedMonthSlice from "./slices/selectedMonth.slice";

const store = configureStore({
  reducer: {
    expenditureSlice,
    selectedMonthSlice,
  },
});

export default store;
