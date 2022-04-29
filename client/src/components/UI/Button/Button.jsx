import React from 'react';
import './Button.scss';
import classNames from 'classnames';

const Button = ({ children, variant = 'primary', visible = true, ...props }) => {
  const classes = classNames({
    button: true,
    button_primary: variant === 'primary',
    button_secondary: variant === 'secondary',
    button_transparent: variant === 'transparent',
    hidden: !visible,
  });

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
