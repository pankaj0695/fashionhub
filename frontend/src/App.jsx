import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Logout from './pages/Logout';

import mensBanner from './assets/images/bannermens.png';
import womensBanner from './assets/images/bannerwomens.png';
import kidsBanner from './assets/images/bannerkids.png';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/mens',
        element: <Category category='men' banner={mensBanner} />,
      },
      {
        path: '/womens',
        element: <Category category='women' banner={womensBanner} />,
      },
      {
        path: '/kids',
        element: <Category category='kid' banner={kidsBanner} />,
      },
      { path: '/products/:productId', element: <Product /> },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      { path: '/logout', element: <Logout /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
