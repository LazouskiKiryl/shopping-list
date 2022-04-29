import React from 'react';
import { useHistory } from 'react-router-dom';
import DataUpdater from '../../api/DataUpdater';
import ListForm from './ListForm/ListForm';
import ListItem from './ListItem/ListItem';
import './Lists.scss';

const Lists = ({ lists, activeList }) => {
  const history = useHistory();

  const onCreate = (title) => {
    DataUpdater.addList(title);
  };

  const onDelete = (id) => {
    DataUpdater.deleteList(id);

    if (activeList.id !== id) return;

    const listIndex = lists.findIndex((list) => list === activeList);
    const prevListId = lists[listIndex - 1]?.id;

    if (prevListId) {
      history.replace('/list/' + prevListId);
    } else {
      history.replace('/list');
    }
  };

  const listItems = lists.map((list) => {
    return <ListItem key={list.id} list={list} active={list === activeList} onDelete={onDelete} />;
  });

  const isEmptyList = listItems.length === 0;
  return (
    <div className="lists">
      {isEmptyList ? <p className="lists__message">Добавьте свой первый список</p> : listItems}
      <ListForm onCreate={onCreate} />
    </div>
  );
};

export default Lists;
