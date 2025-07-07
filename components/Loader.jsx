// components/Loader.js
"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="text-6xl font-fancy font-bold text-red-800 animate-pulse">
            BB
          </div>
          <div className="text-2xl font-fancy font-bold text-white mt-2">
            BingeBuddy
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-800 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-red-700 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-white text-lg font-medium">
          Loading your movies{dots}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 w-64 bg-gray-800 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-red-800 to-red-600 h-full rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}