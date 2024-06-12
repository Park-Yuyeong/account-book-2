import { createSlice } from "@reduxjs/toolkit";

const saveToLocale = (state) =>
  localStorage.setItem("account-book-selected-month", JSON.stringify(state));

const initialState = {
  selectedMonth:
    JSON.parse(localStorage.getItem("account-book-selected-month")) ??
    new Date().getMonth() + 1,
};

const selectedMonthSlice = createSlice({
  initialState,
  name: "account-book-selected-month",
  reducers: {
    changeSelectedMonth: (state, action) => {
      saveToLocale(action.payload);
      state.selectedMonth = action.payload;
    },
  },
});

export const { changeSelectedMonth } = selectedMonthSlice.actions;
export default selectedMonthSlice.reducer;
