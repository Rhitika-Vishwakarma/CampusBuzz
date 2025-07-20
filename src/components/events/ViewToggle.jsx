import React from 'react';
import { Grid, Calendar, List, LayoutGrid } from 'lucide-react';

const ViewToggle = ({ currentView = 'grid', onViewChange, className = '' }) => {
  const views = [
    {
      id: 'grid',
      label: 'Grid View',
      icon: LayoutGrid,
      description: 'Card-based layout',
    },
    {
      id: 'list',
      label: 'List View',
      icon: List,
      description: 'Compact list layout',
    },
    {
      id: 'calendar',
      label: 'Calendar View',
      icon: Calendar,
      description: 'Calendar timeline',
    },
  ];

  return (
    <div className={`inline-flex bg-gray-100 rounded-lg p-1 ${className}`}>
      {views.map((view) => {
        const IconComponent = view.icon;
        const isActive = currentView === view.id;

        return (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
            title={view.description}
          >
            <IconComponent className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{view.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// Mini toggle for smaller spaces
export const MiniViewToggle = ({
  currentView = 'grid',
  onViewChange,
  className = '',
}) => {
  const views = [
    { id: 'grid', icon: LayoutGrid },
    { id: 'calendar', icon: Calendar },
  ];

  return (
    <div className={`inline-flex bg-gray-100 rounded-lg p-0.5 ${className}`}>
      {views.map((view) => {
        const IconComponent = view.icon;
        const isActive = currentView === view.id;

        return (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`p-2 rounded-md transition-all duration-200 ${
              isActive
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <IconComponent className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
};

export default ViewToggle;
