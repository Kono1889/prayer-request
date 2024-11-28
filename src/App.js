import React from 'react';
import './App.css'; 
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import User from './components/User';
import Admin from './components/Admin';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route  path = '/' element={<User/>}/>
          <Route  path = '/Admin' element={<Admin/>}/>
        </Routes>

      </Router>
    </div>
  )
}

export default App
