import React, { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import IconButton from '../../UI/IconButton/IconButton';

const EditableListItem = ({ list, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(list.title);
  const formRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const endEdit = () => {
    if (title !== list.title) {
      onUpdate({ title });
    } else {
      onCancel();
    }
  };

  useOutsideClick(formRef, endEdit);

  const handleEndEdit = (e) => {
    e.preventDefault();

    endEdit();
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();

    onCancel();
  };

  return (
    <form className="list-item list-item_edit" ref={formRef}>
      <div className="list-item__content">
        <input
          className="list-item__title list-item__title_edit"
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="list-item__buttons">
        <IconButton typeIcon="ok" onClick={handleEndEdit} />
        <IconButton typeIcon="close" onClick={handleCancelEdit} />
      </div>
    </form>
  );
};

export default EditableListItem;
