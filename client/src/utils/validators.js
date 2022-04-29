const validateUsername = (value) => {
  if (value.trim() === '') {
    return 'Введите имя пользователя';
  } else if (value.length < 3 || value.length > 20) {
    return 'Имя пользователя должно содержать от 3 до 20 символов';
  } else {
    return '';
  }
};

const validatePassword = (value) => {
  if (value.trim() === '') {
    return 'Введите пароль';
  } else if (value.length < 5 || value.length > 30) {
    return 'Имя пользователя должно содержать от 5 до 30 символов';
  } else {
    return '';
  }
};

export { validateUsername, validatePassword };
