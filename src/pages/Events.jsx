import React, { useState, useMemo } from 'react';
import { Calendar, Search, Filter, Grid, List, Plus } from 'lucide-react';
import EventCard from '../components/events/EventCard';
import CalendarView from '../components/events/CalendarView';
import EventFilters from '../components/events/EventFilters';
import EventRegistration from '../components/events/EventRegistration';
import ViewToggle from '../components/events/ViewToggle';
import Button from '../components/ui/Button';

const Events = ({ events = [], currentUser, onRegister, onUnregister }) => {
  const [view, setView] = useState('grid'); // grid, list, calendar
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);

  // Filter events based on search and filters
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || event.category === selectedCategory;

      let matchesDate = true;
      if (selectedDate !== 'all') {
        const eventDate = new Date(event.date);
        const today = new Date();

        switch (selectedDate) {
          case 'today':
            matchesDate = eventDate.toDateString() === today.toDateString();
            break;
          case 'week':
            const weekFromNow = new Date(
              today.getTime() + 7 * 24 * 60 * 60 * 1000
            );
            matchesDate = eventDate >= today && eventDate <= weekFromNow;
            break;
          case 'month':
            const monthFromNow = new Date(
              today.getFullYear(),
              today.getMonth() + 1,
              today.getDate()
            );
            matchesDate = eventDate >= today && eventDate <= monthFromNow;
            break;
          default:
            matchesDate = true;
        }
      }

      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [events, searchTerm, selectedCategory, selectedDate]);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(events.map((event) => event.category))];
    return cats;
  }, [events]);

  // Get upcoming events count
  const upcomingCount = events.filter(
    (event) => new Date(event.date) >= new Date()
  ).length;
  const registeredCount = events.filter((event) => event.isRegistered).length;

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowRegistration(true);
  };

  const handleRegister = (eventId) => {
    onRegister(eventId);
    // Update the selected event if it's the one being registered for
    if (selectedEvent && selectedEvent.id === eventId) {
      setSelectedEvent({ ...selectedEvent, isRegistered: true });
    }
  };

  const handleUnregister = (eventId) => {
    onUnregister(eventId);
    // Update the selected event if it's the one being unregistered from
    if (selectedEvent && selectedEvent.id === eventId) {
      setSelectedEvent({ ...selectedEvent, isRegistered: false });
    }
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => handleEventClick(event)}
          onRegister={handleRegister}
          onUnregister={handleUnregister}
        />
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {filteredEvents.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <EventCard
            event={event}
            variant="horizontal"
            onClick={() => handleEventClick(event)}
            onRegister={handleRegister}
            onUnregister={handleUnregister}
          />
        </div>
      ))}
    </div>
  );

  const renderCalendarView = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <CalendarView events={filteredEvents} onEventClick={handleEventClick} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Events</h1>
                <p className="text-gray-600 mt-1">
                  Discover and join campus events
                </p>
              </div>
              <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
                Create Event
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-blue-600" />
                  <div className="ml-3">
                    <div className="text-2xl font-bold text-blue-900">
                      {upcomingCount}
                    </div>
                    <div className="text-sm text-blue-700">Upcoming Events</div>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <div className="ml-3">
                    <div className="text-2xl font-bold text-green-900">
                      {registeredCount}
                    </div>
                    <div className="text-sm text-green-700">My Events</div>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">#</span>
                  </div>
                  <div className="ml-3">
                    <div className="text-2xl font-bold text-purple-900">
                      {categories.length - 1}
                    </div>
                    <div className="text-sm text-purple-700">Categories</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    showFilters
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>

                <ViewToggle view={view} onViewChange={setView} />
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4">
                <EventFilters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  selectedDate={selectedDate}
                  onCategoryChange={setSelectedCategory}
                  onDateChange={setSelectedDate}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            {view === 'grid' && renderGridView()}
            {view === 'list' && renderListView()}
            {view === 'calendar' && renderCalendarView()}
          </>
        )}
      </div>

      {/* Event Registration Modal */}
      <EventRegistration
        event={selectedEvent}
        isOpen={showRegistration}
        onClose={() => {
          setShowRegistration(false);
          setSelectedEvent(null);
        }}
        onRegister={handleRegister}
        onUnregister={handleUnregister}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Events;
