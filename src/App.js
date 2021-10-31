import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { DB_URL } from './config/secrets';

function App() {
  // useSelector sets up a subscription, so this component will be re-rendered
  // ui is the name of the reducer
  const showCart = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector(state => state.cart);

  // replace the whole cart every time it changes:
  useEffect(() => {
    fetch(DB_URL + '/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart),
    });
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
