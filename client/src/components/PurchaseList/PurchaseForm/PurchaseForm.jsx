import classNames from 'classnames';
import React, { useLayoutEffect, useRef, useState } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import Button from '../../UI/Button/Button';
import './PurchaseForm.scss';

const PurchaseForm = ({ onCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [count, setCount] = useState('');
  const formRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    if (isOpen) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  const outsideClickHandler = () => {
    if (title.trim() !== '') {
      onCreate(title, count);
    }

    setIsOpen(false);
  };

  useOutsideClick(formRef, outsideClickHandler, isOpen);

  const handleStart = (e) => {
    e.preventDefault();

    setTitle('');
    setCount('');
    setIsOpen(true);

    titleRef.current.focus();
  };

  const handleCreate = (e) => {
    e.preventDefault();

    if (title.trim() !== '') {
      onCreate(title, count);
      setTitle('');
      setCount('');
    }

    titleRef.current.focus();
  };

  const handleCancel = (e) => {
    e.preventDefault();

    setIsOpen(false);
  };

  const inputsClasses = classNames({
    'purchase-form__inputs': true,
    'purchase-form__inputs_hidden': !isOpen,
  });

  return (
    <form className="purchase-form" ref={formRef}>
      <div className={inputsClasses}>
        <input
          className="purchase-form__title"
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите название покупки"
        />
        <input
          className="purchase-form__count"
          type="text"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="Количество"
        />
      </div>
      <div className="purchase-form__buttons">
        <Button visible={isOpen} onClick={handleCreate}>
          Добавить покупку
        </Button>
        <Button visible={isOpen} onClick={handleCancel}>
          Отмена
        </Button>
        <Button visible={!isOpen} onClick={handleStart}>
          Добавить покупку
        </Button>
      </div>
    </form>
  );
};

export default PurchaseForm;
