import React, { useContext } from 'react';
import OrderItem from './OrderItem';
import ItemContex from '../../context/Item/itemContext';

const Order = () => {
  const itemContext = useContext(ItemContex);
  const { order, makeOrder } = itemContext;

  const onClick = () => {
    makeOrder(order);
  };

  if (order.length === 0) {
    return <h4>No items</h4>;
  }

  const calc_price = order => {
    let price = 0;
    for (const item of order) {
      price += item.price;
    }
    return price;
  };

  return (
    <>
      {order.map(item => (
        <OrderItem key={item._id} item={item} />
      ))}

      <p>Total price is {calc_price(order)}</p>

      <button onClick={onClick}>Finish Order</button>
    </>
  );
};

export default Order;
