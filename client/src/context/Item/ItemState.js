import { useReducer } from 'react';
import itemContext from './itemContext';
import itemReducer from './itemReducer';
import { v4 as uuidv4 } from 'uuid';
import {
  ADD_ITEM,
  DELETE_ITEM,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ITEM,
  FILTER_ITEMS,
  CLEAR_FILTER,
} from '../types';

const ItemState = props => {
  const initState = {
    items: [
      {
        id: 1,
        name: 'Coke Can',
        price: 13,
        alcoholic: false,
        time: '12PM',
      },
      { id: 2, name: 'Beer', price: 13, alcoholic: true, time: null },
    ],
    current: null,
    filtered: null,
    cart: [],
  };
  const [state, dispatch] = useReducer(itemReducer, initState);

  const addItem = item => {
    item.id = uuidv4();
    dispatch({ type: ADD_ITEM, payload: item });
  };

  const deleteItem = id => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };

  const setCurrent = item => {
    dispatch({ type: SET_CURRENT, payload: item });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const updateItem = item => {
    dispatch({ type: UPDATE_ITEM, payload: item });
  };

  const filterItems = text => {
    dispatch({ type: FILTER_ITEMS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <itemContext.Provider
      value={{
        items: state.items,
        cart: state.cart,
        current: state.current,
        filtered: state.filtered,
        addItem,
        deleteItem,
        setCurrent,
        clearCurrent,
        updateItem,
        filterItems,
        clearFilter,
      }}>
      {props.children}
    </itemContext.Provider>
  );
};

export default ItemState;
