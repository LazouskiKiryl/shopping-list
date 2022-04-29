import React, { useState } from 'react';
import DataUpdater from '../../../api/DataUpdater';
import IconButton from '../../UI/IconButton/IconButton';
import EditablePurchaseItem from './EditablePurchaseItem';
import './PurchaseItem.scss';

const PurchaseItem = ({ purchase }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleChecked = (e) => {
    DataUpdater.updatePurchase({ ...purchase, done: e.target.checked });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    DataUpdater.deletePurchase(purchase.id);
  };

  const handleStartEdit = (e) => {
    e.preventDefault();

    setIsEdit(true);
  };

  const endEditAndUpdate = ({ title, count }) => {
    DataUpdater.updatePurchase({ ...purchase, title, count });
    setIsEdit(false);
  };

  const cancelEdit = () => {
    setIsEdit(false);
  };

  if (isEdit) {
    return (
      <EditablePurchaseItem purchase={purchase} onUpdate={endEditAndUpdate} onCancel={cancelEdit} />
    );
  }

  return (
    <div className="purchase-item">
      <input
        className="purchase-item__checkbox"
        type="checkbox"
        checked={purchase.done}
        onChange={handleChecked}
      />
      <div className="purchase-item__content">
        <span className="purchase-item__title">{purchase.title}</span>
        <span className="purchase-item__count">{purchase.count}</span>
      </div>
      <div className="purchase-item__buttons">
        <IconButton typeIcon="edit" onClick={handleStartEdit} />
        <IconButton typeIcon="delete" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default PurchaseItem;
