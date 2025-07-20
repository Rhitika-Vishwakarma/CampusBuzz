import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Award,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Button from '../ui/Button';

const EventRegistration = ({
  event,
  isOpen,
  onClose,
  onRegister,
  onUnregister,
  currentUser = null,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationStep, setRegistrationStep] = useState('details'); // details, confirm, success

  if (!isOpen || !event) return null;

  const isRegistered = event.isRegistered;
  const isFull = event.registeredCount >= event.maxCapacity;
  const spotsLeft = event.maxCapacity - event.registeredCount;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Workshop: 'bg-blue-100 text-blue-800 border-blue-200',
      Competition: 'bg-red-100 text-red-800 border-red-200',
      Social: 'bg-green-100 text-green-800 border-green-200',
      Meeting: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Conference: 'bg-purple-100 text-purple-800 border-purple-200',
      Seminar: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      Cultural: 'bg-pink-100 text-pink-800 border-pink-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleRegister = async () => {
    if (isFull || isRegistered) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onRegister(event.id);
      setRegistrationStep('success');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnregister = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      onUnregister(event.id);
      onClose();
    } catch (error) {
      console.error('Unregistration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRegistrationDetails = () => (
    <div className="space-y-6">
      {/* Event Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(
                event.category
              )}`}
            >
              {event.category}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="text-sm text-gray-500">
            Organized by{' '}
            <span className="font-medium text-gray-700">{event.organizer}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-2"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-600" />
          <div>
            <div className="font-medium text-gray-900">
              {formatDate(event.date)}
            </div>
            <div className="text-sm text-gray-500">Event Date</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-green-600" />
          <div>
            <div className="font-medium text-gray-900">
              {formatTime(event.date)}
            </div>
            <div className="text-sm text-gray-500">Start Time</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-red-600" />
          <div>
            <div className="font-medium text-gray-900">{event.location}</div>
            <div className="text-sm text-gray-500">Venue</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-purple-600" />
          <div>
            <div className="font-medium text-gray-900">
              {event.registeredCount} / {event.maxCapacity}
            </div>
            <div className="text-sm text-gray-500">Registered</div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      {event.requirements && event.requirements.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Requirements
          </h3>
          <ul className="space-y-2">
            {event.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Capacity Warning */}
      {spotsLeft <= 10 && spotsLeft > 0 && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <span className="text-yellow-800">
            Only {spotsLeft} spots remaining!
          </span>
        </div>
      )}

      {/* Registration Actions */}
      <div className="flex gap-3 pt-4 border-t">
        {isRegistered ? (
          <>
            <div className="flex items-center gap-2 text-green-600 flex-1">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                You're registered for this event
              </span>
            </div>
            <Button
              variant="secondary"
              onClick={handleUnregister}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Unregistering...' : 'Unregister'}
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleRegister}
              disabled={isFull || isSubmitting}
              className="flex-1"
            >
              {isSubmitting
                ? 'Registering...'
                : isFull
                ? 'Event Full'
                : 'Register Now'}
            </Button>
          </>
        )}
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Registration Successful!
        </h3>
        <p className="text-gray-600">
          You've successfully registered for <strong>{event.title}</strong>
        </p>
      </div>

      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-2">What's Next?</h4>
        <ul className="text-sm text-green-700 space-y-1 text-left">
          <li>• Check your email for confirmation details</li>
          <li>• Mark your calendar for {formatDate(event.date)}</li>
          <li>• Prepare any required materials</li>
        </ul>
      </div>

      <Button variant="primary" onClick={onClose} className="w-full">
        Done
      </Button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {registrationStep === 'details' && renderRegistrationDetails()}
            {registrationStep === 'success' && renderSuccess()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;
