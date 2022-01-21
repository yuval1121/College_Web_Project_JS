import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import ItemContex from '../../context/Item/itemContext';

const Items = props => {
  const itemContext = useContext(ItemContex);
  const { items } = itemContext;
  return (
    <>
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </>
  );
};

Items.propTypes = {
  Item: PropTypes.object,
};

export default Items;
