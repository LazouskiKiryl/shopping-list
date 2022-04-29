import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthService from '../../api/AuthService';
import { setUser } from '../../store/reducers/userReducer';
import { validatePassword, validateUsername } from '../../utils/validators';
import Button from '../UI/Button/Button';
import './Form.scss';
import TextField from './TextFiels/TextField';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState({ value: 'lllll', isValid: true });
  const [password, setPassword] = useState({ value: 'lllll', isValid: true });
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username.isValid || !password.isValid) return;

    setError('');
    setLoading(true);

    try {
      const authData = await AuthService.login(username.value, password.value);
      const { user, token } = authData;
      dispatch(setUser(user));
      localStorage.setItem('accessToken', token);
    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message;
      setLoading(false);
      setError(errorMessage);
    }
  };

  const updateUsername = (username, isValid) => {
    setUsername({ value: username, isValid });
    setError('');
  };

  const updatePassword = (password, isValid) => {
    setPassword({ value: password, isValid });
    setError('');
  };

  const submitButtonTitle = loading ? 'Выполняется вход' : 'Войти';

  return (
    <form className="form">
      {error && <p className="form__error">{error}</p>}
      <TextField
        initialValue={username.value}
        placeholder="Имя пользователя"
        disabled={loading}
        validate={validateUsername}
        onUpdate={updateUsername}
      />
      <TextField
        type="password"
        initialValue={password.value}
        placeholder="Пароль"
        disabled={loading}
        validate={validatePassword}
        onUpdate={updatePassword}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {submitButtonTitle}
      </Button>
      {/* <Button onClick={handleSubmit} disabled={false}>
        Войти
      </Button> */}
      <Link className="form__link" to="/signup">
        Зарегистрироваться
      </Link>
    </form>
  );
};

export default LoginForm;
