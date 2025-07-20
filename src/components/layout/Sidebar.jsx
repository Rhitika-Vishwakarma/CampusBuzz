import React from 'react';
import {
  Home,
  Calendar,
  Users,
  User,
  Trophy,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose, currentPage, onNavigate }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Calendar, label: 'Events', path: '/events', badge: 5 },
    // { icon: Users, label: 'Clubs', path: '/clubs', badge: 12 },
    { icon: User, label: 'Profile', path: '/profile' },
    // { icon: Trophy, label: 'Achievements', path: '/achievements', badge: 'NEW' },
  ];

  return (
    <div
      className={`
        fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        ${collapsed ? 'w-16' : 'w-64'} 
        lg:translate-x-0 lg:static lg:transform-none
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CB</span>
            </div>
            <span className="font-bold text-gray-900">CampusBuzz</span>
          </div>
        )}

        {/* Collapse button (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 hidden lg:block"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>

        {/* Close sidebar (mobile only) */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive =
            currentPage?.toLowerCase() === item.label.toLowerCase();
          return (
            <button
              key={index}
              onClick={() => {
                onNavigate(item.label.toLowerCase());
                navigate(item.path);
                onClose(); // Close on mobile
              }}
              className={`
                group w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }
                ${collapsed ? 'justify-center' : 'justify-between'}
              `}
            >
              <div className="flex items-center">
                <item.icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
                {!collapsed && <span>{item.label}</span>}
              </div>
              {!collapsed && item.badge && (
                <span
                  className={`
                    px-2 py-0.5 text-xs font-medium rounded-full
                    ${
                      isActive
                        ? 'bg-white bg-opacity-20 text-white'
                        : item.badge === 'NEW'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }
                  `}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      {!collapsed && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">User</p>
              <p className="text-xs text-gray-500 truncate">Computer Science</p>
            </div>
          </div>
          <div className="mt-3 flex space-x-1">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                style={{ width: '75%' }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 ml-2">Level 3</span>
          </div>
        </div>
      )}

      {collapsed && (
        <div className="border-t border-gray-200 p-3 flex justify-center">
          <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">U</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
