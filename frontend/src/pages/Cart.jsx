import { useContext } from 'react';

import { ShopContext } from '../Context/ShopContext';
import logo from '../assets/fashionhub.svg';
import { TbTrash } from 'react-icons/tb';

function Cart() {
  const {
    all_products,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    clearCart,
  } = useContext(ShopContext);

  const initPayment = data => {
    const itemsName = all_products
      .filter(item => cartItems[item.id] > 0)
      .reduce((str, item) => str + item.name + ', ', '');
    const options = {
      key: 'rzp_test_iWhMDUNVzE8e8a',
      amount: data.amount,
      currency: data.currency,
      name: itemsName,
      description: 'Test Transaction',
      image: logo,
      order_id: data.id,
      handler: async response => {
        try {
          const verifyUrl = 'http://localhost:4000/verify-payment';
          const res = await fetch(verifyUrl, {
            method: 'POST',
            body: JSON.stringify(response),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const { data } = await res.json();
          console.log(data);
          clearCart();
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: '#3399cc',
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const paymentHandler = async () => {
    try {
      const orderUrl = 'http://localhost:4000/order';
      const token = localStorage.getItem('auth-token');
      // const { data } = await axios.post(orderUrl, {
      //   amount: getTotalCartAmount(),
      // });
      if (token) {
        const res = await fetch(orderUrl, {
          method: 'POST',
          body: JSON.stringify({ amount: getTotalCartAmount() }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': `${token}`,
          },
        });
        const { data } = await res.json();
        console.log(data);
        initPayment(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className='max_padd_container pt-28 pb-16 max-xs:px-3'>
      <table className='w-full mx-auto'>
        <thead>
          <tr className='bg-slate-900/10 regular-18 sm:regular-22 text-start py-12'>
            <th className='p-1 py-2'>Products</th>
            <th className='p-1 py-2 max-xs:hidden'>Title</th>
            <th className='p-1 py-2'>Price</th>
            <th className='p-1 py-2'>Quantity</th>
            <th className='p-1 py-2 max-xs:hidden'>Total</th>
            <th className='p-1 py-2'>Remove</th>
          </tr>
        </thead>
        <tbody>
          {all_products.map(item => {
            if (cartItems[item.id] > 0) {
              return (
                <tr
                  key={item.id}
                  className='border-b border-slate-900/20 text-gray-30 p-6 medium-14 text-center'
                >
                  <td className='flexCenter'>
                    <img
                      src={item.image}
                      alt='product image'
                      height={43}
                      width={43}
                      className='rounded-lg ring1-slate-900/5 my-1'
                    />
                  </td>
                  <td className='max-xs:hidden'>
                    <div className='line-clamp-3'>{item.name}</div>
                  </td>
                  <td>&#8377;{item.new_price}</td>
                  <td className='w-16 h-16 bg-white'>{cartItems[item.id]}</td>
                  <td className='max-xs:hidden'>
                    &#8377;{item.new_price * cartItems[item.id]}
                  </td>
                  <td>
                    <div className='bold-22 pl-14'>
                      <TbTrash onClick={removeFromCart.bind(null, item.id)} />
                    </div>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
      <div className='flex flex-col gap-20 mt-16 p-8 md:flex-row rounded-md bg-white w-full max-w-[666px] max-xs:px-6 max-xs:py-6'>
        <div className='flex flex-col gap-10 w-72 max-xs:w-52'>
          <h4 className='bold-20'>Summary</h4>
          <div>
            <div className='flexBetween py-4'>
              <h4 className='medium-16'>Subtotal:</h4>
              <h4 className='text-gray-30 font-semibold'>
                &#8377;{getTotalCartAmount()}
              </h4>
            </div>
            <hr />
            <div className='flexBetween py-4'>
              <h4 className='medium-16'>Shipping Fee:</h4>
              <h4 className='text-gray-30 font-semibold'>Free</h4>
            </div>
            <hr />
            <div className='flexBetween py-4'>
              <h4 className='bold-18'>Total:</h4>
              <h4 className='bold-18'>&#8377;{getTotalCartAmount()}</h4>
            </div>
          </div>
          <button onClick={paymentHandler} className='btn_dark_rounded w-44'>
            Checkout
          </button>
          {/* <div className='flex flex-col gap-10'>
            <h4 className='bold-20 capitalize max-xs:bold-16'>
              Your coupon code enter here:
            </h4>
            <div className='flexBetween pl-5 h-12 bg-primary rounded-full ring-1 ring-slate-900/10'>
              <input
                type='text'
                placeholder='Coupon code'
                className='bg-transparent border-none outline-none max-xs:w-40'
              />
              <button className='btn_dark_rounded'>Submit</button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Cart;
