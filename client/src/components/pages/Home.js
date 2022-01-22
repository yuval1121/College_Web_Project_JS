import React, { useContext, useEffect } from 'react';
import Items from '../items/Items';
import PropTypes from 'prop-types';
import ItemForm from '../items/ItemForm';
import ItemFilter from '../items/ItemFilter';
import AuthContext from '../../context/auth/AuthContext';

const Home = props => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  });

  return (
    <div className='grid-2'>
      <div>
        <ItemForm />
      </div>
      <div>
        <ItemFilter />
        <Items />
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
