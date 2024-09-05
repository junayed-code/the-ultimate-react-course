import { createSlice, createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import type { CartItemT as CartItem } from './cart-item';

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [
    /*{
      pizzaId: 12,
      name: 'Mediterranean',
      quantity: 9,
      unitPrice: 16,
      totalPrice: 32,
    },
     {
      pizzaId: 6,
      name: 'Vegetale',
      quantity: 1,
      unitPrice: 13,
      totalPrice: 13,
    },
    {
      pizzaId: 11,
      name: 'Spinach and Mushroom',
      quantity: 1,
      unitPrice: 15,
      totalPrice: 15,
    }, */
  ],
};

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // action.payload = CartItem
      if (!action.payload?.pizzaId) return;
      state.items.push(action.payload);
    },
    deleteItem(state, action) {
      // action.payload = CartItem.pizzaId
      state.items = state.items.filter(item => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // action.payload = CartItem.pizzaId
      const item = state.items.find(item => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // action.payload = CartItem.pizzaId
      const item = state.items.find(item => item.pizzaId === action.payload);
      if (!item || item.quantity <= 1) return;
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      // if (item.quantity < 1) {
      //   slice.caseReducers.deleteItem(state, action)
      // }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const getCartItems = (state: RootState) => state.cart.items;

export const getCartItemById = (id: number) => (state: RootState) => {
  return state.cart.items.find(item => item.pizzaId === id);
};

export const getTotalPriceAndPizza = createSelector(
  [(state: RootState) => state.cart.items],
  function (items) {
    return items.reduce(
      (total, item) => {
        const totalPrice = total.totalPrice + item.totalPrice;
        const totalPizza = total.totalPizza + item.quantity;
        return { totalPrice, totalPizza };
      },
      { totalPrice: 0, totalPizza: 0 },
    );
  },
);

export const {
  reducer: cartReducer,
  actions: {
    addItem,
    deleteItem,
    clearCart,
    increaseItemQuantity,
    decreaseItemQuantity,
  },
} = slice;
