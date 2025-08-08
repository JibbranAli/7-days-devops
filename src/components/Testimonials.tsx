import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Atul Sharma',
    rating: 5,
    text: 'In just one week, I gained hands-on knowledge of Docker, Inc, Kubernetes, Jenkins, GitHub, Ansible by Red Hat, and so much more. The way Sir simplifies complex concepts and teaches nonstop with such passion is truly inspiring. 🙌 This program didn\'t just teach me tools; it completely transformed the way I think about #DevOps and real-world implementation. 💡 A heartfelt THANK YOU to Vimal Daga Sir for his dedication and to the LinuxWorld Informatics Pvt Ltd Team for providing this incredible opportunity. 🙏 If you want to take your DevOps skills to the next level, this program is an absolute MUST! 💯',
    highlight: 'Transformed DevOps thinking in just one week'
  },
  {
    name: 'Udit Upadhyay',
    rating: 5,
    text: 'I had the opportunity to participate in an immersive 7-day DevOps Job Prep Training guided by the esteemed Vimal Daga Sir, and it proved to be a transformative experience. The comprehensive hands-on sessions provided invaluable practical knowledge of key tools like Ansible, Terraform, Jenkins, AWS, and Kubernetes. Gaining in-depth insights into cloud strategies, CI/CD pipelines, and container management has significantly strengthened my technical expertise. Moreover, the mock interviews and CV enhancement workshops were instrumental in sharpening my readiness for real-world job opportunities. The combination of practical learning, expert mentorship, and actionable resources has equipped me with the confidence and skills to advance my DevOps career with success!',
    highlight: 'Transformative 7-day DevOps experience'
  },
  {
    name: 'KISHORE KUMAR S',
    rating: 5,
    text: 'I\'m blown away by the exceptional quality of the 7-day DevOps learning experience! The instructor\'s efforts and content delivery are truly awesome a true DevOps GURU Vimal Daga sir. As someone who\'s completed three global Red Hat certifications, I can confidently say that this experience surpassed my expectations. The concepts were clearly explained, and I appreciated the technical team\'s efforts in making this happen.',
    highlight: 'Surpassed Red Hat certification expectations'
  },
  {
    name: 'Anustha Pal',
    rating: 5,
    text: 'During this training, I get to know more tools and get more clarity on CI/CD pipelines and Kubernetes deployments and many other topics. My WOW moment was realizing was when, i just on my own make this vast project, where I applied and learn a basics of a lot of tools, that was so great for me !! Thankyou Vimal Daga Sir!!!!',
    highlight: 'WOW moment with hands-on project experience'
  },
  {
    name: 'Shrey Sharma',
    rating: 5,
    text: 'I wanted to take a moment to express my sincere gratitude for the exceptional 7-day DevOps training. The course content was thorough and insightful, and the hands-on approach helped me gain a deeper understanding of key DevOps practices and tools. Your expert trainers made complex topics easy to understand, and the overall experience has been both engaging and rewarding. I feel more confident in applying DevOps principles in real-world scenarios. Thank you again for providing such a valuable learning opportunity. I look forward to implementing what I\'ve learned and continuing my DevOps journey.',
    highlight: 'Confident in real-world DevOps applications'
  },
  {
    name: 'Abhishek sanap',
    rating: 5,
    text: 'This 7-day DevOps workshop was an absolute whirlwind of knowledge! Vimal Sir, with his infectious enthusiasm and uncanny ability to simplify intricate concepts, transformed what could have been daunting topics into an exhilarating journey of discovery. From the moment we delved into the bedrock of Linux fundamentals, his guidance was nothing short of masterful. Networking, often perceived as a labyrinthine subject, was demystified with crystal-clear explanations and insightful analogies. Bash scripting, once a daunting prospect, became a playground of possibilities as Sir expertly guided us through its nuances. And then came Docker – the star of the show! Starting with the basics and seamlessly transitioning into advanced concepts, Sir ignited a passion within me for containerization. The hands-on exercises were the true heroes of this workshop. They weren\'t just dry drills; they were exhilarating challenges that brought the theoretical knowledge to life. Every successful deployment, every smoothly orchestrated container orchestration, was a victory that fueled my desire to learn more. This workshop wasn\'t just about acquiring skills; it was about igniting a spark within me, a thirst for continuous learning and newfound confidence.',
    highlight: 'Ignited passion for containerization and DevOps'
  },
  {
    name: 'Anjali Yadav',
    rating: 5,
    text: 'I recently had the privilege of completing a comprehensive 7-day DevOps program, and it was nothing short of amazing! The sessions were highly engaging and interactive, covering essential topics like DevOps and Cloud concepts, CI/CD pipelines, Containerization, automation, management, and monitoring. What made this experience truly remarkable was the hands-on practice and real-world projects and scenarios that provided invaluable learning. A special shoutout to Vimal Daga sir, whose exceptional teaching style, starting from the basics, transformed my understanding of how technologies work. I\'m incredibly thankful to Vimal Daga sir and LinuxWorld Informatics Pvt Ltd World for this incredible opportunity. It has been a game-changer in my DevOps journey!',
    highlight: 'Game-changer in DevOps journey'
  },
  {
    name: 'RamyaBhargavi Jella',
    rating: 5,
    text: 'I have recently completed 7 days of free DevOps Deloitte job preparation Training program. I have learnt new topics such as ArgoCD, Istio, kiali, Prometheus, Grafana. I\'m grateful to Vimal daga sir for the valuable program and boost my skills and confidence.',
    highlight: 'Learned advanced DevOps tools and gained confidence'
  },
  {
    name: 'Ojasv Kumar',
    rating: 5,
    text: 'It was an incredible experience completing the 7-day DevOps program. Engaging and interactive training that covers DevOps and Cloud concepts, CI/CD pipeline, Containerization, automation, management, and monitoring. Hands-on practice and industry-based projects and scenarios were a great learning experience. The way Vimal Daga sir teaches is amazing, especially everything from scratch, which changed my view of technology. Thanks to Vimal sir and Linux World for giving me this opportunity.',
    highlight: 'Changed view of technology from scratch'
  },
  {
    name: 'Vishal Kumar',
    rating: 5,
    text: 'Thank you for an amazing learning experience! Your guidance and ability to explain complex topics simply have been truly inspiring. The combination of technical knowledge and life lessons you shared has improved my skills and changed how I approach challenges and think about solutions. Your mentorship has made a big difference, and I\'m excited to apply the knowledge you\'ve taught us in the future.',
    highlight: 'Inspiring mentorship with life lessons'
  },
  {
    name: 'Ashik Cherukuri',
    rating: 5,
    text: 'I recently completed a 7-day DevOps program, and it was an incredible experience! Engaging and interactive training that includes DevOps and Cloud concepts, CI/CD pipeline, Containerization, automation, management, and monitoring. This all combined hands-on practice and industry based projects and scenarios were a great learning itself. The way Vimal Daga sir teaches is amazing, especially everything from the scratch, which changed my view on how technologies work. I am truly grateful and thankful to Vimal sir and Linux World for giving me this opportunity.',
    highlight: 'Incredible 7-day DevOps experience'
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Success
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Stories</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of professionals who transformed their careers with our training
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Testimonial Card */}
          <div 
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="w-24 h-24 text-blue-500" />
            </div>

            <div className="relative z-10">
              {/* Rating */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex space-x-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-center leading-relaxed mb-8 font-medium">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Highlight Badge */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-full">
                  <span className="text-green-700 dark:text-green-300 text-sm font-medium">
                    ✨ {currentTestimonial.highlight}
                  </span>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <h4 className="font-bold text-gray-900 dark:text-white text-xl">
                    {currentTestimonial.name}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-blue-500 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">95%</div>
            <div className="text-gray-600 dark:text-gray-400">Job Placement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">4.9/5</div>
            <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">10K+</div>
            <div className="text-gray-600 dark:text-gray-400">Happy Students</div>
          </div>
        </div>
      </div>
    </section>
  );
};