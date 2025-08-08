import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, User, Mail, MapPin, MessageSquare } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  city: string;
  reason: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  city?: string;
  reason?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    city: '',
    reason: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Name can only contain letters and spaces';
        return undefined;
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return undefined;
      
      case 'city':
        if (!value.trim()) return 'City is required';
        if (value.trim().length < 2) return 'Please enter a valid city name';
        return undefined;
      
      case 'reason':
        if (!value.trim()) return 'Please tell us why you want to join';
        if (value.trim().length < 10) return 'Please provide at least 10 characters';
        if (value.trim().length > 500) return 'Please keep your response under 500 characters';
        return undefined;
      
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({ name: '', email: '', city: '', reason: '' });
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 shadow-2xl">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Registration Successful! 🎉
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                Welcome to the DevOps Training Program! We'll send you all the details and access 
                links to your registered email address within 24 hours.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-blue-700 dark:text-blue-300 font-medium">
                  📧 Check your email for the welcome package<br />
                  💬 Join our community WhatsApp group<br />
                  📅 Mark your calendar: August 20, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Start Your
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> DevOps Journey</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Register now for the most comprehensive free DevOps training program in India
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                      errors.name 
                        ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-500' 
                        : touched.name && !errors.name
                        ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 focus:ring-2 focus:ring-green-500'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500'
                    } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-transparent`}
                    placeholder="Enter your full name"
                  />
                  {touched.name && !errors.name && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.name && (
                  <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                      errors.email 
                        ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-500' 
                        : touched.email && !errors.email
                        ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 focus:ring-2 focus:ring-green-500'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500'
                    } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-transparent`}
                    placeholder="your.email@example.com"
                  />
                  {touched.email && !errors.email && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.email && (
                  <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* City Field */}
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  City *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                      errors.city 
                        ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-500' 
                        : touched.city && !errors.city
                        ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 focus:ring-2 focus:ring-green-500'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500'
                    } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-transparent`}
                    placeholder="Mumbai, Delhi, Bangalore..."
                  />
                  {touched.city && !errors.city && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.city && (
                  <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.city}
                  </div>
                )}
              </div>

              {/* Reason Field */}
              <div>
                <label htmlFor="reason" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Why do you want to join this program? *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 resize-none ${
                      errors.reason 
                        ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-500' 
                        : touched.reason && !errors.reason
                        ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 focus:ring-2 focus:ring-green-500'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500'
                    } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-transparent`}
                    placeholder="Share your goals, current experience, and what you hope to achieve..."
                  />
                  {touched.reason && !errors.reason && (
                    <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.reason && (
                  <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.reason}
                  </div>
                )}
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formData.reason.length}/500 characters
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing Registration...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Register for Free
                  </div>
                )}
              </button>

              {/* Additional Info */}
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p>🔒 Your information is secure and will never be shared</p>
                <p>📧 You'll receive joining details within 24 hours</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};