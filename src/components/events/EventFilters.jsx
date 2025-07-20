import React, { useState } from 'react';
import { Search, Filter, X, Calendar, Users, MapPin } from 'lucide-react';
import Button from '../ui/Button';

const EventFilters = ({
  onFilterChange,
  onSearchChange,
  activeFilters = {
    category: 'all',
    date: 'all',
    club: 'all',
    registered: false,
  },
  searchQuery = '',
  clubs = [],
  totalEvents = 0,
  filteredCount = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(activeFilters);

  // Event categories based on your mock data
  const categories = [
    { value: 'all', label: 'All Categories', icon: '🎯', count: totalEvents },
    { value: 'tech', label: 'Technology', icon: '💻', count: 3 },
    { value: 'sports', label: 'Sports', icon: '⚽', count: 1 },
    { value: 'arts', label: 'Arts & Culture', icon: '🎭', count: 2 },
    { value: 'academic', label: 'Academic', icon: '📚', count: 1 },
    { value: 'volunteer', label: 'Volunteer', icon: '🤝', count: 1 },
    { value: 'business', label: 'Business', icon: '💼', count: 1 },
  ];

  const dateFilters = [
    { value: 'all', label: 'All Time', icon: Calendar },
    { value: 'today', label: 'Today', icon: Calendar },
    { value: 'week', label: 'This Week', icon: Calendar },
    { value: 'month', label: 'This Month', icon: Calendar },
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...localFilters, [filterType]: value };
    setLocalFilters(newFilters);
    // onFilterChange(newFilters);
  };

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const clearAllFilters = () => {
    const resetFilters = {
      category: 'all',
      date: 'all',
      club: 'all',
      registered: false,
    };
    setLocalFilters(resetFilters);
    // onFilterChange(resetFilters);
    onSearchChange('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.category !== 'all') count++;
    if (localFilters.date !== 'all') count++;
    if (localFilters.club !== 'all') count++;
    if (localFilters.registered) count++;
    if (searchQuery.trim()) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      {/* Header with Search and Filter Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events, clubs, or descriptions..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Toggle and Results */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-blue-600">{filteredCount}</span>{' '}
            of {totalEvents} events
          </div>

          <Button
            variant={isExpanded ? 'primary' : 'outline'}
            onClick={() => setIsExpanded(!isExpanded)}
            icon={<Filter className="w-4 h-4" />}
            className="relative"
          >
            Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.slice(0, 5).map((category) => (
          <button
            key={category.value}
            onClick={() => handleFilterChange('category', category.value)}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              localFilters.category === category.value
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-1">{category.icon}</span>
            {category.label}
            <span className="ml-1.5 text-xs opacity-75">
              ({category.count})
            </span>
          </button>
        ))}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-gray-100 pt-4 space-y-6">
          {/* Date Filters */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {dateFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => handleFilterChange('date', filter.value)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    localFilters.date === filter.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <filter.icon className="w-4 h-4 mx-auto mb-1" />
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Club Filters */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Club
            </h4>
            <select
              value={localFilters.club}
              onChange={(e) => handleFilterChange('club', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Clubs</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.name}
                </option>
              ))}
            </select>
          </div>

          {/* Special Filters */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Special Filters
            </h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.registered}
                  onChange={(e) =>
                    handleFilterChange('registered', e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Only show my registered events
                </span>
              </label>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              disabled={activeFiltersCount === 0}
              className="text-gray-600"
            >
              Clear all filters
            </Button>

            <Button variant="secondary" onClick={() => setIsExpanded(false)}>
              Done
            </Button>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && !isExpanded && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
          {localFilters.category !== 'all' && (
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs">
              Category:{' '}
              {categories.find((c) => c.value === localFilters.category)?.label}
              <button
                onClick={() => handleFilterChange('category', 'all')}
                className="ml-1 hover:text-blue-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {localFilters.date !== 'all' && (
            <div className="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
              Date:{' '}
              {dateFilters.find((d) => d.value === localFilters.date)?.label}
              <button
                onClick={() => handleFilterChange('date', 'all')}
                className="ml-1 hover:text-green-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {localFilters.registered && (
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs">
              My Events Only
              <button
                onClick={() => handleFilterChange('registered', false)}
                className="ml-1 hover:text-purple-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {searchQuery && (
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs">
              Search: "{searchQuery}"
              <button
                onClick={() => onSearchChange('')}
                className="ml-1 hover:text-yellow-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventFilters;
