import React, { useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Users,
} from 'lucide-react';
import Button from '../ui/Button';

const CalendarView = ({
  events = [],
  onEventClick,
  onEventRegister,
  currentUser = null,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState('month'); // month, week, day

  // Convert events to calendar format
  const calendarEvents = useMemo(() => {
    return events.map((event) => ({
      ...event,
      start: new Date(event.date),
      end: new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000), // 2 hours default
      title: event.title,
      resource: event,
    }));
  }, [events]);

  // Get calendar navigation info
  const getCalendarInfo = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    switch (viewType) {
      case 'month':
        return {
          title: currentDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          }),
          period: 'month',
        };
      case 'week':
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return {
          title: `${weekStart.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })} - ${weekEnd.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}`,
          period: 'week',
        };
      case 'day':
        return {
          title: currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
          period: 'day',
        };
      default:
        return { title: '', period: 'month' };
    }
  };

  // Navigation functions
  const navigate = (direction) => {
    const newDate = new Date(currentDate);

    switch (viewType) {
      case 'month':
        newDate.setMonth(currentDate.getMonth() + direction);
        break;
      case 'week':
        newDate.setDate(currentDate.getDate() + direction * 7);
        break;
      case 'day':
        newDate.setDate(currentDate.getDate() + direction);
        break;
    }

    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get events for current view
  const getEventsForView = () => {
    const now = new Date();
    const viewStart = new Date(currentDate);
    const viewEnd = new Date(currentDate);

    switch (viewType) {
      case 'month':
        viewStart.setDate(1);
        viewEnd.setMonth(viewEnd.getMonth() + 1);
        viewEnd.setDate(0);
        break;
      case 'week':
        viewStart.setDate(currentDate.getDate() - currentDate.getDay());
        viewEnd.setDate(viewStart.getDate() + 6);
        break;
      case 'day':
        viewEnd.setDate(currentDate.getDate());
        break;
    }

    return calendarEvents.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate >= viewStart && eventDate <= viewEnd;
    });
  };

  // Generate calendar grid for month view
  const generateMonthGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const dayEvents = calendarEvents.filter(
          (event) => event.start.toDateString() === current.toDateString()
        );

        weekDays.push({
          date: new Date(current),
          events: dayEvents,
          isCurrentMonth: current.getMonth() === month,
          isToday: current.toDateString() === new Date().toDateString(),
        });

        current.setDate(current.getDate() + 1);
      }
      days.push(weekDays);
    }

    return days;
  };

  const calendarInfo = getCalendarInfo();
  const monthGrid = viewType === 'month' ? generateMonthGrid() : [];
  const viewEvents = getEventsForView();

  const getCategoryColor = (category) => {
    const colors = {
      tech: 'bg-blue-500',
      sports: 'bg-green-500',
      arts: 'bg-purple-500',
      academic: 'bg-indigo-500',
      volunteer: 'bg-emerald-500',
      business: 'bg-orange-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Calendar Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Title and Navigation */}
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {calendarInfo.title}
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(-1)}
                icon={<ChevronLeft className="w-4 h-4" />}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(1)}
                icon={<ChevronRight className="w-4 h-4" />}
              />
              <Button variant="secondary" size="sm" onClick={goToToday}>
                Today
              </Button>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-2">
            {['month', 'week', 'day'].map((view) => (
              <Button
                key={view}
                variant={viewType === view ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewType(view)}
                className="capitalize"
              >
                {view}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Body */}
      <div className="p-6">
        {viewType === 'month' && (
          <div className="grid grid-cols-7 gap-0">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="p-3 text-center text-sm font-medium text-gray-500 border-b border-gray-200"
              >
                {day}
              </div>
            ))}

            {/* Calendar Grid */}
            {monthGrid.map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`min-h-[120px] p-2 border-r border-b border-gray-200 ${
                    !day.isCurrentMonth ? 'bg-gray-50' : 'bg-white'
                  } ${day.isToday ? 'bg-blue-50' : ''}`}
                >
                  <div
                    className={`text-sm font-medium mb-2 ${
                      day.isToday
                        ? 'text-blue-600'
                        : day.isCurrentMonth
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    }`}
                  >
                    {day.date.getDate()}
                  </div>

                  <div className="space-y-1">
                    {day.events.slice(0, 2).map((event) => (
                      <button
                        key={event.id}
                        onClick={() => onEventClick(event)}
                        className={`w-full text-left p-1 rounded text-xs text-white truncate transition-all duration-200 hover:shadow-md ${getCategoryColor(
                          event.category
                        )}`}
                        title={event.title}
                      >
                        {event.title}
                      </button>
                    ))}
                    {day.events.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{day.events.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {(viewType === 'week' || viewType === 'day') && (
          <div className="space-y-4">
            {viewEvents.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No events scheduled for this {viewType}</p>
              </div>
            ) : (
              viewEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => onEventClick(event)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-3 h-3 rounded-full ${getCategoryColor(
                            event.category
                          )}`}
                        ></div>
                        <h3 className="font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {event.category}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.start.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.registeredCount}/{event.maxCapacity}
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm">
                        {event.description}
                      </p>
                    </div>

                    <Button
                      variant={event.isRegistered ? 'success' : 'primary'}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventRegister(event);
                      }}
                      disabled={event.registeredCount >= event.maxCapacity}
                    >
                      {event.isRegistered ? 'Registered' : 'Register'}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
