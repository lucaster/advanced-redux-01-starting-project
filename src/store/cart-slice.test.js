import { combineReducers } from 'redux';
import cartSlice from './cart-slice';
import uiSlice from './ui-slice';

test('reducers', () => {
  // Arrange
  const sut = combineReducers({
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
  });
  const currState = {
    ui: { showCart: false, notification: null },
    cart: { items: [], totalQuantity: 0, changed: false },
  };
  const action = {
    type: 'cart/replaceCart',
    payload: { totalQuantity: 0, items: [] },
  };
  // Act
  const nextState = sut(currState, action);
  // Assert
  expect(nextState).toEqual({
    ui: { showCart: false, notification: null },
    cart: { items: [], totalQuantity: 0, changed: false },
  });
});
