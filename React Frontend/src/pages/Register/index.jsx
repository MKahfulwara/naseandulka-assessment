import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../../apis';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/');
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert('Please enter your name');
    } else if (!email) {
      alert('Please enter your email');
    } else if (!password) {
      alert('Please enter your password');
    } else {
      try {
        const { status } = await API.post('/register', {
          name,
          email,
          password,
        });
        if (status === 200) navigate('/login');
      } catch (error) {
        console.log('Registration failed:', error);
      }
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2 className='login-form__title'>Register</h2>
        <div className='login-form__group'>
          <label htmlFor='name' className='ogin-form__label'>
            Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='login-form__input'
          />
        </div>
        <div className='login-form__group'>
          <label htmlFor='email' className='ogin-form__label'>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='login-form__input'
          />
        </div>
        <div className='login-form__group'>
          <label htmlFor='password' className='ogin-form__label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='login-form__input'
          />
        </div>
        <button type='submit' className='login-form__button'>
          Register
        </button>

        <Link to='/login' className='link'>
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
