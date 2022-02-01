import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ItemContext from '../../context/Item/itemContext';
import AuthContext from '../../context/auth/AuthContext';

const Item = ({ item }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const itemContext = useContext(ItemContext);
  const { deleteItem, setCurrent, clearCurrent, addToOrder } = itemContext;
  const { _id, name, price, alcoholic, time } = item;

  const onDelete = () => {
    deleteItem(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (alcoholic === false ? 'badge-success' : 'badge-primary')
          }>
          {alcoholic === false ? 'Non-Alcoholic' : 'Alcoholic'}
        </span>
      </h3>
      <ul className='list'>
        {price && (
          <li>
            Price:<i className='fas'></i> {price}₪
          </li>
        )}

        {time && (
          <li>
            <i className='fas'></i> Available at {time}
          </li>
        )}
      </ul>
      {user?.role.includes('client') && (
        <p className='btn btn-dark btn-sm' onClick={() => addToOrder(item)}>
          Add
        </p>
      )}
      {user?.role === 'admin' && (
        <p className='btn btn-dark btn-sm' onClick={() => setCurrent(item)}>
          Edit
        </p>
      )}
      {user?.role === 'admin' && (
        <p className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </p>
      )}
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    alcoholic: PropTypes.bool,
    time: PropTypes.string,
  }).isRequired,
};

export default Item;
