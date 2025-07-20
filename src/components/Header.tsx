import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-pastel-blue p-4 shadow-lg flex flex-col md:flex-row items-center justify-between rounded-b-3xl mb-8">
      <Link to="/" className="text-white text-4xl md:text-5xl font-extrabold text-center mb-4 md:mb-0 drop-shadow-md">
        Animal Activity Zone!
      </Link>
      <nav>
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
          <li>
            <Link to="/" className="text-white text-lg md:text-xl font-bold hover:text-pastel-yellow transition-colors duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/whats-inside" className="text-white text-lg md:text-xl font-bold hover:text-pastel-yellow transition-colors duration-300">
              What’s Inside
            </Link>
          </li>
          <li>
            <Link to="/reviews" className="text-white text-lg md:text-xl font-bold hover:text-pastel-yellow transition-colors duration-300">
              Reviews
            </Link>
          </li>
          <li>
            <Link to="/faq" className="text-white text-lg md:text-xl font-bold hover:text-pastel-yellow transition-colors duration-300">
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white text-lg md:text-xl font-bold hover:text-pastel-yellow transition-colors duration-300">
              Contact
            </Link>
            </li>
          <li>
          <Link to="/animal matching game"
          classname="text-white text-lg md:text-xl font-bold hover:text-pastel-yellow transition-colors duration-300">
             Animal Matching Game
          </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;