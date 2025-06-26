import { createContext, useEffect, useState } from 'react';
import { API_BASE } from '../helpers/helper';

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i <= 50; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContext = createContext({
  all_products: [],
  cartItems: getDefaultCart(),
  addToCart: () => {},
  removeFromCart: () => {},
  getTotalCartItems: () => Number,
  getTotalCartAmount: () => Number,
  clearCart: () => {},
});

const ShopContextProvider = props => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [all_products, setAll_products] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(`${API_BASE}/products`);
      let resData = await res.json();
      setAll_products(resData);

      const token = localStorage.getItem('auth-token');
      if (token) {
        res = await fetch(`${API_BASE}/cart`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': `${token}`,
          },
        });
        resData = await res.json();
        setCartItems(resData);
      }
    };
    fetchData();
  }, []);

  const addToCart = itemId => {
    setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    const token = localStorage.getItem('auth-token');
    if (token) {
      fetch(`${API_BASE}/addtocart`, {
        method: 'POST',
        body: JSON.stringify({ itemId: itemId }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': `${token}`,
        },
      });
    }
  };

  const removeFromCart = itemId => {
    setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    const token = localStorage.getItem('auth-token');
    if (token) {
      fetch(`${API_BASE}/removefromcart`, {
        method: 'POST',
        body: JSON.stringify({ itemId: itemId }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': `${token}`,
        },
      });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const id in cartItems) {
      if (cartItems[id] > 0) {
        const item = all_products.find(product => product.id === +id);
        totalAmount += item.new_price * cartItems[id];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const id in cartItems) {
      if (cartItems[id] > 0) totalItem += cartItems[id];
    }
    return totalItem;
  };

  const clearCart = () => {
    setCartItems(getDefaultCart());
    const token = localStorage.getItem('auth-token');
    if (token) {
      fetch(`${API_BASE}/clearcart`, {
        method: 'POST',
        body: JSON.stringify({ cartData: getDefaultCart() }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': `${token}`,
        },
      });
    }
  };

  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    getTotalCartAmount,
    clearCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
