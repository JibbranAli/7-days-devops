import React from 'react';
import { Star, Award, Users, BookOpen, CheckCircle } from 'lucide-react';

export const MentorSection: React.FC = () => {
  const achievements = [
    { icon: Users, label: '10 Lakh+ Students Mentored', color: 'text-blue-500' },
    { icon: Award, label: '23+ Years Industry Experience', color: 'text-green-500' },
    { icon: BookOpen, label: '153+ Tools & Technology', color: 'text-purple-500' },
    { icon: CheckCircle, label: '4.9/5 Student Rating', color: 'text-orange-500' }
  ];

  return (
    <section id="mentor" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Meet Your
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"> Mentor</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn from India's most respected DevOps expert
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mentor Image and Basic Info */}
            <div className="text-center lg:text-left">
              <div className="relative mb-8">
                <div className="w-80 h-80 mx-auto lg:mx-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-full p-1">
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                    {/* Mentor image */}
                    <img 
                      src="/images/vimalsir-stage.jpg" 
                      alt="Mr. Vimal Daga - DevOps Guru of India"
                      className="w-full h-full object-cover object-top rounded-full"
                      style={{ objectPosition: 'center 20%' }}
                    />
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-orange-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                  <Award className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                  <Star className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Mr. Vimal Daga
              </h3>
              <p className="text-xl text-orange-600 dark:text-orange-400 mb-4 font-semibold">
                DevOps Guru of India
              </p>
              
              {/* Rating */}
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="flex space-x-1 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">4.9/5 (2,500+ reviews)</span>
              </div>
            </div>

            {/* Mentor Details */}
            <div className="space-y-8">
              {/* Bio */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  About Vimal Daga
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Vimal Daga is India's #1 DevOps mentor and technology evangelist with over 23 years of industry experience. 
                  He has personally trained more than 10 Lakh students and professionals, helping them transition into successful DevOps careers.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Known for his unique teaching methodology that combines real-world scenarios with practical hands-on learning, 
                  Vimal makes complex DevOps concepts accessible to everyone, regardless of their technical background.
                </p>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Key Achievements
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <Icon className={`w-6 h-6 ${achievement.color}`} />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">
                          {achievement.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quote */}
              <div className="bg-gradient-to-r from-orange-500/10 to-red-600/10 border-l-4 border-orange-500 p-6 rounded-r-2xl">
                <blockquote className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed">
                  "My mission is to demystify DevOps and make it accessible to every aspiring technologist in India. 
                  When you understand the 'why' behind the tools, the 'how' becomes simple."
                </blockquote>
                <cite className="text-orange-600 dark:text-orange-400 font-semibold mt-2 block">
                  - Vimal Daga
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};