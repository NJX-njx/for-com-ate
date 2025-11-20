import React from 'react';
import { X, CheckCircle2, Clock, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  title: string;
  status: 'pending' | 'running' | 'completed';
  duration?: string;
  details?: string;
}

interface ThinkingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  steps: Step[];
}

const ThinkingSidebar: React.FC<ThinkingSidebarProps> = ({ isOpen, onClose, steps }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40 md:hidden"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[400px] bg-white shadow-2xl z-50 border-l border-gray-200 flex flex-col"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2 text-violet-600">
                <BrainCircuit size={20} />
                <h3 className="font-semibold">思考过程</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-gray-100 last:border-0">
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white ${
                    step.status === 'completed' ? 'border-green-500 text-green-500' : 
                    step.status === 'running' ? 'border-blue-500 text-blue-500' : 'border-gray-300'
                  }`}>
                    {step.status === 'completed' && <div className="w-2 h-2 bg-green-500 rounded-full m-0.5" />}
                    {step.status === 'running' && <div className="w-2 h-2 bg-blue-500 rounded-full m-0.5 animate-pulse" />}
                  </div>

                  <div className="mb-1 flex items-center justify-between">
                    <h4 className={`font-medium ${
                      step.status === 'running' ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {step.title}
                    </h4>
                    {step.duration && (
                      <span className="text-xs text-gray-400 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                        <Clock size={10} /> {step.duration}
                      </span>
                    )}
                  </div>
                  
                  {step.details && (
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mt-2 leading-relaxed border border-gray-100">
                      {step.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThinkingSidebar;
