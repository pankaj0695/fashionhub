import { createContext, useEffect, useState } from 'react';

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i <= 300; i++) {
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
});

const ShopContextProvider = props => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [all_products, setAll_products] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(data => {
        setAll_products(data);
      });
  }, []);

  const addToCart = itemId => {
    setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      });
    }
  };

  const removeFromCart = itemId => {
    setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const id in cartItems) {
      if (cartItems[id] > 0) {
        let item = all_products.find(product => product.id === +id);
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

  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    getTotalCartAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
