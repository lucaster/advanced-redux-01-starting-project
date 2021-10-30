import classes from './CartItem.module.css';

const CartItem = ({ item }) => {

  const { id, name, price, quantity, totalPrice } = item;

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
          <button>-</button>
          <button>+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
