import React, { useContext, useEffect, useRef } from 'react';
import ItemContext from '../../context/Item/itemContext';

const ItemFilter = () => {
  const itemContext = useContext(ItemContext);
  const text = useRef('');

  const { filterItems, clearFilter, filtered } = itemContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  }, [filtered]);

  const onChange = e => {
    if (text.current.value !== '') {
      filterItems(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type={'text'}
        placeholder='Filter Items...'
        onChange={onChange}
      />
    </form>
  );
};

export default ItemFilter;
