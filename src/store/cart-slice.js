import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    replaceCart: (state, action) => {
      const cart = action.payload;
      state.totalQuantity = cart.totalQuantity;
      state.items = cart.items.map(item => ({ ...item }));
    },
    addItemToCart: (state, action) => {
      console.debug('cart', 'addItemToCard', { action });
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        const addedItem = {
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1, // always add 1 specimen
          totalPrice: newItem.price, // totalPrice = quantity * price
        };
        state.items.push(addedItem);
      }
      else {
        existingItem.quantity += 1;
        // This is not DDD:
        existingItem.totalPrice += newItem.price * 1;
      }
      // DO NOT TRIGGER SIDE-EFFECTS OR DUN ASYNC CODE INSIDE REDUCERS!
    },
    /**
     * Remove 1 item of a given kind
     */
    removeItemFromCart: (state, action) => {
      console.debug('cart', 'removeItemFromCart', { action });
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        // remove the item entirely
        state.items = state.items.filter((item) => item.id !== id);
      }
      else if (existingItem.quantity > 1) {
        // decrease
        existingItem.quantity--;
        // This is not DDD:
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      else {
        // NOOP
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
