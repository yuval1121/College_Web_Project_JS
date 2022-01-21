import React from 'react';
import Items from '../items/Items';
import PropTypes from 'prop-types';
import ItemForm from '../items/ItemForm';

const Home = props => {
  return (
    <div className='grid-2'>
      <div>
        <ItemForm />
      </div>
      <div>
        <Items />
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
