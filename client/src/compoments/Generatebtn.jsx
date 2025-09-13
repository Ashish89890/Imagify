import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
const Generatebtn = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-20 px-4 text-center'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-6'>
        See Magic. Try Now
      </h1>

      <button onClick={()=>{navigate("/result")}} className=' cursor-pointer flex items-center gap-3 bg-black text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition duration-300'>
        
        <span>Generate Image</span>
        <img src={assets.star_group} alt='star decoration' className='w-6 h-6' />
      </button>
    </motion.div>
  );
};

export default Generatebtn;
