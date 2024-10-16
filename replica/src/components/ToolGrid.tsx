import React from 'react';
import { Tool } from '../types';
import { motion } from 'framer-motion';
import { obfuscateText } from '../utils/antiScraping';

interface ToolGridProps {
  tools: Tool[];
}

const ToolGrid: React.FC<ToolGridProps> = ({ tools }) => {
  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tools.map((tool) => (
        <motion.div
          key={`${tool.category}-${tool.name}`}
          className="relative border p-4 rounded-lg transition-all duration-300 dark:border-gray-700 group hover:bg-white hover:dark:bg-gray-800"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center justify-between mb-2">
            <a href={tool.href} target="_blank" rel="noopener noreferrer">
              <img src={tool.logo} alt={tool.name} className="w-12 h-12" />
            </a>
            <span className="text-2xl">{getRankEmoji(tool.rank)}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            <a href={tool.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {obfuscateText(tool.name)}
            </a>
          </h3>
          <div className="absolute left-0 right-0 top-0 transform -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <p className="bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-sm text-gray-600 dark:text-gray-300">
              {obfuscateText(tool.description)}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ToolGrid;
