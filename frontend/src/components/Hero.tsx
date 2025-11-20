import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 获取滚动进度
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 根据滚动进度转换属性，制造 3D 倾斜/视差效果
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section 
      ref={containerRef} 
      className="relative flex flex-col items-center justify-start min-h-[120vh] pt-32 pb-20 overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* 文本内容 */}
      <div className="z-10 flex flex-col items-center text-center max-w-4xl px-4 mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6"
        >
          Your AI Tutor, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
            Tailored for You
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-xl text-gray-600 mb-8 max-w-2xl"
        >
          Turn your learning materials into interactive notes, quizzes, and mind maps. 
          Master any subject faster with personalized AI guidance.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="px-8 py-4 text-lg font-semibold text-white bg-black rounded-full shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all"
        >
          Start Learning
        </motion.button>
      </div>

      {/* 3D 视差容器 */}
      <div className="perspective-1000 w-full max-w-6xl px-4">
        <motion.div
          style={{ 
            rotateX, 
            scale,
            y,
            opacity,
            transformStyle: "preserve-3d"
          }}
          className="relative w-full aspect-[16/9] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* 模拟应用界面 */}
          <div className="absolute inset-0 bg-gray-50 flex">
            {/* 侧边栏 */}
            <div className="w-64 border-r border-gray-200 bg-white p-4 hidden md:block">
              <div className="h-8 w-32 bg-gray-200 rounded mb-6 animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-4 w-3/4 bg-gray-100 rounded" />
                <div className="h-4 w-5/6 bg-gray-100 rounded" />
              </div>
            </div>
            {/* 主内容区 */}
            <div className="flex-1 p-8">
              <div className="h-12 w-1/2 bg-gray-200 rounded mb-8" />
              <div className="grid grid-cols-2 gap-6">
                <div className="h-40 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <div className="h-full w-full bg-blue-50/50 rounded flex items-center justify-center text-blue-200">
                    Interactive Notes
                  </div>
                </div>
                <div className="h-40 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <div className="h-full w-full bg-violet-50/50 rounded flex items-center justify-center text-violet-200">
                    Mind Map
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 装饰性光晕 */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;