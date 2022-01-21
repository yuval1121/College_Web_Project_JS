import React, { useContext, useState } from 'react';
import itemContext from '../../context/Item/itemContext';
import PropTypes from 'prop-types';

const ItemForm = props => {
  const itemContext = useContext(itemContext);

  const [item, setItem] = useState({
    name: '',
    price: 0,
    alcoholic: false,
    time: '',
  });
  const { name, price, alcoholic, time } = item;

  const onChange = e => {
    setItem(prevItem => {
      return { ...prevItem, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    itemContext.addItem(item);
    setItem({
      name: '',
      price: 0,
      alcoholic: false,
      time: '',
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Add Item</h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='number'
        placeholder='Price'
        name='price'
        value={price}
        onChange={onChange}
      />
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
      />{' '}
      Non-Alcoholic
      <br />
      <input type='radio' name='alcoholic' value='yes' checked={alcoholic} />
      Alcoholic
      <div>
        <input
          type='submit'
          value='Add Contact'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};

ItemForm.propTypes = {};

export default ItemForm;
