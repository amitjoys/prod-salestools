import React, { useState } from 'react';
import { Tool } from '../types';
import { obfuscateText } from '../utils/antiScraping';

interface ToolTableProps {
  tools: Tool[];
}

const ToolTable: React.FC<ToolTableProps> = ({ tools }) => {
  const [sortColumn, setSortColumn] = useState<keyof Tool>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  const sortedTools = [...tools].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column: keyof Tool) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700">
        <thead>
          <tr>
            {['rank', 'name', 'description'].map((column) => (
              <th
                key={column}
                className="px-4 py-2 cursor-pointer bg-gray-100 dark:bg-gray-700 text-left"
                onClick={() => handleSort(column as keyof Tool)}
              >
                {column.charAt(0).toUpperCase() + column.slice(1)}
                {sortColumn === column && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedTools.map((tool) => (
            <tr 
              key={`${tool.category}-${tool.name}`} 
              className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <td className="px-4 py-2 text-center">{getRankEmoji(tool.rank)}</td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <a href={tool.href} target="_blank" rel="noopener noreferrer" className="mr-2">
                    <img src={tool.logo} alt={tool.name} className="w-8 h-8" />
                  </a>
                  <a href={tool.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {obfuscateText(tool.name)}
                  </a>
                </div>
              </td>
              <td className="px-4 py-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {obfuscateText(tool.description)}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToolTable;
