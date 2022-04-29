import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthService from '../../api/AuthService';
import { setUser } from '../../store/reducers/userReducer';
import { validatePassword, validateUsername } from '../../utils/validators';
import Button from '../UI/Button/Button';
import './Form.scss';
import TextField from './TextFiels/TextField';

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState({ value: '', isValid: false });
  const [password, setPassword] = useState({ value: '', isValid: false });
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const authData = await AuthService.registration(username.value, password.value);
      const { user, token } = authData;
      dispatch(setUser(user));
      localStorage.setItem('accessToken', token);
    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message;
      setError(errorMessage);
      setLoading(false);
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

  const submitButtonTitle = loading ? 'Выполняется регистрация' : 'Зарегистрироваться';

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
      <Link className="form__link" to="/login">
        Войти
      </Link>
    </form>
  );
};

export default RegistrationForm;
