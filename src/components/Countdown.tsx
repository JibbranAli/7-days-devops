import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Gift, Play } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';

export const Countdown: React.FC = () => {
  const { openRegistrationModal } = useModal();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isOngoing, setIsOngoing] = useState(false);

  // Set target date to August 20, 2025 at 11:00 PM IST (5:30 PM UTC)
  const targetDate = new Date('2025-08-20T17:30:00Z').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
        setIsOngoing(false);
      } else {
        setIsOngoing(true);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const handleRegisterClick = () => {
    openRegistrationModal();
  };

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: 'from-blue-600 to-blue-700' },
    { label: 'Hours', value: timeLeft.hours, color: 'from-green-600 to-green-700' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'from-orange-600 to-orange-700' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'from-red-600 to-red-700' }
  ];

  return (
    <section id="countdown" className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6">
            {isOngoing ? (
              <>
                <Play className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-green-300 font-medium">Training in Progress</span>
              </>
            ) : (
              <>
                <Gift className="w-5 h-5 text-orange-400 mr-2" />
                <span className="text-orange-300 font-medium">Limited Time Offer</span>
              </>
            )}
          </div>
          
          {/* FREE Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-2xl animate-pulse">
            <span className="text-white font-bold text-xl mr-2">🎁</span>
            <span className="text-white font-bold text-lg">100% FREE TRAINING</span>
            <span className="text-white font-bold text-xl ml-2">🎁</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {isOngoing ? 'Training is Ongoing!' : 'Training Starts In'}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            {isOngoing 
              ? <>The DevOps training program has started! Join thousands of successful DevOps professionals - <span className="text-green-400 font-bold">COMPLETELY FREE!</span></>
              : <>Don't miss your chance to join thousands of successful DevOps professionals - <span className="text-green-400 font-bold">COMPLETELY FREE!</span></>
            }
          </p>
        </div>

        {/* Video and Countdown Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Video Section - Left Side */}
            <div className="order-2 lg:order-1">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
                <div className="aspect-[9/14.44] rounded-2xl overflow-hidden bg-gray-800 relative max-w-sm mx-auto">
                  <video 
                    className="w-full h-full rounded-2xl"
                    controls
                    preload="metadata"
                  >
                    <source src="/videos/IMG_3456.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-300 text-sm">
                    Learn about the comprehensive 7-day DevOps training program
                  </p>
                </div>
              </div>
            </div>

            {/* Countdown and Registration Section - Right Side */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Timer Section */}
              {isOngoing ? (
                <div className="text-center">
                  <div className="bg-gradient-to-b from-green-600 to-green-700 rounded-2xl p-8 shadow-2xl">
                    <div className="text-6xl md:text-7xl font-bold text-white mb-4">
                      🎉 LIVE
                    </div>
                    <div className="text-white/80 font-medium text-xl">
                      Started from 20th Aug 2025, 11 PM
                    </div>
                    <div className="text-white/60 text-lg mt-2">
                      Training is currently in progress
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {timeUnits.map((unit, index) => (
                    <div key={index} className="text-center">
                      <div className={`bg-gradient-to-b ${unit.color} rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300`}>
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                          {unit.value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-white/80 font-medium uppercase tracking-wider text-sm">
                          {unit.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Registration Call-to-Action - Below timer on the right side */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {isOngoing ? 'Join the Training Now!' : 'Secure Your Spot Now'}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {isOngoing 
                      ? <>The training is live and ongoing! You can still join and catch up with the recorded sessions. <span className="text-green-400 font-bold">Registration is completely FREE!</span></>
                      : <>Join over 10,000+ students who have transformed their careers with our comprehensive DevOps training. <span className="text-green-400 font-bold">Registration is completely FREE</span>, and spots are filling up fast!</>
                    }
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="flex items-center justify-center space-x-2 text-green-300">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm">
                        {isOngoing ? 'Started Aug 20, 2025' : 'Starts Aug 20, 2025'}
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-blue-300">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm">11 PM - 7 PM</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-orange-300">
                      <Users className="w-5 h-5" />
                      <span className="text-sm">100% Practical</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={handleRegisterClick}
                    className={`group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl ${
                      isOngoing 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                    }`}
                  >
                    <span className="flex items-center">
                      <span className="mr-2">🎁</span>
                      {isOngoing ? 'Join Training Now' : 'Register FREE Now'}
                      <span className="ml-2">🎁</span>
                    </span>
                    <div className="ml-2 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};