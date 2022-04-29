const SET_USER = 'USER:SET_USER';
const REMOVE_USER = 'USER:REMOVE_USER';

const initialState = {
  isAuth: false,
  name: 'Test 1',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuth: true,
        name: action.user.name,
      };
    case REMOVE_USER:
      return {
        ...state,
        isAuth: false,
        name: null,
      };
    default:
      return state;
  }
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export default userReducer;
