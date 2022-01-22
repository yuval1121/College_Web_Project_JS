import React, { useContext, useEffect, useState } from 'react';
import ItemContext from '../../context/Item/itemContext';
import PropTypes from 'prop-types';

const ItemForm = props => {
  const itemContext = useContext(ItemContext);

  const { addItem, clearCurrent, current, updateItem } = itemContext;

  useEffect(() => {
    if (current !== null) {
      setItem(current);
    } else {
      setItem({
        name: '',
        price: 0,
        alcoholic: false,
        time: '',
      });
    }
  }, [itemContext, current]);

  const [item, setItem] = useState({
    name: '',
    price: 0,
    alcoholic: false,
    time: '',
  });
  const { name, price, alcoholic, time } = item;

  const onChange = e => {
    setItem(prevItem => {
      if (e.target.value === 'no') {
        return { ...prevItem, [e.target.name]: false };
      }
      if (e.target.value === 'yes') {
        return { ...prevItem, [e.target.name]: false };
      }
      return { ...prevItem, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addItem(item);
    } else {
      updateItem(item);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Update Item' : 'Add Item'}</h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input type='number' name='price' value={price} onChange={onChange} />
      <input
        type='text'
        placeholder='Time'
        name='time'
        value={time}
        onChange={onChange}
      />
      <h5>Item Type</h5>
      <input
        type='radio'
        name='alcoholic'
        value='no'
        checked={!alcoholic}
        onChange={onChange}
      />{' '}
      Non-Alcoholic
      <br />
      <input
        type='radio'
        name='alcoholic'
        value={false}
        checked={alcoholic}
        onChange={onChange}
      />
      Alcoholic
      <div>
        <input
          type='submit'
          value={current ? 'Update Item' : 'Add Item'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

ItemForm.propTypes = {};

export default ItemForm;
