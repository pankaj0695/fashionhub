import { Link } from 'react-router-dom';

import addProductImg from '../assets/images/addproduct.png';
import productListImg from '../assets/images/productlist.png';

function Sidebar() {
  return (
    <div className='py-7 flex justify-center gap-x-2 gap-y-5 w-full bg-white sm:gap-x-4 lg:flex-col lg:pt-20 lg:max-w-60 lg:h-screen lg:justify-start lg:pl-6'>
      <Link to='/addproduct'>
        <button className='flexCenter gap-2 rounded-md bg-primary h-12 w-40 xs:w-44 medium-16'>
          <img
            src={addProductImg}
            alt='Add product image'
            height={50}
            width={50}
          />
          <span>Add Product</span>
        </button>
      </Link>
      <Link to='/productlist'>
        <button className='flexCenter gap-2 rounded-md bg-primary h-12 w-40 xs:w-44 medium-16'>
          <img
            src={productListImg}
            alt='Product list image'
            height={50}
            width={50}
          />
          <span>Product List</span>
        </button>
      </Link>
    </div>
  );
}

export default Sidebar;
