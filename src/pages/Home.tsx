import React from 'react';
import { 
  Card as TelegramCard,
  Button,
  Text,
  Section,
  Banner
} from '@telegram-apps/telegram-ui';
import {IconTelegramStar} from '../assets/icons/IconTgStar'
import WebApp from '@twa-dev/sdk'


interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  stars: number;
  onStarClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  title, 
  description, 
  image, 
  stars,
  onStarClick 
}) => {
  return (
    <TelegramCard className="overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <Text Component="h3" className="mb-2">{title}</Text>
        <Text Component="h3" className="mb-4">{description}</Text>
        <Button 
          onClick={onStarClick}
          Component="button"
          className="flex items-center gap-2"
        >
          <Text Component="h2">{stars}</Text>
          <div
            style={{
              width: 16,
              height: 16,
              marginTop: 2,
              
            }}
          >
            <IconTelegramStar />
          </div>
        </Button>
      </div>
    </TelegramCard>
  );
};

const Home: React.FC = () => {
  const handleStarPayment = async (courseTitle: string, stars: number) => {
    try {
      // Initialize Telegram WebApp payments
      const webapp = (window as any).Telegram.WebApp;
      
      if (webapp) {
        await webapp.initDataUnsafe()
        await webapp.createInvoiceLink({
          title: `Purchase ${courseTitle}`,
          payload: "",
          description: `This will cost ${stars} stars. Would you like to proceed?`,
          prices: [{price: `${stars}`}],
          currency: "XTR"
          
        });
        
        // Handle payment logic here
        // You would typically integrate with Telegram's payment API
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  const courses = [
    {
      title: "Crypto Basics",
      description: "Learn the fundamentals of cryptocurrency.",
      image: "https://via.placeholder.com/150",
      stars: 500
    },
    {
      title: "Blockchain Explained",
      description: "Understand how blockchain works.",
      image: "https://via.placeholder.com/150",
      stars: 750
    },
    {
      title: "Investing in Crypto",
      description: "Explore how to invest safely.",
      image: "https://via.placeholder.com/150",
      stars: 1000
    }
  ];

  return (
    <Section className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white'>
      <Banner>
        <Text Component="h1" className="text-center mb-6">
          Crypto Education Courses
        </Text>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              {...course}
              onStarClick={() => handleStarPayment(course.title, course.stars)}
            />
          ))}
        </div>
      </Banner>
    </Section>
    
  );
};

export default Home;
