import React, { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import IconButton from '../../UI/IconButton/IconButton';

const EditingPurchaseItem = ({ purchase, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(purchase.title);
  const [count, setCount] = useState(purchase.count);
  const formRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const endEdit = () => {
    if (title !== purchase.title || count !== purchase.count) {
      onUpdate({ title, count });
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
    <form className="purchase-item purchase-item_active" ref={formRef}>
      <div className="purchase-item__content">
        <input
          className="purchase-item__title"
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="purchase-item__count"
          type="text"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
      </div>
      <div className="purchase-item__buttons purchase-item__buttons_visible">
        <IconButton typeIcon="ok" onClick={handleEndEdit} />
        <IconButton typeIcon="close" onClick={handleCancelEdit} />
      </div>
    </form>
  );
};

export default EditingPurchaseItem;
