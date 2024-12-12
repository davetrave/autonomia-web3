import React from 'react';

interface CardProps {
  title: string;
  description: string;
  image?: string;
}

const Card: React.FC<CardProps> = ({ title, description, image }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {image && <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default Card;
