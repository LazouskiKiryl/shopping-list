import React from 'react';
import './Modal.scss';

import classNames from 'classnames';

const Modal = ({ children, isOpen, onClose }) => {
  const classes = classNames({
    modal: true,
    modal_open: isOpen,
  });

  return (
    <div className={classes} onClick={() => onClose()}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <span className="modal__close" onClick={() => onClose()}>
          &#10006;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
