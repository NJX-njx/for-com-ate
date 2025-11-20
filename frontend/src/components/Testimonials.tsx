import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Nasim Uddin",
    role: "Indiehacker, Independent",
    content: "I wish I had this when I was in school",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nasim"
  },
  {
    name: "Rohan Robinson",
    role: "Software Engineer, Independent",
    content: "Youlearn.ai is awesome , just used it to learn from a biotech roundtable discussion!",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan"
  },
  {
    name: "Jason Patel",
    role: "Writer",
    content: "This site has become an integral part of our daily lives, streamlining our process of understanding PDFs.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jason"
  },
   {
    name: "Sarah Chen",
    role: "Medical Student",
    content: "The error analysis feature saved me hours of studying for my anatomy finals.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="mb-16 text-center px-6">
         <h2 className="text-3xl font-bold text-gray-900">Loved by learners everywhere</h2>
      </div>
      
      <div className="relative w-full flex overflow-hidden">
        {/* Gradient Masks for smooth fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex gap-6 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 40 
          }}
          style={{ width: "max-content" }}
        >
          {/* Duplicate list to create seamless loop */}
          {[...testimonials, ...testimonials, ...testimonials].map((item, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[350px] p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-lg text-gray-800 font-medium mb-6 leading-relaxed">"{item.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;