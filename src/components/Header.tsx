import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-pastel-blue p-4 shadow-lg flex flex-col md:flex-row items-center justify-between rounded-b-3xl mb-8">
      <Link to="/" className="text-white text-4xl md:text-5xl font-extrabold text-center mb-4 md:mb-0 drop-shadow-md">
        Animal Activity Zone!
      </Link>
      <a href="https://www.etsy.com/shop/YourEtsyShop" target="_blank" rel="noopener noreferrer">
        <Button className="bg-pastel-peach hover:bg-pastel-pink text-white text-lg md:text-xl font-bold py-3 px-6 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105">
          Visit My Etsy Shop!
        </Button>
      </a>
    </header>
  );
};

export default Header;