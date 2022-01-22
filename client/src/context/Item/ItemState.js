import { useReducer } from 'react';
import itemContext from './itemContext';
import itemReducer from './itemReducer';
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
  ADD_TO_ORDER,
  DELETE_FROM_ORDER,
  MAKE_ORDER,
} from '../types';

const ItemState = props => {
  const initState = {
    items: null,
    current: null,
    filtered: null,
    order: [],
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

  const addToOrder = item => {
    dispatch({ type: ADD_TO_ORDER, payload: item });
  };

  const makeOrder = async order => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      await axios.post('/api/orders/makeorder', { items: order }, config);
      dispatch({ type: MAKE_ORDER });
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

  const deleteFromOrder = item => {
    dispatch({ type: DELETE_FROM_ORDER, payload: item });
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
        order: state.order,
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
        //orders
        addToOrder,
        deleteFromOrder,
        makeOrder,
      }}>
      {props.children}
    </itemContext.Provider>
  );
};

export default ItemState;
