import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { ShopContext } from '../Context/ShopContext';
import ProductHeader from '../components/ProductHeader';
import ProductDisplay from '../components/ProductDisplay';
import ProductDescription from '../components/ProductDescription';
import RelatedProducts from '../components/RelatedProducts';

function Product() {
  const { all_products } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_products.find(product => product.id === +productId);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <section className='max_padd_container py-28'>
      <div>
        <ProductHeader product={product} />
        <ProductDisplay product={product} />
        <ProductDescription />
        <RelatedProducts product={product} />
      </div>
    </section>
  );
}

export default Product;
