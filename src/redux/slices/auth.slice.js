import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: null,
    nickname: null,
    avatar: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { userId, nickname, avatar } = action.payload;
      state.user.userId = userId;
      state.user.nickname = nickname;
      state.user.avatar = avatar;
    },
    updateUser: (state, action) => {
      const { nickname, avatar } = action.payload;
      state.user.nickname = nickname;
      state.user.avatar = avatar;
    },
  },
});

export const { setUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
