import { useState } from 'react';

import { MdAdd } from 'react-icons/md';
import uploadAreaImg from '../assets/images/upload_area.svg';

function AddProduct() {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',
  });

  const imageHandler = e => {
    setImage(e.target.files[0]);
  };

  const changeHandler = e => {
    setProductDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addProductHandler = async () => {
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    const res = await fetch('http://localhost:4000/upload', {
      method: 'POST',
      header: {
        Accept: 'application/json',
      },
      body: formData,
    });

    const responseData = await res.json();

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      const fetchRes = await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const data = await fetchRes.json();

      if (data.success) {
        alert('Product Added');
      } else {
        alert('Upload Failed');
      }
    }
  };

  return (
    <div className='p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7'>
      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Product Title:</h4>
        <input
          type='text'
          name='name'
          placeholder='Type here...'
          value={productDetails.name}
          onChange={changeHandler}
          className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md'
        />
      </div>
      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Old Price:</h4>
        <input
          type='text'
          name='old_price'
          placeholder='Type here...'
          value={productDetails.old_price}
          onChange={changeHandler}
          className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md'
        />
      </div>
      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>New Price:</h4>
        <input
          type='text'
          name='new_price'
          placeholder='Type here...'
          value={productDetails.new_price}
          onChange={changeHandler}
          className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md'
        />
      </div>
      <div className='mb-3 flex items-center gap-x-4'>
        <h4 className='bold-18 pb-2'>Product Category:</h4>
        <select
          name='category'
          id=''
          value={productDetails.category}
          onChange={changeHandler}
          className='bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none'
        >
          <option value='women'>Women</option>
          <option value='men'>Men</option>
          <option value='kid'>Kid</option>
        </select>
      </div>
      <div>
        <label htmlFor='file-input'>
          <img
            src={image ? URL.createObjectURL(image) : uploadAreaImg}
            alt='Upload area image'
            className='w-20 rounded-sm inline-block'
          />
        </label>
        <input
          type='file'
          name='image'
          id='file-input'
          onChange={imageHandler}
          hidden
          className='bg-primary max-w-80 w-full py-3 px-4'
        />
      </div>
      <button
        onClick={addProductHandler}
        className='btn_dark_rounded mt-4 flexCenter gap-x-1'
      >
        <MdAdd />
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;
