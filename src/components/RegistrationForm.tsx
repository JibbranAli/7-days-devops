import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Building, 
  Phone, 
  GraduationCap,
  Briefcase,
  X,
  ExternalLink
} from 'lucide-react';

interface FormData {
  fullName: string;
  collegeCompany: string;
  contactNumber: string;
  emailId: string;
  currentCity: string;
  sourceOfInformation: string;
  reference: string;
  profession: string;
  yearsOfExperience: string;
  currentRole: string;
  expectations: string;
  additionalInfo: string;
}

interface FormErrors {
  fullName?: string;
  collegeCompany?: string;
  contactNumber?: string;
  emailId?: string;
  currentCity?: string;
  sourceOfInformation?: string;
  profession?: string;
  yearsOfExperience?: string;
  currentRole?: string;
}

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    collegeCompany: '',
    contactNumber: '',
    emailId: '',
    currentCity: '',
    sourceOfInformation: '',
    reference: '',
    profession: '',
    yearsOfExperience: '',
    currentRole: '',
    expectations: '',
    additionalInfo: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Name can only contain letters and spaces';
        return undefined;
      
      case 'collegeCompany':
        if (!value.trim()) return 'College/Company is required';
        if (value.trim().length < 2) return 'Please enter a valid college/company name';
        return undefined;
      
      case 'contactNumber':
        if (!value.trim()) return 'Contact number is required';
        if (!/^[0-9+\-\s()]{10,15}$/.test(value.trim())) return 'Please enter a valid contact number';
        return undefined;
      
      case 'emailId':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return undefined;
      
      case 'currentCity':
        if (!value.trim()) return 'Current city is required';
        if (value.trim().length < 2) return 'Please enter a valid city name';
        return undefined;
      
      case 'sourceOfInformation':
        if (!value.trim()) return 'Please select how you came to know about this training';
        return undefined;
      
      case 'profession':
        if (!value.trim()) return 'Please select your profession';
        return undefined;
      
      case 'yearsOfExperience':
        if (formData.profession === 'Professional' && !value.trim()) {
          return 'Years of experience is required for professionals';
        }
        return undefined;
      
      case 'currentRole':
        if (!value.trim()) return 'Current role/position is required';
        return undefined;
      
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      if (key !== 'reference' && key !== 'expectations' && key !== 'additionalInfo') {
        const error = validateField(key, formData[key as keyof FormData]);
        if (error) {
          newErrors[key as keyof FormErrors] = error;
          isValid = false;
        }
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Google Apps Script Web App URL - you'll need to replace this with your actual URL
      const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'Website Registration Form'
        })
      });

      // Since we're using no-cors, we can't check the response status
      // In a real implementation, you'd handle the response properly
      
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        collegeCompany: '',
        contactNumber: '',
        emailId: '',
        currentCity: '',
        sourceOfInformation: '',
        reference: '',
        profession: '',
        yearsOfExperience: '',
        currentRole: '',
        expectations: '',
        additionalInfo: ''
      });
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      if (!isSubmitted) {
        setFormData({
          fullName: '',
          collegeCompany: '',
          contactNumber: '',
          emailId: '',
          currentCity: '',
          sourceOfInformation: '',
          reference: '',
          profession: '',
          yearsOfExperience: '',
          currentRole: '',
          expectations: '',
          additionalInfo: ''
        });
        setErrors({});
        setTouched({});
      }
    }
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Registration Successful! 🎉
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              Welcome to the DevOps Training Program! We'll send you all the details and access 
              links to your registered email address within 24 hours.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800 mb-6">
              <p className="text-blue-700 dark:text-blue-300 font-medium text-sm">
                📧 Check your email for the welcome package<br />
                💬 Join our community WhatsApp group<br />
                📅 Mark your calendar: August 20, 2025
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Register for <span className="text-green-600 dark:text-green-400">FREE</span> Training
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Join the most comprehensive DevOps training program in India - <span className="text-green-600 dark:text-green-400 font-bold">100% FREE!</span>
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                  errors.fullName 
                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-500' 
                    : touched.fullName && !errors.fullName
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 focus:ring-2 focus:ring-green-500'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500'
                } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-transparent`}
                placeholder="Enter your full name"
              />
              {touched.fullName && !errors.fullName && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.fullName && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.fullName}
              </div>
            )}
          </div>

          {/* College/Company */}
          <div>
            <label htmlFor="collegeCompany" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              College / Company *
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="collegeCompany"
                name="collegeCompany"
                value={formData.collegeCompany}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                  errors.collegeCompany 
                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-500' 
                    : touched.collegeCompany && !errors.collegeCompany
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 focus:ring-2 focus:ring-green-500'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500'
                } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-transparent`}
                placeholder="Your college or company name"
              />
              {touched.collegeCompany && !errors.collegeCompany && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.collegeCompany && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.collegeCompany}
              </div>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Contact Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                  errors.contactNumber 
                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-500' 
                    : touched.contactNumber && !errors.contactNumber
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 focus:ring-2 focus:ring-green-500'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500'
                } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-transparent`}
                placeholder="Your phone number"
              />
              {touched.contactNumber && !errors.contactNumber && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.contactNumber && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.contactNumber}
              </div>
            )}
          </div>

          {/* Email ID */}
          <div>
            <label htmlFor="emailId" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email ID *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                  errors.emailId 
                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-500' 
                    : touched.emailId && !errors.emailId
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 focus:ring-2 focus:ring-green-500'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500'
                } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-transparent`}
                placeholder="your.email@example.com"
              />
              {touched.emailId && !errors.emailId && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.emailId && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.emailId}
              </div>
            )}
          </div>

          {/* Current City */}
          <div>
            <label htmlFor="currentCity" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Current City *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="currentCity"
                name="currentCity"
                value={formData.currentCity}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                  errors.currentCity 
                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-500' 
                    : touched.currentCity && !errors.currentCity
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 focus:ring-2 focus:ring-green-500'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500'
                } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-transparent`}
                placeholder="Your current city"
              />
              {touched.currentCity && !errors.currentCity && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.currentCity && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.currentCity}
              </div>
            )}
          </div>

          {/* Source of Information */}
          <div>
            <label htmlFor="sourceOfInformation" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              How did you come to know about this training? *
            </label>
            <div className="relative">
              <select
                id="sourceOfInformation"
                name="sourceOfInformation"
                value={formData.sourceOfInformation}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                  errors.sourceOfInformation 
                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-500' 
                    : touched.sourceOfInformation && !errors.sourceOfInformation
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 focus:ring-2 focus:ring-green-500'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500'
                } text-gray-900 dark:text-white focus:border-transparent`}
              >
                <option value="">Select an option</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Instagram">Instagram</option>
                <option value="Other">Other</option>
              </select>
              {touched.sourceOfInformation && !errors.sourceOfInformation && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.sourceOfInformation && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.sourceOfInformation}
              </div>
            )}
          </div>

          {/* Reference */}
          <div>
            <label htmlFor="reference" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Reference (if any)
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Who referred you to this training? (optional)"
              />
            </div>
          </div>

          {/* Profession */}
          <div>
            <label htmlFor="profession" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Are you a Student or Professional? *
            </label>
            <div className="relative">
              <select
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                  errors.profession 
                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-500' 
                    : touched.profession && !errors.profession
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 focus:ring-2 focus:ring-green-500'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500'
                } text-gray-900 dark:text-white focus:border-transparent`}
              >
                <option value="">Select your profession</option>
                <option value="Student">Student</option>
                <option value="Professional">Professional</option>
              </select>
              {touched.profession && !errors.profession && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.profession && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.profession}
              </div>
            )}
          </div>

          {/* Years of Experience (conditional) */}
          {formData.profession === 'Professional' && (
            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Years of Experience (if professional) *
              </label>
              <div className="relative">
                <select
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                    errors.yearsOfExperience 
                      ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-500' 
                      : touched.yearsOfExperience && !errors.yearsOfExperience
                      ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 focus:ring-2 focus:ring-green-500'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500'
                  } text-gray-900 dark:text-white focus:border-transparent`}
                >
                  <option value="">Select experience</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
                {touched.yearsOfExperience && !errors.yearsOfExperience && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {errors.yearsOfExperience && (
                <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.yearsOfExperience}
                </div>
              )}
            </div>
          )}

          {/* Current Role/Position */}
          <div>
            <label htmlFor="currentRole" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Current Role/Position *
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="currentRole"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                  errors.currentRole 
                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-500' 
                    : touched.currentRole && !errors.currentRole
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 focus:ring-2 focus:ring-green-500'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500'
                } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-transparent`}
                placeholder="e.g., Software Engineer, Student, etc."
              />
              {touched.currentRole && !errors.currentRole && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.currentRole && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.currentRole}
              </div>
            )}
          </div>

          {/* Expectations */}
          <div>
            <label htmlFor="expectations" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              What do you expect from this training?
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                id="expectations"
                name="expectations"
                value={formData.expectations}
                onChange={handleChange}
                rows={3}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                placeholder="Share your expectations and goals..."
              />
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Additional Information
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={3}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                placeholder="Any additional information you'd like to share..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Processing Registration...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="mr-2">🎁</span>
                <Send className="w-5 h-5 mr-2" />
                Register for FREE Training
                <span className="ml-2">🎁</span>
              </div>
            )}
          </button>

          {/* Additional Info */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>🔒 Your information is secure and will never be shared</p>
            <p>📧 You'll receive joining details within 24 hours</p>
          </div>
        </form>
      </div>
    </div>
  );
}; 