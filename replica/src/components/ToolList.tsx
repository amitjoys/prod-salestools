import React from 'react';
import { Tool } from '../types';

interface ToolListProps {
  tools: Tool[];
}

// Function to group tools by category
const groupByCategory = (tools: Tool[]): Record<string, Tool[]> => {
  return tools.reduce((acc, tool) => {
    const { category } = tool;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);
};

const ToolList: React.FC<ToolListProps> = ({ tools }) => {
  const toolsByCategory = groupByCategory(tools); // Group tools by category

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">The Best AI Sales Tools</h1>
      {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryTools.map((tool) => (
              <div key={tool.name} className="border p-4 rounded-lg hover:shadow-lg transition-shadow">
                <img src={tool.logo} alt={tool.name} className="w-12 h-12 mb-2" />
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>
                <a href={`https://${tool.domain}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Visit Website
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolList;
