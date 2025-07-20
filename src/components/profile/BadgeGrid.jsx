import React, { useState } from 'react';
import {
  Award,
  Star,
  Trophy,
  Target,
  Crown,
  Calendar,
  Users,
  Zap,
  Heart,
  BookOpen,
  Flame,
  Lock,
} from 'lucide-react';

const BadgeGrid = ({ userAchievements = [], allBadges = [] }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [filter, setFilter] = useState('all'); // all, earned, locked

  // Default badges if none provided
  const defaultBadges = [
    {
      id: 'first-event',
      name: 'First Steps',
      description: 'Attended your first event',
      icon: 'Calendar',
      color: 'blue',
      rarity: 'common',
      points: 10,
      category: 'participation',
    },
    {
      id: 'early-bird',
      name: 'Early Bird',
      description: 'Registered for 5 events in advance',
      icon: 'Zap',
      color: 'yellow',
      rarity: 'uncommon',
      points: 25,
      category: 'participation',
    },
    {
      id: 'social-butterfly',
      name: 'Social Butterfly',
      description: 'Joined 5 different clubs',
      icon: 'Heart',
      color: 'pink',
      rarity: 'rare',
      points: 50,
      category: 'social',
    },
    {
      id: 'event-master',
      name: 'Event Master',
      description: 'Attended 50 events',
      icon: 'Trophy',
      color: 'gold',
      rarity: 'epic',
      points: 100,
      category: 'participation',
    },
    {
      id: 'club-founder',
      name: 'Club Founder',
      description: 'Founded a student club',
      icon: 'Crown',
      color: 'purple',
      rarity: 'legendary',
      points: 200,
      category: 'leadership',
    },
    {
      id: 'scholar',
      name: 'Scholar',
      description: 'Attended 10 academic events',
      icon: 'BookOpen',
      color: 'indigo',
      rarity: 'uncommon',
      points: 30,
      category: 'academic',
    },
    {
      id: 'networking-pro',
      name: 'Networking Pro',
      description: 'Connected with 25+ students',
      icon: 'Users',
      color: 'green',
      rarity: 'rare',
      points: 40,
      category: 'social',
    },
    {
      id: 'streak-master',
      name: 'Streak Master',
      description: 'Attended events 7 days in a row',
      icon: 'Flame',
      color: 'red',
      rarity: 'epic',
      points: 75,
      category: 'dedication',
    },
    {
      id: 'perfectionist',
      name: 'Perfectionist',
      description: 'Completed all workshop assignments',
      icon: 'Target',
      color: 'emerald',
      rarity: 'rare',
      points: 60,
      category: 'academic',
    },
    {
      id: 'rising-star',
      name: 'Rising Star',
      description: 'Received 5+ event ratings of 5 stars',
      icon: 'Star',
      color: 'amber',
      rarity: 'legendary',
      points: 150,
      category: 'recognition',
    },
  ];

  const badges = allBadges.length > 0 ? allBadges : defaultBadges;

  // Get icon component by name
  const getIconComponent = (iconName) => {
    const icons = {
      Award,
      Star,
      Trophy,
      Target,
      Crown,
      Calendar,
      Users,
      Zap,
      Heart,
      BookOpen,
      Flame,
      Lock,
    };
    return icons[iconName] || Award;
  };

  // Check if badge is earned
  const isBadgeEarned = (badgeId) => {
    return userAchievements.some(
      (achievement) => achievement.badgeId === badgeId
    );
  };

  // Get rarity colors
  const getRarityColors = (rarity, earned = false) => {
    if (!earned) return 'bg-gray-100 text-gray-400 border-gray-200';

    const colors = {
      common: 'bg-gray-50 text-gray-700 border-gray-300',
      uncommon: 'bg-green-50 text-green-700 border-green-300',
      rare: 'bg-blue-50 text-blue-700 border-blue-300',
      epic: 'bg-purple-50 text-purple-700 border-purple-300',
      legendary: 'bg-yellow-50 text-yellow-700 border-yellow-300',
    };
    return colors[rarity] || colors.common;
  };

  // Get badge color
  const getBadgeColor = (color, earned = false) => {
    if (!earned) return 'text-gray-400';

    const colors = {
      blue: 'text-blue-500',
      yellow: 'text-yellow-500',
      pink: 'text-pink-500',
      gold: 'text-yellow-600',
      purple: 'text-purple-500',
      indigo: 'text-indigo-500',
      green: 'text-green-500',
      red: 'text-red-500',
      emerald: 'text-emerald-500',
      amber: 'text-amber-500',
    };
    return colors[color] || colors.blue;
  };

  // Filter badges
  const filteredBadges = badges.filter((badge) => {
    const earned = isBadgeEarned(badge.id);
    if (filter === 'earned') return earned;
    if (filter === 'locked') return !earned;
    return true;
  });

  const earnedCount = badges.filter((badge) => isBadgeEarned(badge.id)).length;
  const totalCount = badges.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
          <p className="text-sm text-gray-600">
            {earnedCount} of {totalCount} badges earned
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-3">
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(earnedCount / totalCount) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {Math.round((earnedCount / totalCount) * 100)}%
          </span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All ({totalCount})
        </button>
        <button
          onClick={() => setFilter('earned')}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            filter === 'earned'
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Earned ({earnedCount})
        </button>
        <button
          onClick={() => setFilter('locked')}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            filter === 'locked'
              ? 'bg-gray-200 text-gray-700 border border-gray-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Locked ({totalCount - earnedCount})
        </button>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBadges.map((badge) => {
          const earned = isBadgeEarned(badge.id);
          const IconComponent = getIconComponent(badge.icon);

          return (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer transform hover:scale-105 ${getRarityColors(
                badge.rarity,
                earned
              )} ${earned ? 'hover:shadow-lg' : 'hover:shadow-md'}`}
            >
              {/* Lock Icon for Unearned Badges */}
              {!earned && (
                <div className="absolute top-2 right-2">
                  <Lock size={16} className="text-gray-400" />
                </div>
              )}

              {/* Badge Icon */}
              <div className="flex justify-center mb-3">
                <div
                  className={`p-3 rounded-full ${
                    earned ? 'bg-white shadow-sm' : 'bg-gray-200'
                  }`}
                >
                  <IconComponent
                    size={24}
                    className={getBadgeColor(badge.color, earned)}
                  />
                </div>
              </div>

              {/* Badge Info */}
              <div className="text-center">
                <h4
                  className={`font-semibold text-sm mb-1 ${
                    earned ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {badge.name}
                </h4>
                <p
                  className={`text-xs ${
                    earned ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  {badge.points} points
                </p>
              </div>

              {/* Rarity Indicator */}
              <div className="flex justify-center mt-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                    earned
                      ? `bg-${badge.color}-100 text-${badge.color}-700`
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {badge.rarity}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredBadges.length === 0 && (
        <div className="text-center py-12">
          <Award size={48} className="mx-auto text-gray-400 mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            {filter === 'earned' ? 'No badges earned yet' : 'No locked badges'}
          </h4>
          <p className="text-gray-600">
            {filter === 'earned'
              ? 'Start attending events and joining clubs to earn your first badge!'
              : "You've unlocked all available badges! Great job!"}
          </p>
        </div>
      )}

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="text-center">
              {/* Badge Icon */}
              <div className="flex justify-center mb-4">
                <div
                  className={`p-6 rounded-full ${
                    isBadgeEarned(selectedBadge.id)
                      ? 'bg-gray-50'
                      : 'bg-gray-100'
                  }`}
                >
                  {React.createElement(getIconComponent(selectedBadge.icon), {
                    size: 48,
                    className: getBadgeColor(
                      selectedBadge.color,
                      isBadgeEarned(selectedBadge.id)
                    ),
                  })}
                </div>
              </div>

              {/* Badge Details */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedBadge.name}
              </h3>
              <p className="text-gray-600 mb-4">{selectedBadge.description}</p>

              {/* Badge Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedBadge.points}
                  </div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 capitalize">
                    {selectedBadge.rarity}
                  </div>
                  <div className="text-sm text-gray-600">Rarity</div>
                </div>
              </div>

              {/* Status */}
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full mb-4 ${
                  isBadgeEarned(selectedBadge.id)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {isBadgeEarned(selectedBadge.id) ? (
                  <>
                    <Trophy size={16} className="mr-2" />
                    Earned
                  </>
                ) : (
                  <>
                    <Lock size={16} className="mr-2" />
                    Locked
                  </>
                )}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeGrid;
