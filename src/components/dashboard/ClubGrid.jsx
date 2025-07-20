import React, { useContext } from 'react';
import { Users, Calendar, MapPin, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { useAppContext } from '../../context/AppContext';

const ClubGrid = () => {
  const { clubs } = useAppContext();

  const getClubIcon = (category) => {
    const icons = {
      Technical: '💻',
      Sports: '⚽',
      Arts: '🎨',
      Cultural: '🎭',
      Academic: '📚',
      Social: '🤝',
    };
    return icons[category] || '🏛️';
  };

  const getRandomGradient = (index) => {
    const gradients = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-green-400 to-green-600',
      'from-orange-400 to-orange-600',
      'from-pink-400 to-pink-600',
      'from-indigo-400 to-indigo-600',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Clubs</h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors">
          View All
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.slice(0, 6).map((club, index) => (
          <Card
            key={club.id}
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Club Header with Gradient */}
            <div
              className={`h-24 bg-gradient-to-r ${getRandomGradient(
                index
              )} rounded-t-lg relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute top-4 left-4">
                <span className="text-3xl">{getClubIcon(club.category)}</span>
              </div>
              <div className="absolute top-4 right-4">
                <Badge
                  variant={club.isJoined ? 'success' : 'secondary'}
                  className="text-xs"
                >
                  {club.isJoined ? 'Joined' : 'Available'}
                </Badge>
              </div>
            </div>

            {/* Club Content */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {club.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {club.description}
                </p>
              </div>

              {/* Club Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{club.memberCount} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{club.eventsCount} events</span>
                </div>
              </div>

              {/* Next Event */}
              {club.nextEvent && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">Next Event</p>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {club.nextEvent.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{club.nextEvent.date}</span>
                    <MapPin className="h-3 w-3 ml-2" />
                    <span>{club.nextEvent.location}</span>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                  club.isJoined
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                }`}
              >
                {club.isJoined ? 'View Club' : 'Join Club'}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClubGrid;
