import React from 'react';
import { assets, testimonialsData } from '../assets/assets';
import { motion } from "motion/react"
const Reviews = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-20 py-12 px-4'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-center'>
        Customer Reviews
      </h1>
      <p className='text-gray-500 mb-12 text-center'>
        What Our Users Are Saying
      </p>

      <div className='flex flex-wrap gap-8 justify-center'>
        {testimonialsData.map((review, index) => (
          <div
            key={index}
            className='bg-white shadow-lg p-6 rounded-2xl w-full max-w-xs text-center transition hover:scale-105 duration-300'
          >
            <img
              src={review.image}
              alt={review.name}
              className='rounded-full w-16 h-16 mx-auto mb-4'
            />
            <h2 className='text-lg font-semibold'>{review.name}</h2>
            <p className='text-sm text-gray-500 mb-2'>{review.role}</p>

            <div className='flex justify-center mb-4'>
              {Array(review.stars).fill().map((_, i) => (
                <img
                  key={i}
                  src={assets.star_icon}
                  alt='star'
                  className='w-4 h-4 mx-0.5'
                />
              ))}
            </div>

            <p className='text-gray-600 text-sm leading-relaxed'>
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Reviews;
