import React, { useContext, useEffect } from 'react';
import Items from '../items/Items';
import ItemForm from '../items/ItemForm';
import ItemFilter from '../items/ItemFilter';
import AuthContext from '../../context/auth/AuthContext';
import OrderForm from '../orders/Order';

const Home = props => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useEffect(() => {
    const waitforLoad = async () => {
      await authContext.loadUser();
    };
    waitforLoad();
  }, []);

  return (
    <div className='grid-2'>
      {user?.role === 'admin' && (
        <div>
          <ItemForm />
        </div>
      )}
      {user?.role === 'client' && (
        <div>
          <OrderForm />
        </div>
      )}
      <div>
        <ItemFilter />
        <Items />
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
