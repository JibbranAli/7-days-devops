import React, { useState } from 'react';
import { Calendar, Clock, Users, BookOpen, CheckCircle, Play } from 'lucide-react';

const timelineData = [
  {
    day: 1,
    title: 'Linux Fundamentals',
    time: '7:00 PM - 9:00 PM',
    duration: '2 hours',
    status: 'upcoming',
    topics: ['Linux installation', 'Basic commands', 'File system navigation', 'User management'],
    icon: '🐧',
    color: 'from-green-500 to-emerald-600'
  },
  {
    day: 2,
    title: 'Shell Scripting Mastery',
    time: '7:00 PM - 9:30 PM',
    duration: '2.5 hours',
    status: 'upcoming',
    topics: ['Bash scripting', 'Variables & loops', 'Functions', 'Automation'],
    icon: '💻',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    day: 3,
    title: 'Git Version Control',
    time: '7:00 PM - 9:00 PM',
    duration: '2 hours',
    status: 'upcoming',
    topics: ['Git basics', 'Branching strategies', 'Collaboration', 'CI/CD basics'],
    icon: '📚',
    color: 'from-purple-500 to-violet-600'
  },
  {
    day: 4,
    title: 'Docker Containerization',
    time: '7:00 PM - 10:00 PM',
    duration: '3 hours',
    status: 'upcoming',
    topics: ['Container concepts', 'Docker images', 'Dockerfile', 'Docker Compose'],
    icon: '🐳',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    day: 5,
    title: 'DNS & Network Configuration',
    time: '7:00 PM - 9:00 PM',
    duration: '2 hours',
    status: 'upcoming',
    topics: ['DNS setup', 'Network troubleshooting', 'Load balancing', 'Security'],
    icon: '🌐',
    color: 'from-teal-500 to-cyan-600'
  },
  {
    day: 6,
    title: 'LVM & Storage Management',
    time: '7:00 PM - 9:30 PM',
    duration: '2.5 hours',
    status: 'upcoming',
    topics: ['LVM concepts', 'Volume management', 'Storage optimization', 'RAID'],
    icon: '💾',
    color: 'from-orange-500 to-red-600'
  },
  {
    day: 7,
    title: 'Monitoring & DevOps Best Practices',
    time: '7:00 PM - 10:00 PM',
    duration: '3 hours',
    status: 'upcoming',
    topics: ['System monitoring', 'Log management', 'Performance optimization', 'Career guidance'],
    icon: '📊',
    color: 'from-yellow-500 to-orange-600'
  }
];

export const CourseTimeline: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'current':
        return <Play className="w-6 h-6 text-blue-500" />;
      default:
        return <Calendar className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Your 7-Day
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Journey</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Interactive timeline of your DevOps learning adventure
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500 transform -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <div
                  key={item.day}
                  className={`relative flex flex-col md:flex-row items-center md:items-start ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white dark:bg-gray-900 rounded-full border-4 border-blue-500 flex items-center justify-center z-10">
                    <span className="text-lg">{item.icon}</span>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                    } ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
                  >
                    <div
                      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                        selectedDay === item.day ? 'ring-2 ring-blue-500 scale-105' : ''
                      }`}
                      onClick={() => setSelectedDay(selectedDay === item.day ? null : item.day)}
                    >
                      {/* Day Badge */}
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${item.color} mb-4`}>
                        Day {item.day}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>

                      {/* Time and Duration */}
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.time}
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {item.duration}
                        </div>
                      </div>

                      {/* Topics Preview */}
                      <div className="space-y-1">
                        {item.topics.slice(0, 2).map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                            {topic}
                          </div>
                        ))}
                        {item.topics.length > 2 && (
                          <div className="text-sm text-gray-500 dark:text-gray-500">
                            +{item.topics.length - 2} more topics
                          </div>
                        )}
                      </div>

                      {/* Status */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          {getStatusIcon(item.status)}
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {item.status}
                          </span>
                        </div>
                        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                          {selectedDay === item.day ? 'Hide Details' : 'View Details'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed View */}
          {selectedDay && (
            <div className="mt-12">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl p-8 border border-blue-200 dark:border-blue-800">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Day {selectedDay} Details
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {timelineData.find(item => item.day === selectedDay)?.title}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What You'll Learn</h4>
                    <ul className="space-y-2">
                      {timelineData.find(item => item.day === selectedDay)?.topics.map((topic, index) => (
                        <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Session Info</h4>
                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Duration: {timelineData.find(item => item.day === selectedDay)?.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Format: Live Interactive Session</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        <span>Materials: Provided before session</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}; 