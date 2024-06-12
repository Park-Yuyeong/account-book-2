import { createSlice } from "@reduxjs/toolkit";

const saveToLocale = (state) =>
  localStorage.setItem("account-book", JSON.stringify(state));

const initialState = {
  expenditure: JSON.parse(localStorage.getItem("account-book")) ?? [],
};

const expenditureSlice = createSlice({
  initialState,
  name: "expenditure",
  reducers: {
    createExpenditureItem: (state, action) => {
      saveToLocale([...state.expenditure, action.payload]);
      state.expenditure = [...state.expenditure, action.payload];
    },
    updateExpenditureItem: (state, action) => {
      const updatedList = state.expenditure.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );

      saveToLocale(updatedList);
      state.expenditure = updatedList;
    },
    deleteExpenditureItem: (state, action) => {
      const filteredList = state.expenditure.filter(
        (item) => item.id !== action.payload
      );

      saveToLocale(filteredList);
      state.expenditure = filteredList;
    },
  },
});

export const {
  createExpenditureItem,
  updateExpenditureItem,
  deleteExpenditureItem,
} = expenditureSlice.actions;
export default expenditureSlice.reducer;
