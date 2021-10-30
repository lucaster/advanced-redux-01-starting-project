import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {

  const { items } = useSelector(state => state.cart);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {
          items.map(item =>
            <li key={item.id}>
              <CartItem
                item={item}
              />
            </li>
          )
        }
      </ul>
    </Card>
  );
};

export default Cart;
