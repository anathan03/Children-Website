import React from 'react';
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Footer: React.FC = () => {
  return (
    <footer className="bg-pastel-mint p-4 shadow-lg flex flex-col items-center justify-center rounded-t-3xl mt-8">
      <a href="https://www.etsy.com/shop/YourEtsyShop" target="_blank" rel="noopener noreferrer" className="mb-4">
        <Button className="bg-pastel-yellow hover:bg-pastel-peach text-white text-lg md:text-xl font-bold py-3 px-6 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105">
          Visit My Etsy Shop!
        </Button>
      </a>
      <MadeWithDyad />
    </footer>
  );
};

export default Footer;