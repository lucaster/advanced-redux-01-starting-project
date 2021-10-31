import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { DB_URL } from './config/secrets';
import { uiActions } from './store/ui-slice';

function App() {
  // useSelector sets up a subscription, so this component will be re-rendered
  // ui is the name of the reducer
  const { showCart, notification } = useSelector((state) => state.ui);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // replace the whole cart every time it changes:
  useEffect(() => {

    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data',
      }));
      const response = await fetch(DB_URL + '/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sending cart data succeeded :)',
      }));
      // const responseJson = await response.json;
    };

    sendCartData().catch((error) => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message:'Sending cart data failed :(',
      }));
    });
  }, [cart, dispatch]);

  return (
    <>
      {
        notification &&
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
