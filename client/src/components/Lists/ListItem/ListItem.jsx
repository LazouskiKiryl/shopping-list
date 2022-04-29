import classNames from 'classnames';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DataUpdater from '../../../api/DataUpdater';
import IconButton from '../../UI/IconButton/IconButton';
import EditableListItem from './EditableListItem';
import './ListItem.scss';

const ListItem = ({ list, active, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleStartEdit = (e) => {
    e.preventDefault();

    setIsEdit(true);
  };

  const endEditAndUpdate = ({ title }) => {
    DataUpdater.updateList(list.id, title);
    setIsEdit(false);
  };

  const cancelEdit = () => {
    setIsEdit(false);
  };

  if (isEdit) {
    return <EditableListItem list={list} onUpdate={endEditAndUpdate} onCancel={cancelEdit} />;
  }

  const classes = classNames({
    'list-item': true,
    'list-item_active': active,
  });

  return (
    <div className={classes}>
      <div className="list-item__content">
        <NavLink to={`/list/${list.id || ''}`} className="list-item__title" exact>
          {list.title}
        </NavLink>
      </div>
      <div className="list-item__buttons">
        <IconButton typeIcon="edit" onClick={handleStartEdit} />
        <IconButton typeIcon="delete" onClick={() => onDelete(list.id)} />
      </div>
    </div>
  );
};

export default ListItem;
