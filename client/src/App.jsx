import React from 'react'
import Home from './pages/Home/Home'
import Result from './pages/Result/Result'
import Buy_plan from './pages/Buy_plan/Buy_plan'


import {Routes, Route} from 'react-router-dom'
import Navbar from './compoments/NavBar/Navbar'
import Footer from './compoments/Footer'
import Login from './compoments/Login'

import { useContext } from "react";
import { AppContext } from './contexts/AppContext'
import { ToastContainer } from 'react-toastify'
const App = () => {
  const { LoginShow }=  useContext(AppContext);
  
  return (
    
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen
    bg-gradient-to-b from-teal-50 to-orange-50 '
    >
       <ToastContainer />
      <Navbar />
      {LoginShow && <Login/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<Buy_plan />} />
        
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App
