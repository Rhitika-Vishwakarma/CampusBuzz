import React, { useState } from 'react';
import {
  Users,
  Crown,
  Star,
  Calendar,
  MapPin,
  ExternalLink,
  Settings,
  Bell,
  BellOff,
} from 'lucide-react';
import Button from '../ui/Button';

const ClubsList = ({
  userClubs = [],
  onViewClub,
  onLeaveClub,
  isOwner = true,
}) => {
  const [filter, setFilter] = useState('all'); // all, member, admin, founder

  const getRoleColor = (role) => {
    const colors = {
      founder: 'bg-purple-100 text-purple-800 border-purple-200',
      admin: 'bg-red-100 text-red-800 border-red-200',
      moderator: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      member: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return colors[role?.toLowerCase()] || colors.member;
  };

  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case 'founder':
        return Crown;
      case 'admin':
      case 'moderator':
        return Settings;
      default:
        return Users;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Academic: 'bg-blue-50 text-blue-700',
      Sports: 'bg-green-50 text-green-700',
      Arts: 'bg-purple-50 text-purple-700',
      Technology: 'bg-indigo-50 text-indigo-700',
      Social: 'bg-pink-50 text-pink-700',
      Professional: 'bg-orange-50 text-orange-700',
      Cultural: 'bg-yellow-50 text-yellow-700',
    };
    return colors[category] || 'bg-gray-50 text-gray-700';
  };

  const filteredClubs = userClubs.filter((club) => {
    if (filter === 'all') return true;
    if (filter === 'admin')
      return ['founder', 'admin', 'moderator'].includes(
        club.role?.toLowerCase()
      );
    return club.role?.toLowerCase() === filter;
  });

  const filterCounts = {
    all: userClubs.length,
    member: userClubs.filter((c) => c.role?.toLowerCase() === 'member').length,
    admin: userClubs.filter((c) =>
      ['founder', 'admin', 'moderator'].includes(c.role?.toLowerCase())
    ).length,
    founder: userClubs.filter((c) => c.role?.toLowerCase() === 'founder')
      .length,
  };

  if (userClubs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Clubs</h2>
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No clubs joined yet
          </h3>
          <p className="text-gray-600 mb-4">
            Join clubs to connect with like-minded students and participate in
            events.
          </p>
          <Button variant="primary">Explore Clubs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          My Clubs ({userClubs.length})
        </h2>
        {isOwner && (
          <Button variant="secondary" size="sm">
            Find More Clubs
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'all', label: 'All', count: filterCounts.all },
          { key: 'member', label: 'Member', count: filterCounts.member },
          { key: 'admin', label: 'Admin', count: filterCounts.admin },
          { key: 'founder', label: 'Founder', count: filterCounts.founder },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === tab.key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span
                className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  filter === tab.key
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClubs.map((club, index) => {
          const RoleIcon = getRoleIcon(club.role);

          return (
            <div
              key={club.id || index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 group"
            >
              {/* Club Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {club.logo ? (
                    <img
                      src={club.logo}
                      alt={club.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {club.name?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {club.name}
                    </h3>
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getRoleColor(
                        club.role
                      )}`}
                    >
                      <RoleIcon className="w-3 h-3" />
                      {club.role || 'Member'}
                    </div>
                  </div>
                </div>

                {isOwner && (
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700">
                      <Bell className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Club Info */}
              <div className="space-y-2 mb-4">
                <div
                  className={`inline-block px-2 py-1 rounded-full text-xs ${getCategoryColor(
                    club.category
                  )}`}
                >
                  {club.category || 'General'}
                </div>

                {club.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {club.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {club.memberCount || 0} members
                  </div>
                  {club.upcomingEvents && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {club.upcomingEvents} events
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => onViewClub?.(club)}
                >
                  View Club
                </Button>
                {isOwner &&
                  ['founder', 'admin'].includes(club.role?.toLowerCase()) && (
                    <Button variant="primary" size="sm">
                      Manage
                    </Button>
                  )}
              </div>

              {/* Recent Activity Indicator */}
              {club.lastActivity && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Active {club.lastActivity}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredClubs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p>No clubs found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default ClubsList;
