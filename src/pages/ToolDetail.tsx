import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Calendar, User, Phone,  Shield } from 'lucide-react';
import { useTool } from '../contexts/ToolContext';

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getToolById } = useTool();
  const tool = getToolById(id || '');

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tool Not Found</h1>
          <p className="text-gray-600 mb-4">The tool you're looking for doesn't exist or has been removed.</p>
          <Link to="/browse" className="text-green-600 hover:text-green-700">
            ← Back to Browse Tools
          </Link>
        </div>
      </div>
    );
  }

  const handleContact = () => {
    window.open(`tel:${tool.ownerPhone}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/browse" className="flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse Tools
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={tool.images[0] || 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                  alt={tool.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              {tool.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {tool.images.slice(1, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${tool.name} ${index + 2}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  tool.condition === 'excellent' ? 'bg-green-100 text-green-800' :
                  tool.condition === 'good' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {tool.condition}
                </span>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{tool.category}</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                  <span>{tool.location}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <DollarSign className="h-5 w-5 mr-3 text-gray-400" />
                  <span className="text-2xl font-bold text-green-600">
                    ${tool.price}
                  </span>
                  <span className="text-gray-600 ml-2">/{tool.priceType}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                  <span className={tool.availability ? 'text-green-600' : 'text-red-600'}>
                    {tool.availability ? 'Available for rent' : 'Currently not available'}
                  </span>
                </div>
              </div>

              <div className="border-t pt-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{tool.description}</p>
              </div>

              {/* Owner Information */}
              <div className="border-t pt-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Owner Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-900">{tool.ownerName}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{tool.ownerPhone}</span>
                  </div>
                </div>
              </div>

              {/* Contact Button */}
              {tool.availability && (
                <div className="border-t pt-6">
                  <button
                    onClick={handleContact}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Contact Owner</span>
                  </button>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Contact the owner to discuss rental terms and pickup arrangements
                  </p>
                </div>
              )}

              {/* Safety Notice */}
              <div className="border-t pt-6 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-900">Safety Tips</h3>
                      <ul className="text-sm text-blue-800 mt-1 space-y-1">
                        <li>• Always inspect the tool before use</li>
                        <li>• Agree on terms and conditions in writing</li>
                        <li>• Use proper safety equipment</li>
                        <li>• Return the tool in the same condition</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;