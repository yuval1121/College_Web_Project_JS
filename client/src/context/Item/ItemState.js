import { useReducer } from 'react';
import itemContext from './itemContext';
import itemReducer from './itemReducer';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {
  ADD_ITEM,
  DELETE_ITEM,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ITEM,
  FILTER_ITEMS,
  CLEAR_FILTER,
  ITEM_ERROR,
  GET_ITEMS,
} from '../types';

const ItemState = props => {
  const initState = {
    items: null,
    current: null,
    filtered: null,
    cart: null,
    error: null,
  };
  const [state, dispatch] = useReducer(itemReducer, initState);

  const getItems = async () => {
    try {
      const res = await axios.get('/api/items');
      dispatch({ type: GET_ITEMS, payload: res.data });
    } catch (error) {
      dispatch({ type: ITEM_ERROR, payload: error.response.msg });
    }
  };

  const addItem = async item => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/items', item, config);
      dispatch({ type: ADD_ITEM, payload: res.data });
    } catch (error) {
      dispatch({ type: ITEM_ERROR, payload: error.response.msg });
    }
  };

  const deleteItem = async id => {
    try {
      await axios.delete(`/api/items/${id}`);
      dispatch({ type: DELETE_ITEM, payload: id });
    } catch (error) {
      dispatch({ type: ITEM_ERROR, payload: error.response.msg });
    }
  };

  const setCurrent = item => {
    dispatch({ type: SET_CURRENT, payload: item });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const updateItem = async item => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/items/${item._id}`, item, config);
      dispatch({ type: UPDATE_ITEM, payload: res.data });
    } catch (error) {
      dispatch({ type: ITEM_ERROR, payload: error.response.msg });
    }
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
        error: state.error,
        getItems,
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
