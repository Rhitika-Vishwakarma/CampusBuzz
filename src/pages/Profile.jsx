import React, { useState, useContext } from 'react';
import { useAppContext } from '../context/AppContext';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import ClubsList from '../components/profile/ClubsList';
import BadgeGrid from '../components/profile/BadgeGrid';
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  Settings,
  Edit3,
  Share2,
  Download,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Profile = () => {
  const { currentUser, userStats, userClubs, userBadges, userEvents } =
    useAppContext();
  const [activeTab, setActiveTab] = useState('overview');

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Please log in to view your profile
          </h2>
          <p className="text-gray-600">
            You need to be logged in to access your profile page.
          </p>
        </div>
      </div>
    );
  }

  const recentActivity = [
    {
      id: 1,
      type: 'event_registered',
      title: 'Registered for Annual Tech Symposium',
      time: '2 hours ago',
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      id: 2,
      type: 'badge_earned',
      title: 'Earned "Event Enthusiast" badge',
      time: '1 day ago',
      icon: Trophy,
      color: 'text-yellow-600',
    },
    {
      id: 3,
      type: 'club_joined',
      title: 'Joined Photography Club',
      time: '3 days ago',
      icon: Users,
      color: 'text-green-600',
    },
    {
      id: 4,
      type: 'event_attended',
      title: 'Attended React Workshop',
      time: '5 days ago',
      icon: Clock,
      color: 'text-purple-600',
    },
  ];

  const upcomingEvents =
    userEvents
      ?.filter((event) => new Date(event.date) > new Date())
      .slice(0, 3) || [];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'clubs', label: 'Clubs', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <ProfileHeader />

        {/* Action Buttons */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </Button>
          <Button variant="secondary" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Profile
          </Button>
          <Button variant="secondary" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
          <Button variant="secondary" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>

        {/* Profile Stats */}
        <div className="mb-8">
          <ProfileStats />
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Recent Activity */}
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => {
                        const Icon = activity.icon;
                        return (
                          <div
                            key={activity.id}
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                          >
                            <div
                              className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${activity.color}`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                {activity.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {activity.time}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        This Month
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Events Attended</span>
                          <span className="font-semibold">4</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Hours Participated
                          </span>
                          <span className="font-semibold">12h</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">New Connections</span>
                          <span className="font-semibold">8</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Engagement
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Profile Views</span>
                          <span className="font-semibold">23</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Event Shares</span>
                          <span className="font-semibold">5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Recommendations</span>
                          <span className="font-semibold">12</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Event History
                  </h3>
                  <div className="space-y-4">
                    {userEvents?.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {event.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleDateString()} at{' '}
                            {event.location}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            new Date(event.date) > new Date()
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {new Date(event.date) > new Date()
                            ? 'Upcoming'
                            : 'Completed'}
                        </div>
                      </div>
                    )) || (
                      <p className="text-gray-500 text-center py-8">
                        No events found
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'clubs' && <ClubsList />}

            {activeTab === 'achievements' && <BadgeGrid />}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Upcoming Events
                </h3>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {event.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No upcoming events</p>
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button variant="secondary" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Browse Events
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Find Clubs
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <Trophy className="w-4 h-4 mr-2" />
                    View Achievements
                  </Button>
                </div>
              </div>
            </Card>

            {/* Profile Completion */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Profile Completion
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                  <ul className="text-sm space-y-1 mt-4">
                    <li className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      Profile photo added
                    </li>
                    <li className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      Bio completed
                    </li>
                    <li className="flex items-center text-gray-500">
                      <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                      Add social links
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
