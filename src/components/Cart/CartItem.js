import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

const CartItem = ({ item }) => {

  const { id, name, price, quantity, totalPrice } = item;

  const dispatch = useDispatch();

  const handleDecreaseItem = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const handleIncreaseItem = () => {
    dispatch(cartActions.addItemToCart({
      id, name, price
    }))
  };

  return (
    <div className={classes.item}>
      <header>
        <h3>({id}) {name}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleDecreaseItem}>-</button>
          <button onClick={handleIncreaseItem}>+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
