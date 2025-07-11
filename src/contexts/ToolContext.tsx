import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  priceType: 'day' | 'week' | 'month';
  location: string;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  images: string[];
  condition: 'excellent' | 'good' | 'fair';
  availability: boolean;
  createdAt: string;
}

interface ToolContextType {
  tools: Tool[];
  addTool: (tool: Omit<Tool, 'id' | 'createdAt'>) => void;
  updateTool: (id: string, updates: Partial<Tool>) => void;
  deleteTool: (id: string) => void;
  getUserTools: (userId: string) => Tool[];
  getToolById: (id: string) => Tool | undefined;
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

export const useTool = () => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error('useTool must be used within a ToolProvider');
  }
  return context;
};

export const ToolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    // Load tools from localStorage
    const savedTools = localStorage.getItem('tools');
    if (savedTools) {
      setTools(JSON.parse(savedTools));
    } else {
      // Add some sample tools for demonstration
      const sampleTools: Tool[] = [
        {
          id: '1',
          name: 'John Deere Tractor',
          category: 'Tractors',
          description: 'Heavy-duty tractor perfect for large fields. Well-maintained and reliable.',
          price: 150,
          priceType: 'day',
          location: 'California, USA',
          ownerId: 'sample',
          ownerName: 'John Smith',
          ownerPhone: '+1-555-0123',
          images: ['https://images.pexels.com/photos/158843/tractor-plowing-field-158843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
          condition: 'excellent',
          availability: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Combine Harvester',
          category: 'Harvesters',
          description: 'Efficient combine harvester for grain crops. Recently serviced.',
          price: 200,
          priceType: 'day',
          location: 'Texas, USA',
          ownerId: 'sample',
          ownerName: 'Mike Johnson',
          ownerPhone: '+1-555-0124',
          images: ['https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
          condition: 'good',
          availability: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Seed Drill',
          category: 'Planting Equipment',
          description: 'Precision seed drill for optimal planting. Multiple row configuration.',
          price: 80,
          priceType: 'day',
          location: 'Iowa, USA',
          ownerId: 'sample',
          ownerName: 'Sarah Williams',
          ownerPhone: '+1-555-0125',
          images: ['https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
          condition: 'excellent',
          availability: true,
          createdAt: new Date().toISOString(),
        },
      ];
      setTools(sampleTools);
      localStorage.setItem('tools', JSON.stringify(sampleTools));
    }
  }, []);

  const addTool = (toolData: Omit<Tool, 'id' | 'createdAt'>) => {
    const newTool: Tool = {
      ...toolData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedTools = [...tools, newTool];
    setTools(updatedTools);
    localStorage.setItem('tools', JSON.stringify(updatedTools));
  };

  const updateTool = (id: string, updates: Partial<Tool>) => {
    const updatedTools = tools.map(tool => 
      tool.id === id ? { ...tool, ...updates } : tool
    );
    setTools(updatedTools);
    localStorage.setItem('tools', JSON.stringify(updatedTools));
  };

  const deleteTool = (id: string) => {
    const updatedTools = tools.filter(tool => tool.id !== id);
    setTools(updatedTools);
    localStorage.setItem('tools', JSON.stringify(updatedTools));
  };

  const getUserTools = (userId: string) => {
    return tools.filter(tool => tool.ownerId === userId);
  };

  const getToolById = (id: string) => {
    return tools.find(tool => tool.id === id);
  };

  return (
    <ToolContext.Provider value={{
      tools,
      addTool,
      updateTool,
      deleteTool,
      getUserTools,
      getToolById,
    }}>
      {children}
    </ToolContext.Provider>
  );
};