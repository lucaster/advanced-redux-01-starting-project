import { createSlice } from '@reduxjs/toolkit';
import { immerable } from 'immer';

// CAVEAT: https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state

interface CartState {
  readonly items: CartItem[];
  readonly totalQuantity: number;
}
interface CartItem {
  readonly id: string | number;
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
  readonly totalPrice: number;
}
class CartStateImpl implements CartState {
  private static readonly [immerable] = true;
  constructor(
    readonly items: CartItem[]
  ) {}
  get totalQuantity(): number {
    let t = 0;
    for (const item of this.items) {
      t += item.quantity;
    }
    return t;
  }
  set totalQuantity(value: number) {
    // workaround for immer
    console.warn('CartStateImpl', 'totalQuantity');
  }
}
class CartItemImpl implements CartItem {
  private static readonly [immerable] = true;
  constructor(
    readonly id: string | number,
    readonly name: string,
    readonly price: number,
    readonly quantity: number
  ) {}
  get totalPrice(): number {
    return this.price * this.quantity;
  }
  set totalPrice(value: number) {
    // workaround for immer
    console.warn('CartItemImpl', 'totalPrice');
  }
}
// (CartStateImpl as any)[immerable] = true;
// (CartItemImpl as any)[immerable] = true;

const name = 'cart';
const initialState = new CartStateImpl([]);

const cartSlice = createSlice({
  name,
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      console.debug('cart', 'addItemToCard', { action });
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        const addedItem = new CartItemImpl(
          newItem.id,
          newItem.name,
          newItem.price,
          1
        );
        state.items.push(addedItem);
      }
      else {
        existingItem.quantity += 1;
      }
    },
    /**
     * Remove 1 item of a given kind
     */
    removeItemFromCart: (state, action) => {
      console.debug('cart', 'removeItemFromCart', { action });
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id)!;
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        // remove the item entirely
        state.items = state.items.filter((item) => item.id !== id);
      }
      else if (existingItem.quantity > 1) {
        // decrease
        existingItem.quantity -= 1;
      }
      else {
        // NOOP
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
