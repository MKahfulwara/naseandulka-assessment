import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import API from '../../apis';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/features/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) navigate('/');
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter Email');
    } else if (!password) {
      alert('Please Enter Password');
    } else {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      const { status, data } = await API.post('/login', formData);
      if (status === 200) {
        dispatch(login(data.token));
      }
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2 className='login-form__title'>Login</h2>
        <div className='login-form__group'>
          <label htmlFor='email' className='login-form__label'>
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
          <label htmlFor='password' className='login-form__label'>
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
          Login
        </button>

        <Link to='/register' className='link'>
          Dont have an Account? Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
