import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ItemContext from '../../context/Item/itemContext';

const Item = ({ item }) => {
  const itemContext = useContext(ItemContext);
  const { deleteItem } = itemContext;
  const { id, name, price, alcoholic, time } = item;

  const onDelete = () => {
    deleteItem(id);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (alcoholic === false ? 'badge-success' : 'badge-primary')
          }
        >
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
      <p className='btn btn-dark btn-sm'>Add</p>
      <p className='btn btn-dark btn-sm'>Edit</p>
      <p className='btn btn-danger btn-sm' onClick={onDelete}>
        Delete
      </p>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    alcoholic: PropTypes.bool,
    time: PropTypes.string,
  }).isRequired,
};

export default Item;
