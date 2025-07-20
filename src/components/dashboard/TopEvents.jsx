import React, { useContext } from 'react';
import { Calendar, MapPin, Users, Clock, ArrowRight, Star } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';

const TopEvents = () => {
  const { events, registerForEvent, user } = useAppContext();

  // Get featured events (trending, popular, or upcoming)
  const featuredEvents = events
    .filter((event) => event.featured || event.category === 'Featured')
    .slice(0, 4);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en', { month: 'short' }),
      time: date.toLocaleTimeString('en', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  const getStatusBadge = (event) => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const isRegistered = event.registeredUsers?.includes(user?.id);

    if (isRegistered) {
      return <Badge variant="success">Registered</Badge>;
    }

    if (eventDate < now) {
      return <Badge variant="secondary">Past Event</Badge>;
    }

    if (event.registeredUsers?.length >= event.maxParticipants) {
      return <Badge variant="danger">Full</Badge>;
    }

    return <Badge variant="primary">Open</Badge>;
  };

  const handleRegister = (eventId) => {
    registerForEvent(eventId);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Events</h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors">
          View All Events
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {featuredEvents.map((event, index) => {
          const dateInfo = formatDate(event.date);
          const isRegistered = event.registeredUsers?.includes(user?.id);
          const isFull = event.registeredUsers?.length >= event.maxParticipants;

          return (
            <Card
              key={event.id}
              className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Event Image/Date */}
                <div className="flex-shrink-0">
                  <div className="lg:w-24 lg:h-full w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-l-lg flex flex-col items-center justify-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="relative z-10 text-center">
                      <div className="text-2xl font-bold">{dateInfo.day}</div>
                      <div className="text-sm opacity-90">{dateInfo.month}</div>
                    </div>
                  </div>
                </div>

                {/* Event Content */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {event.featured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                          {getStatusBadge(event)}
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{dateInfo.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>
                            {event.registeredUsers?.length || 0}/
                            {event.maxParticipants}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {event.category}
                          </span>
                        </div>
                      </div>

                      {/* Organizer */}
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <span>Organized by</span>
                        <span className="font-medium text-gray-900">
                          {event.organizer}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <Button
                        onClick={() => handleRegister(event.id)}
                        disabled={isFull && !isRegistered}
                        variant={isRegistered ? 'secondary' : 'primary'}
                        className="min-w-[120px]"
                      >
                        {isRegistered
                          ? 'Registered ✓'
                          : isFull
                          ? 'Full'
                          : 'Register'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* View More Button */}
      <div className="text-center mt-6">
        <Button variant="outline" className="w-full lg:w-auto">
          <Calendar className="h-4 w-4 mr-2" />
          View Event Calendar
        </Button>
      </div>
    </div>
  );
};

export default TopEvents;
