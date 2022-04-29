import React, { useRef, useState } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import Button from '../../UI/Button/Button';
import './ListForm.scss';

const ListForm = ({ onCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const formRef = useRef();
  const titleRef = useRef();

  const outsideClickHandler = () => {
    if (title.trim() !== '') {
      onCreate(title);
    }

    setIsOpen(false);
  };

  useOutsideClick(formRef, outsideClickHandler, isOpen);

  const handleStart = (e) => {
    e.preventDefault();

    setTitle('');
    setIsOpen(true);
  };

  const handleCreate = (e) => {
    e.preventDefault();

    if (title.trim() === '') {
      titleRef.current.focus();
    } else {
      onCreate(title);
      setTitle('');
      setIsOpen(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();

    setIsOpen(false);
  };

  return (
    <form className="list-form" ref={formRef}>
      {isOpen && (
        <input
          className="list-form__title"
          ref={titleRef}
          type="text"
          value={title}
          placeholder="Введите название списка"
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
      )}
      <div className="list-form__buttons">
        <Button visible={isOpen} onClick={handleCreate}>
          Добавить список
        </Button>
        <Button visible={isOpen} onClick={handleCancel}>
          Отмена
        </Button>
        <Button visible={!isOpen} onClick={handleStart}>
          Добавить список
        </Button>
      </div>
    </form>
  );
};

export default ListForm;
