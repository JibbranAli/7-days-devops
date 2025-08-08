import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Calendar, BookOpen } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [moduleCount, setModuleCount] = useState(0);
  const [practicalCount, setPracticalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const animateCounter = (target: number, setter: (value: number) => void, duration: number = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    const timer = setTimeout(() => {
      animateCounter(10000, setStudentCount);
      animateCounter(7, setModuleCount);
      animateCounter(100, setPracticalCount);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Indian Flag Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-20 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-lg animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-24 h-16 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-lg animate-bounce" 
             style={{ animationDelay: '1s' }} />
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Master DevOps
            </span>
            <br />
            <span className="text-white">in Just</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent">
              7 Days
            </span>
            <br />
            <span className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-medium bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
              — Absolutely FREE
            </span>
          </h1>

          {/* FREE Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-8 shadow-2xl animate-bounce">
            <span className="text-white font-bold text-xl mr-2">🎁</span>
            <span className="text-white font-bold text-lg">100% FREE TRAINING</span>
            <span className="text-white font-bold text-xl ml-2">🎁</span>
          </div>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto px-4">
            Learn from{' '}
            <span className="font-bold text-orange-400">Mr. Vimal Daga</span>
            {' '}— India's DevOps Guru
          </p>

          {/* Animated Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10 max-w-3xl mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mr-2" />
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  {isLoading ? '...' : studentCount.toLocaleString()}+
                </span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">Students Trained</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400 mr-2" />
                <span className="text-2xl sm:text-3xl font-bold text-white">Aug 20</span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">2025 Start Date</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 sm:col-span-2 md:col-span-1">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mr-2" />
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  {isLoading ? '...' : moduleCount} Modules
                </span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">{isLoading ? '...' : practicalCount}% Practical</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};