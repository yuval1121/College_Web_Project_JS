import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import ItemContex from '../../context/Item/itemContext';

const Items = props => {
  const itemContext = useContext(ItemContex);
  const { items, filtered, getItems, loading } = itemContext;

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (items === null || items.length === 0) {
    return <h4>No items</h4>;
  }

  return (
    <>
      {filtered !== null
        ? filtered.map(item => <Item key={item._id} item={item} />)
        : items.map(item => <Item key={item._id} item={item} />)}
    </>
  );
};

Items.propTypes = {};

export default Items;
