import { BrowserRouter as Router } from 'react-router-dom';

import NavbarTop from '../src/Components/NavbarTop';
import Footer from '../src/Components/Footer';
import MainDefault from './pages/MainDefault';

function App() {
  return (
    <div className='App'>
      <Router>

        <NavbarTop/>
        <MainDefault />
        <Footer/>

      </Router>
    </div>
  );
}

export default App;
