import React from 'react';
import { motion } from 'framer-motion';

interface FeatureItemProps {
  title: string;
  description: string;
  imageContent: React.ReactNode;
  isReversed?: boolean;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description, imageContent, isReversed = false }) => {
  return (
    <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 py-20 ${isReversed ? 'md:flex-row-reverse' : ''}`}>
      {/* 文字部分 */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex-1 space-y-6"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h3>
        <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
        <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 group">
          Learn more 
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </motion.div>

      {/* 图片/视觉部分 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 w-full"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200"
        >
          {imageContent}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Features</h2>
          <p className="text-3xl md:text-4xl font-bold text-gray-900">Everything you need to excel</p>
        </div>

        {/* Feature 1: Smart Error Analysis */}
        <FeatureItem 
          title="Smart Error Analysis"
          description="Upload your exams or homework, and our AI will instantly analyze your mistakes. Get detailed corrections, understand the 'why' behind the error, and receive similar practice problems to reinforce learning."
          imageContent={
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
              <div className="w-3/4 h-3/4 bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-red-500 font-medium">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  Incorrect Answer Detected
                </div>
                <div className="h-2 w-full bg-gray-100 rounded" />
                <div className="h-2 w-2/3 bg-gray-100 rounded" />
                <div className="mt-auto p-3 bg-green-50 text-green-700 text-sm rounded-lg">
                  AI Suggestion: Try applying the chain rule here...
                </div>
              </div>
            </div>
          }
        />

        {/* Feature 2: Interactive Notes */}
        <FeatureItem 
          title="Interactive Notes"
          description="Stop passively reading. Convert your PDFs and lecture slides into chat-able notes. Ask questions, summarize key points, and generate flashcards directly from your course material."
          isReversed
          imageContent={
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-bl from-blue-50 to-indigo-50">
              <div className="w-3/4 h-3/4 bg-white rounded-xl shadow-sm p-6 relative">
                <div className="absolute right-4 top-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  AI
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none text-sm text-gray-600 w-2/3">
                    Can you summarize the key themes in Chapter 3?
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg rounded-tr-none text-sm text-gray-800 ml-auto w-3/4">
                    Certainly! Chapter 3 focuses on the principles of thermodynamics...
                  </div>
                </div>
              </div>
            </div>
          }
        />

        {/* Feature 3: Knowledge Graph */}
        <FeatureItem 
          title="Knowledge Graph"
          description="Visualize the connections between concepts with dynamic Mind Maps. See how different topics relate to each other and build a structured mental model of your subject."
          imageContent={
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-50 to-purple-50">
              <div className="relative w-full h-full">
                {/* Simple CSS Node Graph Representation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                  Core
                </div>
                <div className="absolute top-1/3 left-1/3 w-12 h-12 bg-white border-2 border-violet-200 rounded-full flex items-center justify-center text-xs text-gray-600 shadow-sm">
                  A
                </div>
                <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-white border-2 border-violet-200 rounded-full flex items-center justify-center text-xs text-gray-600 shadow-sm">
                  B
                </div>
                <div className="absolute top-1/3 right-1/4 w-10 h-10 bg-white border-2 border-violet-200 rounded-full flex items-center justify-center text-xs text-gray-600 shadow-sm">
                  C
                </div>
                {/* Connecting lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="50%" y1="50%" x2="33%" y2="33%" stroke="#ddd" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="66%" y2="66%" stroke="#ddd" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="75%" y2="33%" stroke="#ddd" strokeWidth="2" />
                </svg>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default Features;