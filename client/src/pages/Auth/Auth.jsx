import React from 'react';
import { useLocation } from 'react-router';
import LoginForm from '../../components/Forms/LoginForm';
import RegistrationForm from '../../components/Forms/RegistrationForm';
import './Auth.scss';

const Auth = () => {
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';
  const isSignup = pathname === '/signup';

  return (
    <div className="auth container center">
      {isLogin && <LoginForm />}
      {isSignup && <RegistrationForm />}
    </div>
  );
};

export default Auth;
