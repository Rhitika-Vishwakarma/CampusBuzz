import React from 'react';
import {
  TrendingUp,
  Calendar,
  Users,
  Award,
  Star,
  Trophy,
  Target,
  Clock,
} from 'lucide-react';

const ProfileStats = ({ user, stats }) => {
  if (!user) return null;

  // Mock stats if not provided
  const userStats = stats || {
    eventsAttended: user.eventsAttended || 0,
    eventsHosted: user.eventsHosted || 0,
    clubsJoined: user.clubs?.length || 0,
    achievements: user.achievements?.length || 0,
    totalPoints: user.points || 0,
    streak: user.streak || 0,
    rank: user.rank || 'Newcomer',
    upcomingEvents: user.upcomingEvents || 0,
  };

  const statCards = [
    {
      icon: Calendar,
      label: 'Events Attended',
      value: userStats.eventsAttended,
      color: 'blue',
      description: 'Total events participated',
    },
    {
      icon: Users,
      label: 'Clubs Joined',
      value: userStats.clubsJoined,
      color: 'green',
      description: 'Active memberships',
    },
    {
      icon: Award,
      label: 'Achievements',
      value: userStats.achievements,
      color: 'purple',
      description: 'Badges earned',
    },
    {
      icon: Star,
      label: 'Total Points',
      value: userStats.totalPoints,
      color: 'yellow',
      description: 'Activity points earned',
    },
    {
      icon: Trophy,
      label: 'Events Hosted',
      value: userStats.eventsHosted,
      color: 'red',
      description: 'Events organized',
    },
    {
      icon: Target,
      label: 'Current Streak',
      value: `${userStats.streak} days`,
      color: 'indigo',
      description: 'Active participation streak',
    },
    {
      icon: Clock,
      label: 'Upcoming Events',
      value: userStats.upcomingEvents,
      color: 'pink',
      description: 'Registered for events',
    },
    {
      icon: TrendingUp,
      label: 'Current Rank',
      value: userStats.rank,
      color: 'orange',
      description: 'Campus activity level',
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        text: 'text-blue-800',
        border: 'border-blue-200',
      },
      green: {
        bg: 'bg-green-50',
        icon: 'text-green-600',
        text: 'text-green-800',
        border: 'border-green-200',
      },
      purple: {
        bg: 'bg-purple-50',
        icon: 'text-purple-600',
        text: 'text-purple-800',
        border: 'border-purple-200',
      },
      yellow: {
        bg: 'bg-yellow-50',
        icon: 'text-yellow-600',
        text: 'text-yellow-800',
        border: 'border-yellow-200',
      },
      red: {
        bg: 'bg-red-50',
        icon: 'text-red-600',
        text: 'text-red-800',
        border: 'border-red-200',
      },
      indigo: {
        bg: 'bg-indigo-50',
        icon: 'text-indigo-600',
        text: 'text-indigo-800',
        border: 'border-indigo-200',
      },
      pink: {
        bg: 'bg-pink-50',
        icon: 'text-pink-600',
        text: 'text-pink-800',
        border: 'border-pink-200',
      },
      orange: {
        bg: 'bg-orange-50',
        icon: 'text-orange-600',
        text: 'text-orange-800',
        border: 'border-orange-200',
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Activity Statistics
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <TrendingUp className="w-4 h-4" />
          Updated recently
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const colors = getColorClasses(stat.color);
          const IconComponent = stat.icon;

          return (
            <div
              key={index}
              className={`${colors.bg} ${colors.border} border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`p-2 ${colors.bg} rounded-lg group-hover:scale-110 transition-transform duration-200`}
                >
                  <IconComponent className={`w-5 h-5 ${colors.icon}`} />
                </div>
              </div>

              <div className="space-y-1">
                <div className={`text-2xl font-bold ${colors.text}`}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500">{stat.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Progress Overview
        </h3>

        <div className="space-y-4">
          {/* Activity Level Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Activity Level
              </span>
              <span className="text-sm text-gray-600">
                {Math.min(userStats.totalPoints, 1000)}/1000 points to next
                level
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    (userStats.totalPoints / 1000) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Monthly Goals */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Monthly Events Goal
              </span>
              <span className="text-sm text-gray-600">
                {Math.min(userStats.eventsAttended, 10)}/10 events
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    (userStats.eventsAttended / 10) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
