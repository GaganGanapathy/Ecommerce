import { createSlice } from "@reduxjs/toolkit"

const initalValue = {
  cart: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: initalValue,
  reducers: {
    addToCart: (state, action) => {
      state.cart.unshift(action.payload)
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload)
    },
    decrementQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload) {
          return { ...item, quantity: item.quantity - 1 }
        }
        return item
      })
      console.log(action.payload)
    },
    incrementQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload) {
          console.log("asjfa")
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
    },
    emptyCart: (state, action) => {
      state.cart = []
    },
  },
})

export const {
  addToCart,
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
  emptyCart,
} = cartSlice.actions
export default cartSlice.reducer
