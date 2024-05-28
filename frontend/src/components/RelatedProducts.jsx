import { useContext } from 'react';

import Item from './Item';
import { ShopContext } from '../Context/ShopContext';

function RelatedProducts({ product }) {
  const { all_products } = useContext(ShopContext);
  const relatedProducts = all_products
    .filter(item => item.category === product.category)
    .slice(0, 6);

  return (
    <section className='bg-primary'>
      <div className='max_padd_container py-12 xl:w-[88%]'>
        <h3 className='h3 text-center'>Related Products</h3>
        <hr className='h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent via-black to-transparent mb-16' />
        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
          {relatedProducts.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProducts;
