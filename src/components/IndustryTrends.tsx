import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, Users, DollarSign, Clock, Zap, Shield, BarChart3 } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';

const trendsData = [
  {
    title: 'Market Growth',
    value: '24.7%',
    description: 'Annual growth rate in DevOps market',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600',
    trend: 'up'
  },
  {
    title: 'Average Salary',
    value: '₹12.5 LPA',
    description: 'Average DevOps engineer salary in India',
    icon: DollarSign,
    color: 'from-blue-500 to-cyan-600',
    trend: 'up'
  },
  {
    title: 'Job Demand',
    value: '85%',
    description: 'Increase in DevOps job postings',
    icon: Users,
    color: 'from-purple-500 to-violet-600',
    trend: 'up'
  },
  {
    title: 'Global Adoption',
    value: '92%',
    description: 'Companies using DevOps practices',
    icon: BarChart3,
    color: 'from-orange-500 to-red-600',
    trend: 'up'
  }
];

const opportunitiesData = [
  {
    title: 'Cloud Migration',
    description: 'Companies are rapidly migrating to cloud infrastructure, creating massive demand for DevOps professionals.',
    impact: 'High',
    timeframe: '2024-2026',
    icon: Zap
  },
  {
    title: 'AI/ML Integration',
    description: 'DevOps teams are increasingly integrating AI/ML pipelines, requiring specialized skills.',
    impact: 'Medium',
    timeframe: '2024-2027',
    icon: Clock
  },
  {
    title: 'Security Focus',
    description: 'DevSecOps is becoming the standard, with security integrated into every stage of development.',
    impact: 'High',
    timeframe: '2024-2025',
    icon: Shield
  },
  {
    title: 'Remote Work',
    description: 'Remote DevOps roles are increasing, offering global opportunities and flexible work arrangements.',
    impact: 'Medium',
    timeframe: '2024-2026',
    icon: BarChart3
  }
];

const salaryData = [
  { role: 'Junior DevOps Engineer', salary: '₹6-10 LPA', experience: '0-2 years' },
  { role: 'DevOps Engineer', salary: '₹10-18 LPA', experience: '2-5 years' },
  { role: 'Senior DevOps Engineer', salary: '₹18-30 LPA', experience: '5-8 years' },
  { role: 'DevOps Lead', salary: '₹30-50 LPA', experience: '8+ years' },
  { role: 'DevOps Architect', salary: '₹50-80 LPA', experience: '10+ years' }
];

export const IndustryTrends: React.FC = () => {
  const { openRegistrationModal } = useModal();
  const [activeTab, setActiveTab] = useState<'trends' | 'opportunities' | 'salaries'>('trends');

  return (
    <section className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Industry
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Insights</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Current DevOps market analysis and career opportunities
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'trends', label: 'Market Trends' },
            { id: 'opportunities', label: 'Opportunities' },
            { id: 'salaries', label: 'Salary Guide' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'trends' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendsData.map((trend, index) => {
                const Icon = trend.icon;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${trend.color} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {trend.value}
                    </h3>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {trend.title}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {trend.description}
                    </p>
                    <div className="flex items-center mt-4">
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-sm font-medium">Growing</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'opportunities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {opportunitiesData.map((opportunity, index) => {
                const Icon = opportunity.icon;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          opportunity.impact === 'High' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}>
                          {opportunity.impact} Impact
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {opportunity.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {opportunity.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Timeframe: {opportunity.timeframe}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'salaries' && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  DevOps Salary Guide - India
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Average salaries based on experience and role
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Salary Range
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Experience
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {salaryData.map((role, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {role.role}
                        </td>
                        <td className="px-6 py-4 text-sm text-green-600 dark:text-green-400 font-semibold">
                          {role.salary}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {role.experience}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your DevOps Career?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of professionals who have transformed their careers with our comprehensive training program.
            </p>
            <button 
              onClick={openRegistrationModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              <span>Start Learning Now</span>
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}; 