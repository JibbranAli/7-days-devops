import React, { useState, useEffect } from 'react';
import { Terminal, Code, GitBranch, Cpu } from 'lucide-react';

export const MouseFollower: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const icons = [Terminal, Code, GitBranch, Cpu];
  const [currentIcon, setCurrentIcon] = useState(0);

  useEffect(() => {
    // Check if document is available (for SSR compatibility)
    if (typeof document === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 2000);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(iconInterval);
    };
  }, [isVisible, icons.length]);

  const Icon = icons[currentIcon];

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}
      style={{
        left: position.x - 20,
        top: position.y - 20,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm animate-pulse" />
        <div className="relative bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-full shadow-lg">
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};