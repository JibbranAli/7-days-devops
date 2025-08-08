import React, { useState } from 'react';
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: 'Is this training really free?',
    answer: 'Yes, absolutely! This 7-day DevOps training program is completely free. We believe in making quality education accessible to everyone. No hidden costs, no credit card required, and no strings attached.',
    category: 'general'
  },
  {
    question: 'What if I miss a session?',
    answer: 'Don\'t worry! All sessions are recorded and will be available for replay. You\'ll also get access to our community WhatsApp group where you can ask questions and get support from fellow students and mentors.',
    category: 'general'
  },
  {
    question: 'Do I need any prior experience?',
    answer: 'No prior experience is required! This program is designed for beginners. We start from the basics and gradually build up to advanced concepts. All you need is basic computer knowledge and a willingness to learn.',
    category: 'prerequisites'
  },
  {
    question: 'Will I get a certificate?',
    answer: 'Yes! Upon successful completion of the program, you\'ll receive a certificate of completion signed by Mr. Vimal Daga. This certificate is recognized by many companies in the industry.',
    category: 'certification'
  },
  {
    question: 'What tools and software do I need?',
    answer: 'You\'ll need a computer with at least 4GB RAM and a stable internet connection. We\'ll guide you through installing all necessary tools like Linux, Docker, and Git during the course.',
    category: 'prerequisites'
  },
  {
    question: 'Can I get a job after this training?',
    answer: 'Absolutely! Our program has a 95% job placement rate. We provide career guidance, resume building tips, and connect you with our network of hiring partners. Many students land DevOps roles within 3-6 months.',
    category: 'career'
  },
  {
    question: 'What is the schedule for the sessions?',
    answer: 'Sessions are held daily from 11:00 PM to 7:00 PM IST, starting August 20, 2025. Weekend sessions are also available for those who prefer different timings. All sessions are conducted online.',
    category: 'schedule'
  },
  {
    question: 'How many students are in each batch?',
    answer: 'We maintain small batch sizes of 50-100 students to ensure personalized attention. This allows for better interaction and more focused learning experience.',
    category: 'general'
  },
  {
    question: 'What if I have questions during the course?',
    answer: 'You\'ll have access to our dedicated WhatsApp support group where you can ask questions 24/7. Our mentors and community members are always ready to help you succeed.',
    category: 'support'
  },
  {
    question: 'Is there any age limit for joining?',
    answer: 'No age limit! Whether you\'re a fresh graduate, working professional, or career switcher, you\'re welcome to join. Our oldest student was 58 years old and successfully transitioned to DevOps!',
    category: 'general'
  }
];

export const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General' },
    { id: 'prerequisites', label: 'Prerequisites' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'career', label: 'Career' },
    { id: 'support', label: 'Support' },
    { id: 'certification', label: 'Certification' }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
            <HelpCircle className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-blue-600 dark:text-blue-400 font-medium">Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Got
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Questions?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about our DevOps training program
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  aria-expanded={openItems.includes(index)}
                >
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openItems.includes(index) ? (
                      <ChevronDown className="w-6 h-6 text-blue-500 transform transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-gray-400 transform transition-transform duration-200" />
                    )}
                  </div>
                </button>

                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our support team is here to help you 24/7
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200">
                  <span>💬 WhatsApp Support</span>
                </button>
                <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200">
                  <span>📧 Email Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};  