import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { MapPin, Calendar, Pencil } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTool, type Tool } from "../contexts/ToolContext";

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const { getToolById } = useTool();

  const [tool, setTool] = useState<Tool | null>(null);

  useEffect(() => {
    const fetchTool = async () => {
      if (id) {
        const data = await getToolById(Number(id)); // ✅ await the Promise
        setTool(data || null);
      }
    };
    fetchTool();
  }, [id, getToolById]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Tool not found</p>
        <Link
          to="/dashboard"
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // 🔹 Check if logged-in user is the owner
  const isOwner = user?.id === tool.owner?.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <img
            src={
              tool.images[0] ||
              "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg"
            }
            alt={tool.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{tool.name}</h1>
            <p className="text-gray-700 mb-4">{tool.description}</p>

            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{tool.location}</span>
            </div>

            {/* INR price formatting */}
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span>{tool.formattedPrice}/{tool.priceType}</span>
            </div>

            {/* 🔹 Owner Info */}
            {tool.owner && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <span className="font-medium">Owner:</span>&nbsp;
                <span>{tool.owner.name}{tool.owner.phone ? ` (${tool.owner.phone})` : ""}</span>
              </div>
            )}

            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span className={tool.availability ? "text-green-600" : "text-red-600"}>
                {tool.availability ? "Available" : "Not Available"}
              </span>
            </div>

            <div className="flex space-x-4">
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </Link>
              <Link
                to="/browse-tools"
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Back to Browse Tools
              </Link>
              {isOwner && (
                <Link
                  to={`/edit-tool/${tool.id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors flex items-center space-x-2"
                >
                  <Pencil className="h-4 w-4" />
                  <span>Edit Tool</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;
