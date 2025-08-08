import React from 'react';
import { 
  MessageCircle, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/1234567890?text=I%20want%20to%20join%20the%20DevOps%20training',
      color: 'hover:text-green-500',
      bgColor: 'hover:bg-green-50 dark:hover:bg-green-900/20'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/vimaldaga',
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/vimaldaga',
      color: 'hover:text-sky-500',
      bgColor: 'hover:bg-sky-50 dark:hover:bg-sky-900/20'
    }
  ];

  const quickLinks = [
    { name: 'Training Curriculum', href: '#curriculum' },
    { name: 'About Mentor', href: '#mentor' },
    { name: 'Student Testimonials', href: '#testimonials' },
    { name: 'Register Now', href: '#contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const shareOnSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Join me in this amazing FREE 7-Day DevOps Training by Mr. Vimal Daga!');
    
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`
    };
    
    const shareUrl = shareUrls[platform as keyof typeof shareUrls];
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">VD</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">DevOps Training</h3>
                  <p className="text-gray-400 text-sm">by Vimal Daga</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Empowering the next generation of DevOps professionals in India through 
                comprehensive, hands-on training programs. Join thousands of successful alumni.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>contact@vimaldaga-devops.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-5 h-5 text-green-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Share */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Connect & Share</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-3">Follow us:</p>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 ${social.color} ${social.bgColor} transition-all duration-200 hover:scale-110`}
                          aria-label={`Follow on ${social.name}`}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm mb-3">Share this program:</p>
                  <div className="flex space-x-2">
                    {socialLinks.map((social, index) => (
                      <button
                        key={index}
                        onClick={() => shareOnSocial(social.name.toLowerCase())}
                        className={`px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300 ${social.color} transition-colors duration-200 hover:scale-105`}
                      >
                        {social.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              <p>© {currentYear} DevOps Training by Vimal Daga. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for DevOps enthusiasts in India</span>
            </div>
          </div>
          
          {/* Additional Links */}
          <div className="mt-6 text-center">
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <button className="hover:text-white transition-colors duration-200">Privacy Policy</button>
              <button className="hover:text-white transition-colors duration-200">Terms of Service</button>
              <button className="hover:text-white transition-colors duration-200">Refund Policy</button>
              <button className="hover:text-white transition-colors duration-200">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};