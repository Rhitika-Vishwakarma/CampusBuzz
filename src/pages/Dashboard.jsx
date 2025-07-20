import React, { useContext } from 'react';
import { Calendar, TrendingUp, Users, Bell } from 'lucide-react';
import QuickStats from '../components/dashboard/QuickStats';
import ClubGrid from '../components/dashboard/ClubGrid';
import TopEvents from '../components/dashboard/TopEvents';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { user, notifications } = useAppContext();

  const recentActivity = [
    {
      id: 1,
      type: 'event',
      title: 'Registered for Tech Talk',
      description: 'AI in Modern Development',
      time: '2 hours ago',
      icon: Calendar,
      color: 'text-blue-500',
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Badge Earned!',
      description: 'Event Enthusiast - Attended 25+ events',
      time: '1 day ago',
      icon: TrendingUp,
      color: 'text-green-500',
    },
    {
      id: 3,
      type: 'club',
      title: 'Joined Photography Club',
      description: 'Welcome to the creative community!',
      time: '3 days ago',
      icon: Users,
      color: 'text-purple-500',
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'Project Submission',
      club: 'Coding Club',
      dueDate: '2024-01-25',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Event Registration',
      club: 'Drama Society',
      dueDate: '2024-01-27',
      priority: 'medium',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'Student'}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening in your clubs and events today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4">View Calendar</Calendar>
          </Button>
          <Button className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
            {notifications?.unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.unreadCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Events and Clubs */}
        <div className="lg:col-span-2 space-y-8">
          <TopEvents />
          <ClubGrid />
        </div>

        {/* Right Column - Activity and Notifications */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}
                  >
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Upcoming Deadlines
            </h3>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className="p-3 rounded-lg border-l-4 border-l-orange-400 bg-orange-50"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">
                      {deadline.title}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        deadline.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {deadline.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{deadline.club}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Due: {new Date(deadline.dueDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
            {upcomingDeadlines.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No upcoming deadlines 🎉
              </p>
            )}
          </Card>

          {/* Achievement Progress */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Next Achievement
            </h3>
            <div className="text-center">
              <div className="mb-3">
                <span className="text-3xl">🏆</span>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Social Butterfly
              </p>
              <p className="text-xs text-gray-600 mb-4">
                Join 10 different clubs
              </p>

              {/* Progress Bar */}
              <div className="bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: '70%' }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">7/10 clubs joined</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
