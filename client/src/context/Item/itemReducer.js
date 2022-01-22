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

const itemReducer = (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false,
      };
    case ADD_TO_ORDER: {
      return {
        ...state,
        order: [action.payload, ...state.order],
      };
    }
    case MAKE_ORDER: {
      return { ...state, order: [] };
    }
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload._id ? action.payload : item
        ),
        loading: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        loading: false,
      };
    case DELETE_FROM_ORDER: {
      return {
        ...state,
        order: state.order.filter(item => item._id !== action.payload),
      };
    }
    case SET_CURRENT:
      return { ...state, current: action.payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case FILTER_ITEMS:
      return {
        ...state,
        filtered: state.items.filter(item => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            item.name.match(regex) || item.price.toString() === action.payload
          );
        }),
      };
    case CLEAR_FILTER: {
      return { ...state, filtered: null };
    }
    case ITEM_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default itemReducer;
