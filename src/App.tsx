import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ModalProvider, useModal } from './contexts/ModalContext';
import { MouseFollower } from './components/MouseFollower';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { Curriculum } from './components/Curriculum';
import { WhatYouWillLearn } from './components/WhatYouWillLearn';
import { MentorSection } from './components/MentorSection';
import { Countdown } from './components/Countdown';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
// import { CourseTimeline } from './components/CourseTimeline';
import { IndustryTrends } from './components/IndustryTrends';
import { RegistrationForm } from './components/RegistrationForm';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AnimatedBackground, FloatingElements } from './components/AnimatedBackground';

function AppContent() {
  const [mounted, setMounted] = useState(false);
  const { isRegistrationModalOpen, closeRegistrationModal } = useModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black transition-colors duration-300">
      <AnimatedBackground />
      <FloatingElements />
      <MouseFollower />
      <Header />
      
      <main>
        <HeroSection />
        <WhatYouWillLearn />
        <Curriculum />
        {/* <CourseTimeline /> */}
        <MentorSection />
        <IndustryTrends />
        <Countdown />
        <Testimonials />
        <FAQ />
      </main>
      
      <Footer />
      <ScrollToTop />
      <RegistrationForm 
        isOpen={isRegistrationModalOpen} 
        onClose={closeRegistrationModal} 
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;