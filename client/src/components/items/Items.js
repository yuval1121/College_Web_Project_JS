import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import ItemContex from '../../context/Item/itemContext';

const Items = props => {
  const itemContext = useContext(ItemContex);
  const { items, filtered } = itemContext;

  if (items.length === 0) {
    return <h4>No items</h4>;
  }

  return (
    <>
      {filtered !== null
        ? filtered.map(item => <Item key={item.id} item={item} />)
        : items.map(item => <Item key={item.id} item={item} />)}
    </>
  );
};

Items.propTypes = {};

export default Items;
