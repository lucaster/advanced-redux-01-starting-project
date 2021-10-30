import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  { id: 1, name: 'My first book', price: 6, description: 'desc 1' },
  { id: 2, name: 'My second book', price: 5, description: 'desc 2' },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_PRODUCTS.map(product =>
            <li key={product.id}>
              <ProductItem
                product={product}
              />
            </li>
          )
        }
      </ul>
    </section>
  );
};

export default Products;
