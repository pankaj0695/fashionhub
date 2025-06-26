import { useState } from 'react';
import { API_BASE } from '../helpers/helper';

const FORMDATA_INITIAL_VALUE = {
  name: '',
  password: '',
  email: '',
};

function Login() {
  const [state, setState] = useState('Sign Up');
  const [formData, setFormData] = useState(FORMDATA_INITIAL_VALUE);

  const login = async () => {
    if (
      !formData.email ||
      formData.email.length === 0 ||
      !formData.password ||
      formData.password.length === 0
    ) {
      alert('Invalid credentials');
      return;
    }

    setFormData(FORMDATA_INITIAL_VALUE);

    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/formData',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    const data = await res.json();

    if (data.success) {
      localStorage.setItem('auth-token', data.token);
      window.location.replace('/');
    }
  };

  const signup = async () => {
    if (
      !formData.name ||
      formData.name.length === 0 ||
      !formData.email ||
      formData.email.length === 0 ||
      !formData.password ||
      formData.password.length === 0
    ) {
      alert('Invalid credentials');
      return;
    }

    setFormData(FORMDATA_INITIAL_VALUE);

    const res = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/formData',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.success) {
      localStorage.setItem('auth-token', data.token);
      window.location.replace('/');
    }
  };

  const changeHandler = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  };

  return (
    <section className='max_padd_container flexCenter flex-col pt-32'>
      <div className='max-w-[555px] h-[520px] bg-white m-auto px-14 py-10 mb-8 rounded-md'>
        <h3 className='h3'>{state}</h3>
        <div className='flex flex-col gap-4 mt-7'>
          {state === 'Sign Up' && (
            <input
              type='text'
              name='name'
              placeholder='Your Name'
              value={formData.name}
              onChange={changeHandler}
              className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'
            />
          )}
          <input
            type='email'
            name='email'
            placeholder='Email Address'
            value={formData.email}
            onChange={changeHandler}
            className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={changeHandler}
            className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'
          />
        </div>
        <button
          onClick={() => {
            state === 'Login' ? login() : signup();
          }}
          className='btn_dark_rounded my-5 w-full !rounded-md'
        >
          Continue
        </button>
        {state === 'Sign Up' ? (
          <p className='text-black font-bold'>
            Already have an account?{' '}
            <span
              onClick={() => {
                setState('Login');
              }}
              className='text-secondary underline cursor-pointer'
            >
              Login
            </span>
          </p>
        ) : (
          <p className='text-black font-bold'>
            Create an account?{' '}
            <span
              onClick={() => {
                setState('Sign Up');
              }}
              className='text-secondary underline cursor-pointer'
            >
              SignUp
            </span>
          </p>
        )}
        <div className='flexCenter mt-6 gap-3'>
          <input type='checkbox' name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </section>
  );
}

export default Login;
