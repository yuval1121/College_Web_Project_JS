import { useReducer } from 'react';
import AlertContext from './AlertContext';
import alertReducer from './AlertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';
import { v4 as uuidv4 } from 'uuid';

const AlertState = props => {
  const initState = [];
  const [state, dispatch] = useReducer(alertReducer, initState);

  // set alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
