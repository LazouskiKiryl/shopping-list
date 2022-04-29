import DataService from '../../api/DataService';

const SET_IS_LOADING = 'DATA:SET_IS_LOADING';
const SET_IS_UPDATING = 'DATA:SET_IS_UPDATING';

const SET_LISTS = 'DATA:SET_LISTS';
const ADD_LIST = 'DATA:ADD_LIST';
const UPDATE_LIST = 'DATA:UPDATE_LIST';
const DELETE_LIST = 'DATA:DELETE_LIST';

const SET_PURCHASES = 'DATA:SET_PURCHASES';
const ADD_PURCHASE = 'DATA:ADD_PURCHASE';
const UPDATE_PURCHASE = 'DATA:UPDATE_PURCHASE';
const DELETE_PURCHASE = 'DATA:DELETE_PURCHASE';

const initialState = {
  isLoading: true,
  isUpdating: false,
  lists: [], // id, title
  purchases: [], // id, listId, title, count, done, time
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SET_IS_UPDATING:
      return {
        ...state,
        isUpdating: action.isUpdating,
      };
    case SET_PURCHASES:
      return {
        ...state,
        purchases: action.purchases,
      };
    case ADD_PURCHASE:
      return {
        ...state,
        purchases: [...state.purchases, action.purchase],
      };
    case UPDATE_PURCHASE:
      const updatedPurchase = { ...action.purchase };
      if (action.id) {
        updatedPurchase.id = action.id;
      }
      return {
        ...state,
        purchases: state.purchases.map((purchase) =>
          purchase.id !== action.purchase.id ? purchase : updatedPurchase
        ),
      };
    case DELETE_PURCHASE:
      return {
        ...state,
        purchases: state.purchases.filter((purchase) => purchase.id !== action.id),
      };
    case SET_LISTS:
      return {
        ...state,
        lists: action.lists,
      };
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.list],
      };
    case UPDATE_LIST:
      const updatedList = { ...action.list };
      if (action.id) {
        updatedList.id = action.id;
      }
      return {
        ...state,
        lists: state.lists.map((list) => (list.id !== action.list.id ? list : updatedList)),
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.id),
      };
    default:
      return state;
  }
};

export const setIsLoading = (isLoading) => ({ type: SET_IS_LOADING, isLoading });
export const setIsUpdating = (isUpdating) => ({ type: SET_IS_UPDATING, isUpdating });

export const setLists = (lists) => ({ type: SET_LISTS, lists });
export const addList = (list) => ({ type: ADD_LIST, list });
export const updateList = (list, id) => ({ type: UPDATE_LIST, list, id });
export const deleteList = (id) => ({ type: DELETE_LIST, id });

export const setPurchases = (purchases) => ({ type: SET_PURCHASES, purchases });
export const addPurchase = (purchase) => ({ type: ADD_PURCHASE, purchase });
export const updatePurchase = (purchase, id) => ({ type: UPDATE_PURCHASE, purchase, id });
export const deletePurchase = (id) => ({ type: DELETE_PURCHASE, id });

export function fetchData() {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    DataService.fetchData()
      .then((response) => {
        dispatch(setLists(response.data.lists));
        dispatch(setPurchases(response.data.purchases));
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
}

export default dataReducer;
