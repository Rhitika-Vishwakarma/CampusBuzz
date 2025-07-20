import React, { useState } from 'react';
import {
  Camera,
  Edit3,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Users,
  Star,
} from 'lucide-react';
import Button from '../ui/Button';

const ProfileHeader = ({ user, onEdit, isOwner = true }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const getYearLabel = (year) => {
    const labels = {
      1: 'Freshman',
      2: 'Sophomore',
      3: 'Junior',
      4: 'Senior',
    };
    return labels[year] || `Year ${year}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Cover Photo */}
      <div className="h-32 md:h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
        {isOwner && (
          <button className="absolute top-4 right-4 p-2 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-lg transition-colors">
            <Camera className="w-5 h-5 text-white" />
          </button>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent opacity-30"></div>
      </div>

      {/* Profile Content */}
      <div className="px-6 pb-6">
        {/* Avatar and Basic Info */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-12 md:-mt-16 mb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-2xl md:text-4xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              {isOwner && (
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              )}
            </div>

            {/* Name and Title */}
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {user.name}
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                {user.major} • {getYearLabel(user.year)}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  <Award className="w-4 h-4" />
                  {user.achievements?.length || 0} Achievements
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <Users className="w-4 h-4" />
                  {user.clubs?.length || 0} Clubs
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  <Star className="w-4 h-4" />
                  {user.points || 0} Points
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4 md:mt-0">
            {isOwner ? (
              <Button
                variant="primary"
                icon={Edit3}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button variant="secondary">Message</Button>
                <Button variant="primary">Follow</Button>
              </>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {user.email && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">Email</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
            </div>
          )}

          {user.phone && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">Phone</div>
                <div className="text-sm text-gray-600">{user.phone}</div>
              </div>
            </div>
          )}

          {user.location && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Location
                </div>
                <div className="text-sm text-gray-600">{user.location}</div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-600" />
            <div>
              <div className="text-sm font-medium text-gray-900">Joined</div>
              <div className="text-sm text-gray-600">
                {formatJoinDate(user.joinDate || new Date())}
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </div>
        )}

        {/* Interests/Skills Tags */}
        {user.interests && user.interests.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
