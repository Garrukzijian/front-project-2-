import React,{} from 'react';
import './App.css';
import {Routes,Route, BrowserRouter}from "react-router-dom"

//import page
import Login from './pages/login/login';
import Admin from './pages/admin/admin';


function App(){  
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/admin/*' element={<Admin/>}/>
        </Routes> 
      </BrowserRouter>
    )
  }
export default App;