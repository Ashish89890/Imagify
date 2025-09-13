import React, { useState,useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";
import { motion } from "motion/react"
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
   
  
 const OnSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    if (state === 'Login') {
      const { data } = await axios.post(backendUrl + '/api/user/login', {
        email,
        password,
      });
      
      if (data.success) {
        toast.success(data.message);
        setToken(data.token);
        setUser(data.user.username)
        
        localStorage.setItem('token', data.token);
        setLoginShow(false);
      }
      else {
        toast.error(data.message);
      }
    }
    else if (state == 'Signup') { 
   
      const { data } = await axios.post(backendUrl + '/api/user/register', {
        username: name,
        email,
        password
      });
       if (data.success) {
        toast.success(data.message);
        setToken(data.token);
         setUser(data.user.username)
        
         
        
        localStorage.setItem('token', data.token);
        setLoginShow(false);
      }
      else {
        toast.error(data.message);
      }
      
      
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Login failed. Please check your credentials.");
  }
};

    useEffect (() =>{
document.body.style.overflow = 'hidden';
return ()=>{
document.body.style.overflow = 'unset';
}
}, [])
    const [state, setState] = React.useState('Login');
  const { Loginshow, setLoginShow ,backendUrl,setToken,setUser} = React.useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={OnSubmitHandler}
                initial={{ opacity: 0.2, y: 50 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 relative">
        {/* Close icon */}
              <img
                  onClick={()=>{setLoginShow(false)}}
          src={assets.cross_icon}
          alt="close"
          className="absolute top-4 right-4 w-5 h-5 cursor-pointer"
        />

              <h1 className="text-2xl font-bold text-center">{ state=='Login'? 'Login' :'Sign Up'}</h1>
        <p className="text-gray-500 text-center text-sm">
          Welcome! Please { state=='Login'? 'Login' :'Sign Up'} to continue
              </p>
              


        { state !== 'Login' && <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
          <img src={assets.user_icon} alt="" className="w-5 h-5 mr-3" />
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Full Name"
            required
            className="outline-none flex-1 bg-transparent"
          />
        </div>}

        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
          <img src={assets.email_icon} alt="" className="w-5 h-5 mr-3" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email Id"
            required
            className="outline-none flex-1 bg-transparent"
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
          <img src={assets.lock_icon} alt="" className="w-5 h-5 mr-3" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            className="outline-none flex-1 bg-transparent"
          />
        </div>

        <div className="text-right text-sm text-blue-600 hover:underline cursor-pointer">
          Forgot password?
        </div>

        <button
         
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-medium cursor-pointer"
        >
         { state=='Login'? 'Login' :'Create Account'}
        </button>

       { state !== 'Signup' && <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer" onClick={()=>{setState('Signup')}}>Sign Up</span>
        </p>}
        {  state !== 'Login' && <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer" onClick={()=>{setState('Login')}}>Log In</span>
        </p>}
      </motion.form>
    </div>
  );
};

export default Login;
