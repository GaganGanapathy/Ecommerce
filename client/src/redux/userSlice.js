import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
  user: null,
  token: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    loginError: (state, action) => {
      state.user = null
      state.token = null
    },
    logout: (state, action) => {
      state.user = null
      state.token = null
    },
  },
})

export const { loginSuccess, loginError, logout } = userSlice.actions
export default userSlice.reducer
