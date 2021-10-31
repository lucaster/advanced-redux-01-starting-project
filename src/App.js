import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';

function App() {
  // useSelector sets up a subscription, so this component will be re-rendered
  // ui is the name of the reducer
  const { showCart, notification } = useSelector((state) => state.ui);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // fetch cart data initially:
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // replace the whole cart every time it changes:
  useEffect(() => {
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
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
