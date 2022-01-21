import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ItemState from './context/Item/ItemState';

const App = () => {
  return (
    <ItemState>
      <Router>
        <>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </div>
        </>
      </Router>
    </ItemState>
  );
};

export default App;
