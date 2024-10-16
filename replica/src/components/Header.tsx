
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-purple-900 bg-opacity-50 text-white shadow z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">Cold Prospecting Leaders</Link>
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="text-white">
            {darkMode ? '🌞' : '🌙'}
          </button>
          <Link to="/" className="text-white hover:text-purple-300">Home</Link>
          <Link to="/tools" className="text-white hover:text-purple-300">Tools</Link>
          <Link to="/coaching" className="text-white hover:text-purple-300">Coaching</Link>
          <Link to="/blog" className="text-white hover:text-purple-300">Blog</Link>
          <button className="bg-purple-700 bg-opacity-50 text-white px-4 py-2 rounded hover:bg-purple-800 transition-colors">Get in touch</button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-purple-900 bg-opacity-50">
          <Link to="/" className="block py-2 px-4 text-white hover:bg-purple-800">Home</Link>
          <Link to="/tools" className="block py-2 px-4 text-white hover:bg-purple-800">Tools</Link>
          <Link to="/coaching" className="block py-2 px-4 text-white hover:bg-purple-800">Coaching</Link>
          <Link to="/blog" className="block py-2 px-4 text-white hover:bg-purple-800">Blog</Link>
          <button onClick={toggleDarkMode} className="block w-full text-left py-2 px-4 text-white hover:bg-purple-800">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button className="block w-full text-left py-2 px-4 text-white hover:bg-purple-800">Get in touch</button>
        </div>
      )}
    </header>
  );
};

export default Header;
