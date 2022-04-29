import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Lists from '../../components/Lists/Lists';
import PurchaseList from '../../components/PurchaseList/PurchaseList';
import Loader from '../../components/UI/Loader/Loader';
import { fetchData } from '../../store/reducers/dataReducer';
import './ShoppingList.scss';

const ShoppingList = () => {
  const isLoading = useSelector((state) => state.data.isLoading);
  const lists = useSelector((state) => state.data.lists);
  const { listId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const activeList = listId ? lists.find((list) => list.id === listId) : null;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (!listId && !isLoading && lists.length !== 0) {
      history.replace('/list/' + lists[0].id);
    }
  }, [history, isLoading, listId, lists]);

  return (
    <div className="shopping-list container">
      {isLoading ? (
        <div className="center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="shopping-list__navigation">
            <Lists lists={lists} activeList={activeList} />
          </div>
          <div className="shopping-list__content">
            {activeList && <PurchaseList list={activeList} />}
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingList;
