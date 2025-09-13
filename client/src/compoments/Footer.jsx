import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-between px-6 py-4 mt-20 w-full max-w-7xl mx-auto'>

      {/* Logo */}
      <img src={assets.logo} alt="Logo" className='w-36 sm:w-40' />

      {/* Copyright */}
      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 text-center sm:text-left mt-4 sm:mt-0 hidden sm:block'>
        © 2025 GreatStack.dev | All rights reserved.
      </p>

      {/* Social Icons */}
      <div className='flex gap-4 mt-4 sm:mt-0'>
        <img src={assets.facebook_icon} alt="Facebook" className='w-8 h-8' />
        <img src={assets.twitter_icon} alt="Twitter" className='w-8 h-8' />
        <img src={assets.instagram_icon} alt="Instagram" className='w-8 h-8' />
      </div>

      {/* Mobile-only copyright */}
      <p className='text-sm text-gray-500 text-center mt-4 sm:hidden'>
        © 2025 GreatStack.dev | All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
