import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Root() {
  return (
    <main className='bg-primary text-tertiary'>
      <Navbar />
      <div className='lg:flex'>
        <Sidebar />
        <Outlet />
      </div>
    </main>
  );
}

export default Root;
