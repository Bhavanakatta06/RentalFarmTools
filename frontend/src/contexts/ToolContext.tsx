// ToolContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api"; // ✅ your Axios instance

export interface Tool {
  id?: number;
  name: string;
  category: string;
  description: string;
  price: number;
  priceType: "day" | "week" | "month";
  location: string;
  condition: "excellent" | "good" | "fair";
  availability: boolean;
  images: string[];
  createdAt?: string;
  owner?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  formattedPrice?: string;
}

interface ToolContextType {
  tools: Tool[];
  addTool: (tool: Omit<Tool, "id" | "createdAt" | "owner">) => Promise<void>;
  updateTool: (id: number, updates: Partial<Tool>) => Promise<void>;
  deleteTool: (id: number) => Promise<void>;
  getUserTools: (userId: number) => Tool[];
  getToolById: (id: number) => Promise<Tool | undefined>; // ✅ now async
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

export const useTool = () => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error("useTool must be used within a ToolProvider");
  }
  return context;
};

export const ToolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tools, setTools] = useState<Tool[]>([]);

  const formatPrice = (price: number): string =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const mapTools = (data: any[]): Tool[] =>
    data.map((tool) => ({
      ...tool,
      formattedPrice: formatPrice(tool.price),
    }));

  // 🔹 Fetch all tools
  const fetchTools = async () => {
    try {
      const res = await api.get<Tool[]>("/tools");
      setTools(mapTools(res.data));
    } catch (error: any) {
      console.error("Error fetching tools:", error.message || error);
    }
  };

  useEffect(() => {
    fetchTools();
    const interval = setInterval(fetchTools, 30000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Add tool
  const addTool = async (toolData: Omit<Tool, "id" | "createdAt" | "owner">) => {
    try {
      await api.post("/tools", toolData);
      await fetchTools();
    } catch (error: any) {
      console.error("Error adding tool:", error.message || error);
    }
  };

  // 🔹 Update tool
  const updateTool = async (id: number, updates: Partial<Tool>) => {
    try {
      await api.put(`/tools/${id}`, updates);
      await fetchTools();
    } catch (error: any) {
      console.error("Error updating tool:", error.message || error);
    }
  };

  // 🔹 Delete tool
  const deleteTool = async (id: number) => {
    try {
      await api.delete(`/tools/${id}`);
      await fetchTools();
    } catch (error: any) {
      console.error("Error deleting tool:", error.message || error);
    }
  };

  // 🔹 Get tools owned by a user
  const getUserTools = (userId: number) => tools.filter((tool) => tool.owner?.id === userId);

  // 🔹 Get tool by ID (cached + backend fetch)
  const getToolById = async (id: number): Promise<Tool | undefined> => {
    const cachedTool = tools.find((tool) => tool.id === id);
    if (cachedTool) return cachedTool;

    try {
      const res = await api.get<Tool>(`/tools/${id}`);
      const fetchedTool = { ...res.data, formattedPrice: formatPrice(res.data.price) };

      // Cache it for next time
      setTools((prev) => {
        const exists = prev.some((t) => t.id === fetchedTool.id);
        return exists ? prev : [...prev, fetchedTool];
      });

      return fetchedTool;
    } catch (error: any) {
      console.error("Error fetching tool by ID:", error.message || error);
      return undefined;
    }
  };

  return (
    <ToolContext.Provider
      value={{ tools, addTool, updateTool, deleteTool, getUserTools, getToolById }}
    >
      {children}
    </ToolContext.Provider>
  );
};
