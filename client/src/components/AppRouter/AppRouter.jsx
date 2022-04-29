import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import AuthService from '../../api/AuthService';
import { privateRoutes, publicRoutes } from '../../router';
import { setUser, removeUser } from '../../store/reducers/userReducer';
import Loader from '../UI/Loader/Loader';

const AppRouter = () => {
  const [loading, setLoading] = useState(true);
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    AuthService.check()
      .then(({ user, token }) => {
        dispatch(setUser(user));
        localStorage.setItem('accessToken', token);
      })
      .catch((e) => {
        dispatch(removeUser());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {isAuth ? (
        <Switch>
          {privateRoutes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect to="/list" />
        </Switch>
      ) : (
        <Switch>
          {publicRoutes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect to="/login" />
        </Switch>
      )}
    </>
  );
};

export default AppRouter;
