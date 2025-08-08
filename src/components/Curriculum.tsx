import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const curriculumData = [
  {
    day: 1,
    title: 'Linux Fundamentals',
    topics: [
      'Linux installation and basic commands',
      'File system navigation and permissions',
      'User and group management',
      'Package management with yum/apt',
      'Basic system administration tasks'
    ]
  },
  {
    day: 2,
    title: 'Shell Scripting Mastery',
    topics: [
      'Bash scripting fundamentals',
      'Variables, loops, and conditions',
      'Functions and error handling',
      'Automated system monitoring scripts',
      'Real-world automation examples'
    ]
  },
  {
    day: 3,
    title: 'Git Version Control',
    topics: [
      'Git basics and repository management',
      'Branching and merging strategies',
      'Collaborative development workflow',
      'GitHub/GitLab integration',
      'CI/CD pipeline basics'
    ]
  },
  {
    day: 4,
    title: 'Docker Containerization',
    topics: [
      'Container concepts and Docker installation',
      'Creating and managing Docker images',
      'Dockerfile best practices',
      'Docker Compose for multi-container apps',
      'Container orchestration basics'
    ]
  },
  {
    day: 5,
    title: 'DNS & Network Configuration',
    topics: [
      'DNS server setup and configuration',
      'Network troubleshooting techniques',
      'Load balancing concepts',
      'Firewall and security configurations',
      'Network monitoring tools'
    ]
  },
  {
    day: 6,
    title: 'LVM & Storage Management',
    topics: [
      'Logical Volume Manager (LVM) concepts',
      'Creating and managing logical volumes',
      'Storage optimization techniques',
      'Backup and recovery strategies',
      'RAID configuration and management'
    ]
  },
  {
    day: 7,
    title: 'Monitoring & DevOps Best Practices',
    topics: [
      'System monitoring with various tools',
      'Log management and analysis',
      'Performance optimization techniques',
      'DevOps culture and best practices',
      'Career guidance and next steps'
    ]
  }
];

export const Curriculum: React.FC = () => {
  const [openDay, setOpenDay] = useState<number | null>(1);

  const toggleDay = (day: number) => {
    setOpenDay(openDay === day ? null : day);
  };

  return (
    <section id="curriculum" className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            7-Day
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Curriculum</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Structured learning path designed for maximum practical experience
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {curriculumData.map((module) => (
              <div
                key={module.day}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <button
                  onClick={() => toggleDay(module.day)}
                  className="w-full px-6 py-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  aria-expanded={openDay === module.day}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {module.day}
                        </span>
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Day {module.day}: {module.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {openDay === module.day ? (
                      <ChevronDown className="w-6 h-6 text-gray-400 transform transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-gray-400 transform transition-transform duration-200" />
                    )}
                  </div>
                </button>

                {openDay === module.day && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        What you'll learn:
                      </h4>
                      <ul className="space-y-2">
                        {module.topics.map((topic, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3 text-gray-600 dark:text-gray-300"
                          >
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            </div>
                            <span className="leading-relaxed">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};