import React from 'react';
import { Link } from 'react-router-dom';
import { Tractor, Search, Plus, Shield, Clock, MapPin, Star } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fadeIn">
            <h1 className="text-responsive-2xl md:text-responsive-3xl font-bold mb-6 animate-slideInLeft">
              Rent Farm Tools <span className="text-green-200">Anywhere</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-green-100 mb-8 max-w-3xl mx-auto animate-slideInRight animate-delay-200">
              Connect with local farmers to rent the tools you need or earn money by renting out your equipment
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn animate-delay-400">
              <Link to="/browse" className="bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-50 transition-all-smooth hover-lift flex items-center justify-center space-x-2 transform hover:scale-105">
                <Search className="h-5 w-5" />
                <span>Find Tools to Rent</span>
              </Link>
              <Link to="/register" className="bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-400 transition-all-smooth hover-lift flex items-center justify-center space-x-2 transform hover:scale-105">
                <Plus className="h-5 w-5" />
                <span>Rent Out Your Tools</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 animate-slideInLeft">
              Why Choose FarmRent?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-slideInRight animate-delay-200">
              The most trusted platform for farming equipment rental
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center p-6 lg:p-8 rounded-lg bg-green-50 hover:bg-green-100 transition-all-smooth hover-lift animate-scaleIn animate-delay-100">
              <div className="bg-green-600 w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-custom">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Secure & Trusted</h3>
              <p className="text-sm lg:text-base text-gray-600">
                All tools are verified and owners are authenticated for your safety
              </p>
            </div>

            <div className="text-center p-6 lg:p-8 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all-smooth hover-lift animate-scaleIn animate-delay-200">
              <div className="bg-blue-600 w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-custom">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Local Network</h3>
              <p className="text-sm lg:text-base text-gray-600">
                Find tools in your area and support local farming communities
              </p>
            </div>

            <div className="text-center p-6 lg:p-8 rounded-lg bg-purple-50 hover:bg-purple-100 transition-all-smooth hover-lift animate-scaleIn animate-delay-300">
              <div className="bg-purple-600 w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-custom">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Quick Booking</h3>
              <p className="text-sm lg:text-base text-gray-600">
                Book tools instantly and get farming faster with our streamlined process
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 animate-slideInLeft">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-gray-600 animate-slideInRight animate-delay-200">
              Simple steps to get started
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Renting Tools */}
            <div className="bg-white rounded-lg p-6 lg:p-8 shadow-sm hover-lift transition-all-smooth animate-slideInLeft animate-delay-100">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Search className="h-6 w-6 text-green-600 mr-2" />
                Renting Tools
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm animate-bounce-custom">1</div>
                  <p className="text-sm lg:text-base text-gray-600">Browse available tools in your area</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm animate-bounce-custom animate-delay-100">2</div>
                  <p className="text-sm lg:text-base text-gray-600">Contact the owner directly</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm animate-bounce-custom animate-delay-200">3</div>
                  <p className="text-sm lg:text-base text-gray-600">Arrange pickup and payment</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm animate-bounce-custom animate-delay-300">4</div>
                  <p className="text-sm lg:text-base text-gray-600">Use the tool and return it</p>
                </div>
              </div>
            </div>

            {/* Renting Out Tools */}
            <div className="bg-white rounded-lg p-6 lg:p-8 shadow-sm hover-lift transition-all-smooth animate-slideInRight animate-delay-200">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Plus className="h-6 w-6 text-blue-600 mr-2" />
                Renting Out Tools
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm animate-bounce-custom">1</div>
                  <p className="text-sm lg:text-base text-gray-600">Create an account and verify your details</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm animate-bounce-custom animate-delay-100">2</div>
                  <p className="text-sm lg:text-base text-gray-600">List your tools with photos and descriptions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm animate-bounce-custom animate-delay-200">3</div>
                  <p className="text-sm lg:text-base text-gray-600">Get contacted by interested renters</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm animate-bounce-custom animate-delay-300">4</div>
                  <p className="text-sm lg:text-base text-gray-600">Earn money from your idle equipment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 animate-fadeIn">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto animate-fadeIn animate-delay-200">
            Join thousands of farmers who are already using FarmRent to save money and earn extra income
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn animate-delay-400">
            <Link to="/register" className="bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-50 transition-all-smooth hover-lift transform hover:scale-105">
              Sign Up Now
            </Link>
            <Link to="/browse" className="bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-400 transition-all-smooth hover-lift border border-green-400 transform hover:scale-105">
              Browse Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;