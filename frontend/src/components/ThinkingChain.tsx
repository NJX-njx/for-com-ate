import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BrainCircuit, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  title: string;
  status: 'pending' | 'running' | 'completed';
  duration?: string;
  details?: string;
}

interface ThinkingChainProps {
  steps: Step[];
  totalDuration?: string;
}

const ThinkingChain: React.FC<ThinkingChainProps> = ({ steps, totalDuration = "7s" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors bg-gray-50 px-3 py-2 rounded-lg border border-gray-100"
      >
        <BrainCircuit size={16} className="text-violet-500" />
        <span className="font-medium">已思考 {totalDuration}</span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 ml-2 pl-4 border-l-2 border-gray-100 space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${step.status === 'completed' ? 'text-green-500' : 'text-blue-500'}`}>
                      {step.status === 'completed' ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-gray-800">{step.title}</h4>
                        {step.duration && (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock size={10} /> {step.duration}
                          </span>
                        )}
                      </div>
                      {step.details && (
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          {step.details}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThinkingChain;