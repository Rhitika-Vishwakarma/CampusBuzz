import React from 'react';
import { Calendar, Clock, MapPin, Users, Star } from 'lucide-react';

const EventCard = ({ event, onRegister, isRegistered = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Workshop: 'bg-blue-100 text-blue-800 border-blue-200',
      Competition: 'bg-red-100 text-red-800 border-red-200',
      Social: 'bg-green-100 text-green-800 border-green-200',
      Meeting: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Conference: 'bg-purple-100 text-purple-800 border-purple-200',
      Sports: 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
      {/* Event Image/Banner */}
      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(
              event.category
            )}`}
          >
            {event.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 bg-white bg-opacity-90 rounded-full px-2 py-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{event.rating}</span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1 line-clamp-2">{event.title}</h3>
          <p className="text-sm opacity-90">by {event.clubName}</p>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6">
        <div className="space-y-3 mb-4">
          {/* Date & Time */}
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {formatDate(event.date)} at {formatTime(event.date)}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>

          {/* Attendees */}
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {event.registeredCount}/{event.maxCapacity} registered
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">Registration</span>
            <span className="text-xs text-gray-500">
              {Math.round((event.registeredCount / event.maxCapacity) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(event.registeredCount / event.maxCapacity) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onRegister(event)}
          disabled={event.registeredCount >= event.maxCapacity}
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
            isRegistered
              ? 'bg-green-100 text-green-800 border border-green-200'
              : event.registeredCount >= event.maxCapacity
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
          }`}
        >
          {isRegistered
            ? '✓ Registered'
            : event.registeredCount >= event.maxCapacity
            ? 'Event Full'
            : 'Register Now'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
