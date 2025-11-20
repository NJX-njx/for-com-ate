import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-gray-500 text-sm">© 2025 SmartLearn Inc. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Privacy</a>
          <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;