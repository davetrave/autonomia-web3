
import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

// Define the navigation item type
interface NavItem {
  path: string;
  label: string;
  icon: string; // Icon could be a string (emoji) or a JSX.Element
}

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number>(0); // Active tab index
  const holeRef = useRef<HTMLDivElement>(null); // Reference to the animated circle
  const navBarRef = useRef<HTMLDivElement>(null); // Reference to the nav bar for calculations

  // Navigation items
  const navItems: NavItem[] = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/course', label: 'Courses', icon: '📚' },
    { path: '/store', label: 'Store', icon: '🛒' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  useEffect(() => {
    // Determine the active index based on the current path
    const currentIndex = navItems.findIndex((item) => item.path === location.pathname);
    setActiveIndex(currentIndex);

    // Calculate the x offset dynamically based on tab width
    if (holeRef.current && navBarRef.current) {
      const navBarWidth = navBarRef.current.offsetWidth;
      const tabWidth = navBarWidth / navItems.length; // Width of each tab
      gsap.to(holeRef.current, {
        x: currentIndex * tabWidth + tabWidth/3, // Position the hole based on the active tab index
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  }, [location.pathname, navItems]);

  return (
    <div
      ref={navBarRef}
      className="fixed bottom-0 left-0 right-0 bg-blue-900 text-white flex justify-around items-center shadow-lg rounded-t-lg py-4 z-30"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} // For devices with a safe area (e.g., iPhones with notches)
    >
      {/* Animated Hole for Active Tab */}
      <div
        ref={holeRef}
        className="absolute top-[-12px] left-0 w-16 h-16 bg-white rounded-full shadow-lg z-10"
        style={{ transform: 'translateX(0)' }} // Initial placement
      >
        <div className="flex items-center justify-center w-full h-full text-2xl text-blue-600">
          {navItems[activeIndex]?.icon}
        </div>
      </div>

      {/* Render Navigation Items */}
      {navItems.map((item, index) => (
        <NavItem
          key={item.path}
          to={item.path}
          label={item.label}
          icon={item.icon}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  );
};

// Props for NavItem
interface NavItemProps {
  to: string;
  label: string;
  icon: string; // Icon can be an emoji or JSX.Element
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center text-center ${
        isActive ? 'text-transparent' : 'text-white'
      } relative`}
      style={{ width: '80px' }}
    >
      <span className={`text-2xl ${isActive ? 'opacity-0' : ''}`}>{icon}</span>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default BottomNavigation;
