import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tractor, User, LogOut, Plus, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 animate-fadeIn">
          <Link to="/" className="flex items-center space-x-2 hover-scale transition-transform-smooth">
            <Tractor className="h-8 w-8 text-green-600" />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">FarmRent</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-all-smooth hover-lift">
              <Search className="h-4 w-4" />
              <span>Browse Tools</span>
            </Link>
            {isAuthenticated && (
              <Link to="/add-tool" className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-all-smooth hover-lift">
                <Plus className="h-4 w-4" />
                <span>Add Tool</span>
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link to="/dashboard" className="flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-green-600 transition-all-smooth hover-lift">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-all-smooth hover-lift"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-green-600 transition-all-smooth hover-lift">
                  Login
                </Link>
                <Link to="/register" className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-green-700 transition-all-smooth hover-lift transform hover:scale-105">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;