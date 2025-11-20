import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
          SmartLearn
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          Log in
        </button>
        <Link to="/chat" className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors">
          Get Started
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;