import React, { useState } from 'react';
import { 
  Terminal, 
  Container, 
  FileCode, 
  GitBranch, 
  Globe, 
  HardDrive, 
  BarChart3, 
  Shield,
  ChevronRight
} from 'lucide-react';

const tools = [
  {
    icon: Terminal,
    title: 'Linux Administration',
    description: 'Master command-line operations, file systems, and server management',
    color: 'from-green-500 to-emerald-600',
    topics: ['Command Line Mastery', 'System Administration', 'Process Management', 'User & Group Management']
  },
  {
    icon: Container,
    title: 'Docker Containerization',
    description: 'Learn containerization, Docker compose, and orchestration',
    color: 'from-blue-500 to-cyan-600',
    topics: ['Container Basics', 'Dockerfile Creation', 'Docker Compose', 'Image Optimization']
  },
  {
    icon: FileCode,
    title: 'Shell Scripting',
    description: 'Automate tasks with powerful bash and shell scripting',
    color: 'from-purple-500 to-violet-600',
    topics: ['Bash Scripting', 'Automation Scripts', 'Error Handling', 'Advanced Scripting']
  },
  {
    icon: GitBranch,
    title: 'Git Version Control',
    description: 'Version control, branching strategies, and collaboration',
    color: 'from-orange-500 to-red-600',
    topics: ['Git Fundamentals', 'Branching Models', 'Merge Strategies', 'CI/CD Integration']
  },
  {
    icon: Globe,
    title: 'DNS & Networking',
    description: 'Understand networking concepts and DNS management',
    color: 'from-teal-500 to-cyan-600',
    topics: ['DNS Configuration', 'Network Troubleshooting', 'Load Balancing', 'Security']
  },
  {
    icon: HardDrive,
    title: 'LVM & Storage',
    description: 'Logical Volume Management and storage solutions',
    color: 'from-indigo-500 to-blue-600',
    topics: ['Volume Management', 'Storage Optimization', 'Backup Strategies', 'RAID Configuration']
  },
  {
    icon: BarChart3,
    title: 'Monitoring & Logging',
    description: 'System monitoring, logging, and performance optimization',
    color: 'from-yellow-500 to-orange-600',
    topics: ['System Monitoring', 'Log Analysis', 'Performance Tuning', 'Alerting Systems']
  },
  {
    icon: Shield,
    title: 'DevOps Security',
    description: 'Security best practices and compliance in DevOps',
    color: 'from-red-500 to-pink-600',
    topics: ['Security Scanning', 'Compliance', 'Access Control', 'Vulnerability Management']
  }
];

export const WhatYouWillLearn: React.FC = () => {
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  return (
    <section id="what-you-learn" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What You'll
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Master</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive hands-on training covering all essential DevOps tools and practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer"
                onMouseEnter={() => setHoveredTool(index)}
                onMouseLeave={() => setHoveredTool(null)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${tool.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all duration-300">
                  {tool.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  {tool.description}
                </p>

                {/* Topics List - Visible on Hover */}
                <div className={`transform transition-all duration-300 ${
                  hoveredTool === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <div className="space-y-2">
                    {tool.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <ChevronRight className="w-3 h-3 mr-2 text-blue-500" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover indicator */}
                <div className={`absolute bottom-4 right-4 transform transition-all duration-300 ${
                  hoveredTool === index ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                }`}>
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tool.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-200 dark:border-blue-800 rounded-full">
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              💡 All tools covered with real-world projects and hands-on labs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};