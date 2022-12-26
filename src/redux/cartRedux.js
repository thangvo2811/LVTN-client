import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isFetching: false,
    numberCart: 0,
    numberCartByCartId: {},
    carts: [],
    _products: [],
    totalPrice: 0,
    totalNumberCart: 0,
  },
  reducers: {
    addStart: (state) => {
      state.isFetching = true;
    },
    addCartSuccess: (state, action) => {
      // console.log(action.payload);
      state.isFetching = false;
      state.numberCart = action.payload;
    },
    addCartAction: (state, action) => {
      state.isFetching = false;
      state.numberCart = state.numberCart + 1;
    },
    initialCartByCartIdAction: (state, action) => {
      const { cartId, currentAmount } = action.payload;
      state.isFetching = false;
      // if (!(state.numberCartByCartId[cartId] || false)) {
      //   // Chua co trong state
      //   state.numberCartByCartId[cartId] = currentAmount;
      // }
      state.numberCartByCartId[cartId] = currentAmount;
      console.log("CartID", state.numberCartByCartId[cartId]);
    },
    addCartByCartIdAction: (state, action) => {
      // console.log(action.payload);
      const { cartId, currentAmount } = action.payload;
      state.isFetching = false;
      if (!(state.numberCartByCartId[cartId] || false)) {
        // Chua co trong state
        state.numberCartByCartId[cartId] = currentAmount;
      } else {
        state.numberCartByCartId[cartId] = state.numberCartByCartId[cartId] + 1;
      }
    },
    removeCartByCartIdAction: (state, action) => {
      // console.log(action.payload);
      const { cartId, currentAmount } = action.payload;
      state.isFetching = false;
      if (!(state.numberCartByCartId[cartId] || false)) {
        // Chua co trong state
        state.numberCartByCartId[cartId] = currentAmount;
      } else {
        if (state.numberCartByCartId[cartId] === 1) {
          return;
        }
        state.numberCartByCartId[cartId] = state.numberCartByCartId[cartId] - 1;
      }
    },
    deleteCartStart: (state) => {
      state.isFetching = true;
    },
    deleteCartSuccess: (state, action) => {
      state.isFetching = false;
      state._products = action.payload;
      state.numberCart = action.payload._products.length;
    },
    deleteAllCartStart: (state) => {
      state.isFetching = true;
    },
    deleteAllCartSuccess: (state, action) => {
      state.isFetching = false;
      state._products = action.payload;
      state.numberCart = action.payload._products.length;
    },
    totalCartNumber: (state, action) => {
      state.totalNumberCart = action.payload;
    },
  },
});

export const {
  addStart,
  addCartSuccess,
  addCartAction,
  totalCartNumber,
  addCartByCartIdAction,
  removeCartByCartIdAction,
  initialCartByCartIdAction,
} = cartSlice.actions;
export default cartSlice.reducer;
