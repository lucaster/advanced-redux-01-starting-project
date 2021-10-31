import { DB_URL } from "../config/secrets";
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

/**
 * action creator / thunk
 */
export const fetchCartData = () =>
  async (dispatch) => {

    const fetchData = async () => {
      const response = await fetch(DB_URL + '/cart.json');
      if (!response.ok) {
        return new Error('Cart data fetch failed');
      }
      const data = await response.json();
      return data;
    };

    try {
      const cart = await fetchData();

      const fixedCart = {
        ...cart,
        items: cart.items || []
      };

      dispatch(cartActions.replaceCart(fixedCart));
    }
    catch (error) {
      console.error(error);
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message:'Fetching cart data failed :(',
      }));
    }
  }
;

/**
 * action creator / thunk
 */
 export const sendCartData = (cart) => {
  return async (dispatch) => {

    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data',
    }));

    const sendRequest = async () => {
      const cleanCart = (() => {
        const clean = { ...cart };
        // Exclude this because we only need it as a hack to prevent replace upon initialfetch
        delete clean.changed;
        return clean;
      })();
      const response = await fetch(DB_URL + '/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cleanCart),
      });
      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sending cart data succeeded :)',
      }));
    }
    catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message:'Sending cart data failed :(',
      }));
    }
  };
};