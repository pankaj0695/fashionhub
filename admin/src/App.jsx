import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Root from './pages/Root';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/addproduct', element: <AddProduct /> },
      { path: '/productList', element: <ProductList /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
