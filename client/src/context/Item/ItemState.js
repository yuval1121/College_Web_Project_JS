import { useReducer } from 'react';
import uuid from 'uuid';
import itemContext from './itemContext';
import itemReducer from './itemReducer';
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
      { id: 1, name: 'Coke Can', price: 13, alcoholic: false, time: null },
      { id: 2, name: 'Pepsi Can', price: 13, alcoholic: false, time: null },
    ],
  };
  const [state, dispatch] = useReducer(itemReducer, initState);

  return (
    <itemContext.Provider
      value={{
        items: state.items,
      }}
    >
      {props.children}
    </itemContext.Provider>
  );
};

export default ItemState;
