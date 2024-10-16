import React, { useState, useMemo } from 'react';
import { Tool } from '../types';
import ToolGrid from './ToolGrid';
import ToolTable from './ToolTable';
import SearchBar from './SearchBar';

interface ToolDisplayProps {
  tools: Tool[];
  loading: boolean;
}

const ToolDisplay: React.FC<ToolDisplayProps> = ({ tools, loading }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = useMemo(() => ['All', ...new Set(tools.map(tool => tool.category))], [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter(tool => 
      (selectedCategory === 'All' || tool.category === selectedCategory) &&
      (tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       tool.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [tools, selectedCategory, searchTerm]);

  if (loading) {
    return <div className="text-center py-8">Loading tools...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">The Best AI Sales Tools</h1>
      <div className="mb-4 flex flex-wrap justify-between items-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 mb-2 sm:mb-0"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div>
          <button
            onClick={() => setViewMode('grid')}
            className={`mr-2 px-4 py-2 rounded ${viewMode === 'grid' ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded ${viewMode === 'table' ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'}`}
          >
            Table
          </button>
        </div>
      </div>
      {viewMode === 'grid' ? (
        <ToolGrid tools={filteredTools} />
      ) : (
        <ToolTable tools={filteredTools} />
      )}
    </div>
  );
};

export default ToolDisplay;