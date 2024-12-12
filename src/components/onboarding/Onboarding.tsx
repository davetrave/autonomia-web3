import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@telegram-apps/telegram-ui';
// import ether_img from '../../assets/images/ether_icon.png'
import ton_img from '../../assets/images/ton_connect.png'

const onboardingData = [
  {
    title: "Welcome to Crypto Education",
    description: "Learn and earn while mastering cryptocurrency fundamentals",
    image: "https://xelene.me/telegram.gif"
  },
  {
    title: "Learn to Earn",
    description: "Complete lessons to mine tokens and unlock exclusive content",
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWdpM3d1NGg0YW1kMWJ5ejg2am1yejlpOWdlamNjaGNpdnV1aHlxaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5NoLXTfMR1xAfsYcgF/giphy.gif"
  },
  {
    title: "Connect Your Wallet",
    description: "Start your journey into Web3 education",
    image: ton_img
  }
];

interface onProps {
    onComplete: () => void;
    
  }

const OnboardingScreen: React.FC<onProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex === onboardingData.length - 1) {
      onComplete();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-blue-900 to-black">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex flex-col items-center justify-center p-4"
      >
        <motion.img
          key={currentIndex}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          src={onboardingData[currentIndex].image}
          className="w-64 h-64 mb-8"
          alt="Onboarding"
        />
        <motion.h1 
          className="text-2xl font-bold text-white mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {onboardingData[currentIndex].title}
        </motion.h1>
        <motion.p 
          className="text-gray-300 text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {onboardingData[currentIndex].description}g
        </motion.p>
        <Button 
          onClick={handleNext}
          className="bg-blue-500 text-white px-8 py-3 rounded-full"
        >
          {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
        </Button>
      </motion.div>
    </div>
  );
};

export default OnboardingScreen;
