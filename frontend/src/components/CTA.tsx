import React from 'react';
import { motion } from 'framer-motion';

const CTA: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-gray-50 rounded-[2.5rem] p-12 md:p-24 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Learn smarter, faster, easier.
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Upload your content, and start your learning journey.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 text-lg font-semibold text-white bg-black rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          Get Started
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CTA;