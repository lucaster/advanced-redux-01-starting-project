import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload.item;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        const addedItem = {
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price, // totalPrice = quantity * price
          name: newItem.name,
        };
        state.items.push(addedItem);
      }
      else {
        existingItem.quantity += newItem.quantity;
        // This is not DDD - totalPrice should be a smart getter instead:
        existingItem.totalPrice += newItem.price * newItem.quantity;
      }
    },
    removeItemFromCart: () => {},
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
