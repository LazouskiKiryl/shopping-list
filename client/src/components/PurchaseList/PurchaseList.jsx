import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DataUpdater from '../../api/DataUpdater';
import Button from '../UI/Button/Button';
import PurchaseForm from './PurchaseForm/PurchaseForm';
import PurchaseItem from './PurchaseItem/PurchaseItem';
import './PurchaseList.scss';

const PurchaseList = ({ list }) => {
  const [purchases, setPurchases] = useState([]);
  const [donePurchases, setDonePurchases] = useState([]);
  const [showDone, setShowDone] = useState(false);
  const allPurchases = useSelector((state) => state.data.purchases);

  const listTitle = list?.title;

  const createPurchase = (title, count) => {
    DataUpdater.addPurchase(title, count, list.id);
  };

  useEffect(() => {
    const listPurchases = list
      ? allPurchases.filter((purchase) => purchase.listId === list.id)
      : allPurchases;

    const purchases = listPurchases.filter((purchase) => !purchase.done);
    setPurchases(purchases);

    const donePurchases = listPurchases.filter((purchase) => purchase.done);
    setDonePurchases(donePurchases);
  }, [allPurchases, list]);

  const handleToggleShow = (e) => {
    e.preventDefault();

    setShowDone((show) => !show);
  };

  const purchaseItems = purchases.map((purchase) => (
    <PurchaseItem key={purchase.id} purchase={purchase} />
  ));

  const donePurchaseItems = donePurchases.map((purchase) => (
    <PurchaseItem key={purchase.id} purchase={purchase} />
  ));

  const isEmptyList = purchaseItems.length === 0;
  const isEmptyDoneList = donePurchaseItems.length === 0;
  const titleToggleButton = showDone ? 'Скрыть' : 'Показать';

  return (
    <div className="purchase-list">
      <div className="purchase-list__section">
        <h3 className="purchase-list__title">
          {listTitle} <span className="purchase-list__count">{purchaseItems.length}</span>
        </h3>
        {isEmptyList ? (
          <p className="purchase-list__message">Список пуст</p>
        ) : (
          <div className="purchase-list__list">{purchaseItems}</div>
        )}
        <PurchaseForm onCreate={createPurchase} />
      </div>
      {!isEmptyDoneList && (
        <div className="purchase-list__section">
          <div className="purchase-list__header">
            <h3 className="purchase-list__title purchase-list__title_done">
              Куплено <span className="purchase-list__count">{donePurchaseItems.length}</span>
            </h3>
            <Button variant="secondary" onClick={handleToggleShow}>
              {titleToggleButton}
            </Button>
          </div>
          {showDone && <div className="purchase-list__list">{donePurchaseItems}</div>}
        </div>
      )}
    </div>
  );
};

export default PurchaseList;
