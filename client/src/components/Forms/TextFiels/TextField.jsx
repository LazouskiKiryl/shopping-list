import classNames from 'classnames';
import React, { useState } from 'react';
import './TextField.scss';

const TextField = ({
  type = 'text',
  initialValue = '',
  placeholder = '',
  disabled = false,
  validate,
  onUpdate,
}) => {
  const [value, setValue] = useState(initialValue);
  const [hint, setHint] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setHint('');

    onUpdate(newValue, true);
  };

  const handleBlur = (e) => {
    const hint = validate(value);
    setHint(hint);

    const isValid = hint === '';

    onUpdate(value, isValid);
  };

  const inputClasses = classNames({
    'text-field__input': true,
    'text-field__input_invalid': hint,
  });

  return (
    <div className="text-field">
      <input
        className={inputClasses}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <p className="text-field__hint">{hint}</p>
    </div>
  );
};

export default TextField;
