import React from 'react';
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Footer: React.FC = () => {
  return (
    <footer className="bg-pastel-mint p-6 shadow-lg flex flex-col items-center justify-center rounded-t-3xl mt-8">
      <a href="https://www.etsy.com/shop/studyflowco/?etsrc=sdt" target="_blank" rel="noopener noreferrer" className="mb-6">
        <Button className="bg-pastel-yellow hover:bg-pastel-peach text-white text-lg md:text-xl font-bold py-3 px-6 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105">
          Visit My Etsy Shop!
        </Button>
      </a> {/* Closing the anchor tag here */}
      <p className="text-white
       text-sm mb-4">
        &copy; {new Date().getFullYear()} Animal Activity Zone. All rights reserved.
      </p>
      <MadeWithDyad />
    </footer>
  );
};

export default Footer;