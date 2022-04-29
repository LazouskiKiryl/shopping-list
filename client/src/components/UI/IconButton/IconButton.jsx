import classNames from 'classnames';
import React from 'react';
import './IconButton.scss';
import { closeIcon, deleteIcon, editIcon, moreIcon, okIcon } from './icons';

const iconsMap = {
  close: closeIcon,
  delete: deleteIcon,
  edit: editIcon,
  more: moreIcon,
  ok: okIcon,
};

const defaultIcon = okIcon;

const IconButton = ({ typeIcon, variant = 'dark', ...props }) => {
  const icon = iconsMap[typeIcon] || defaultIcon;

  const classes = classNames({
    'icon-button': true,
    'icon-button_dark': variant === 'dark',
    'icon-button_light': variant === 'light',
  });

  return (
    <button className={classes} {...props}>
      {icon}
    </button>
  );
};

export default IconButton;
