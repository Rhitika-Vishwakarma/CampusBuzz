import React, { useContext } from 'react';
import { Trophy, Clock, Award, Star } from 'lucide-react';
import StatsCard from './StatsCard';
import { useAppContext } from '../../context/AppContext';

const QuickStats = () => {
  const { user } = useAppContext();

  const stats = [
    {
      icon: Trophy,
      label: 'Total Points',
      value: user?.points || 2450,
      color: 'orange',
      trend: {
        positive: true,
        value: '+12%',
        label: 'vs last month',
      },
    },
    {
      icon: Clock,
      label: 'Hours Logged',
      value: user?.hoursLogged || 156,
      color: 'blue',
      trend: {
        positive: true,
        value: '+8h',
        label: 'this week',
      },
    },
    {
      icon: Award,
      label: 'Badges Earned',
      value: user?.badges?.length || 15,
      color: 'purple',
      trend: {
        positive: true,
        value: '+3',
        label: 'new badges',
      },
    },
    {
      icon: Star,
      label: 'Events Attended',
      value: user?.eventsAttended || 28,
      color: 'green',
      trend: {
        positive: true,
        value: '+5',
        label: 'this month',
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <StatsCard {...stat} />
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
