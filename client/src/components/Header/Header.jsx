import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setIsLoading, setLists, setPurchases } from '../../store/reducers/dataReducer';
import { removeUser } from '../../store/reducers/userReducer';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import './Header.scss';

const Header = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const username = useSelector((state) => state.user.name);
  const isUpdating = useSelector((state) => state.data.isUpdating);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    dispatch(setPurchases([]));
    dispatch(setLists([]));
    dispatch(removeUser());
    dispatch(setIsLoading(true));
  };

  return (
    <header className="header">
      <div className="header__container container">
        <Link className="header__title" to="/">
          Список попупок
        </Link>
        {isAuth && (
          <div className="header__navigation">
            {isUpdating && <Loader />}
            <span>{username}</span>
            <Button variant="transparent" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
