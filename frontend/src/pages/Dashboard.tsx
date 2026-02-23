import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Plus, Trash2, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTool } from '../contexts/ToolContext';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { getUserTools, deleteTool } = useTool();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const userTools = user?.id ? getUserTools(Number(user.id)) : [];
  const totalEarnings = userTools.reduce((sum, tool) => sum + tool.price, 0);

  const handleDeleteTool = (toolId: number) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      deleteTool(toolId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600">Total Tools</p>
            <p className="text-2xl font-bold text-gray-900">{userTools.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600">Available Tools</p>
            <p className="text-2xl font-bold text-gray-900">
              {userTools.filter(tool => tool.availability).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600">Total Earnings</p>
            <p className="text-2xl font-bold text-gray-900">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(totalEarnings)}
            </p>
          </div>
        </div>

        {/* Tools Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Your Tools</h2>
            <Link
              to="/add-tool"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Tool</span>
            </Link>
          </div>

          <div className="p-6">
            {userTools.length === 0 ? (
              <div className="text-center py-8">
                <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tools listed yet</h3>
                <p className="text-gray-600 mb-4">Start earning by listing your first farming tool</p>
                <Link
                  to="/add-tool"
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Your First Tool
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-[16/9]">
                      <img
                        src={
                          tool.images[0] ||
                          "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg"
                        }
                        alt={tool.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{tool.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">

                        <span>{tool.formattedPrice}/{tool.priceType}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className={tool.availability ? "text-green-600" : "text-red-600"}>
                          {tool.availability ? "Available" : "Not Available"}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          to={`/tool/${tool.id}`}
                          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-center text-sm"
                        >
                          View
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteTool(tool.id!)}
                          className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
