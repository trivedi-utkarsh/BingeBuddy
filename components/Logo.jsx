import React from 'react';
import { useRouter } from 'next/navigation';

const EnhancedLogo = () => {
  const router = useRouter();
  
  return (
    <div className="fixed top-6 left-6 z-50">
      <button
        onClick={() => router.push("/")}
        className="group relative overflow-hidden"
      >

        
        {/* Animated background particles */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-1 left-1 w-1 h-1 bg-red-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-1 right-2 w-0.5 h-0.5 bg-red-300 rounded-full animate-pulse"></div>
          <div className="absolute top-2 right-1 w-0.5 h-0.5 bg-red-500 rounded-full animate-bounce"></div>
        </div>
        
        {/* Main logo content */}
        <div className="relative px-4 py-3 flex items-center justify-center">
          <span className="text-red-800 font-bold text-3xl font-fancy tracking-wider transition-all duration-500 group-hover:text-red-600 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
            BB
          </span>
          
          {/* Decorative elements */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 border-red-500/50 transition-all duration-500 group-hover:border-red-400/80"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2 border-red-500/50 transition-all duration-500 group-hover:border-red-400/80"></div>
          
          {/* Animated underline */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 transition-all duration-500 group-hover:w-8"></div>
        </div>
        
        {/* Hover ripple effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500/10 to-red-400/5 animate-pulse"></div>
        </div>
      </button>
    </div>
  );
};

export default EnhancedLogo;