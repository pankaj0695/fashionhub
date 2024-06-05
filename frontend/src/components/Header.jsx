import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from './Navbar';
import { ShopContext } from '../Context/ShopContext';
import { MdMenu, MdClose } from 'react-icons/md';
import { FaOpencart } from 'react-icons/fa';
import logo from '../assets/fashionhub.svg';
import logout from '../assets/images/logout.svg';
import user from '../assets/images/user.svg';

function Header() {
  const [menuOpened, setMenuOpened] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);

  const toggleMenu = () => {
    setMenuOpened(prevMenu => !prevMenu);
  };

  return (
    <header className='fixed top-0 left-0 m-auto max_padd_container w-full bg-white ring-1 ring-slate-900/5 z-10 max-xs:px-2'>
      <div className='px-4 flexBetween py-3 max-xs:px-2'>
        <div>
          <a href='/'>
            <img
              src={logo}
              alt='FashionHub Logo'
              width='80px'
              className='max-xs:w-14'
            />
          </a>
        </div>
        <Navbar containerStyles='hidden md:flex gap-x-5 xl:gap-x-10 medium-15' />
        <Navbar
          containerStyles={`flex items-start flex-col gap-y-12 fixed top-28 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 ${
            menuOpened ? 'right-8' : '-right-[100%]'
          }`}
        />
        <div className='flexBetween sm:gap-x-2 bold-16'>
          <div className='flexBetween sm:gap-x-6'>
            <NavLink
              to='/cart'
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className='flex'
            >
              <FaOpencart className='p-1 h-8 w-8 ring-slate-900/30 ring-1 rounded-full' />
              <span className='relative flexCenter w-5 h-5 rounded-full bg-secondary text-white medium-14 -top-2'>
                {getTotalCartItems()}
              </span>
            </NavLink>

            {localStorage.getItem('auth-token') ? (
              <NavLink
                to='/logout'
                onClick={() => {
                  localStorage.removeItem('auth-token');
                  window.location.replace('/');
                }}
                className='btn_secondary_rounded flexCenter gap-x-2 medium-16 max-xs:text-[13px] max-xs:px-6 max-xs:py-[9px]'
              >
                <img src={logout} alt='Logout Icon' height={19} width={19} />
                Logout
              </NavLink>
            ) : (
              <NavLink
                to='/login'
                className='btn_secondary_rounded flexCenter gap-x-2 medium-16 max-xs:text-[13px] max-xs:px-6 max-xs:py-[9px]'
              >
                <img
                  src={user}
                  alt='userIcon'
                  height={19}
                  width={19}
                  className='max-xs:hidden'
                />
                Login
              </NavLink>
            )}
          </div>
          {!menuOpened ? (
            <MdMenu
              className='md:hidden cursor-pointer hover:text-secondary ml-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full hover:ring-secondary'
              onClick={toggleMenu}
            />
          ) : (
            <MdClose
              className='md:hidden cursor-pointer hover:text-secondary ml-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full hover:ring-secondary'
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
