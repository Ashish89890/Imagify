import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
function Description() {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-8 text-center">
        Turn your imagination into visuals
      </p>

      {/* Flex container for image + text */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
        {/* Image on the left */}
        <img
          src={assets.sample_img_1}
          alt="Sample"
          className="w-80 xl:w-96 rounded-lg"
        />

        {/* Text on the right */}
        <div className="max-w-xl text-left">
          <h2 className="text-2xl font-semibold mb-2">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Easily bring your ideas to life with our free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into beautiful images with just a few clicks.
            Imagine it, describe it, and watch it come to life instantly.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Description;
