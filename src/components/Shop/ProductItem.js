import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = ({ product }) => {

  const { id, name, price, description } = product;

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      cartActions.addItemToCart({
        id, name, price
      })
    )
  };

  return (
    <div className={classes.item}>
      <Card>
        <header>
          <h3>({id}) {name}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </Card>
    </div>
  );
};

export default ProductItem;
