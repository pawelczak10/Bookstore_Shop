import ProductItem from './ProductItem';
import classes from './Products.module.css';


const DUMMY_PRODUCTS =[
  {
    id: "p1",
    price: 6,
    title: "My first book",
    description: "The first book I ever wrote",
  },
  {
    id: "p2",
    price: 8,
    title: "My second book",
    description: "The second book I ever wrote",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) =>(
          <ProductItem
          id={product.id}
          key={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />
        ))}
      </ul>
    </section>
  );
};

export default Products;
