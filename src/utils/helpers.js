// Date formatting utilities
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (time) => {
  if (!time) return '';
  return time;
};

export const formatDateTime = (date, time) => {
  const formattedDate = formatDate(date);
  return time ? `${formattedDate} at ${time}` : formattedDate;
};

export const getRelativeTime = (date) => {
  if (!date) return '';

  const now = new Date();
  const eventDate = new Date(date);
  const diffTime = eventDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return 'Past event';
  } else if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Tomorrow';
  } else if (diffDays <= 7) {
    return `In ${diffDays} days`;
  } else if (diffDays <= 30) {
    const weeks = Math.ceil(diffDays / 7);
    return `In ${weeks} week${weeks > 1 ? 's' : ''}`;
  } else {
    const months = Math.ceil(diffDays / 30);
    return `In ${months} month${months > 1 ? 's' : ''}`;
  }
};

export const isEventUpcoming = (date) => {
  const now = new Date();
  const eventDate = new Date(date);
  return eventDate > now;
};

export const isEventToday = (date) => {
  const now = new Date();
  const eventDate = new Date(date);
  return eventDate.toDateString() === now.toDateString();
};

export const isEventThisWeek = (date) => {
  const now = new Date();
  const eventDate = new Date(date);
  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  return eventDate >= now && eventDate <= weekFromNow;
};

// Event filtering utilities
export const filterEventsByCategory = (events, category) => {
  if (category === 'all') return events;
  return events.filter(
    (event) => event.category.toLowerCase() === category.toLowerCase()
  );
};

export const filterEventsByClub = (events, clubId) => {
  if (clubId === 'all') return events;
  return events.filter((event) => event.club === clubId);
};

export const filterEventsByRegistration = (events, registered = false) => {
  return events.filter((event) => event.isRegistered === registered);
};

export const filterEventsByDate = (events, dateFilter) => {
  const now = new Date();

  switch (dateFilter) {
    case 'today':
      return events.filter((event) => isEventToday(event.date));

    case 'week':
      return events.filter((event) => isEventThisWeek(event.date));

    case 'month':
      const monthFromNow = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate()
      );
      return events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= now && eventDate <= monthFromNow;
      });

    case 'upcoming':
      return events.filter((event) => isEventUpcoming(event.date));

    case 'past':
      return events.filter((event) => !isEventUpcoming(event.date));

    default:
      return events;
  }
};

// Search utilities
export const searchEvents = (events, query) => {
  if (!query || query.trim() === '') return events;

  const searchTerm = query.toLowerCase().trim();

  return events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.clubName.toLowerCase().includes(searchTerm) ||
      event.category.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm) ||
      (event.tags &&
        event.tags.some((tag) => tag.toLowerCase().includes(searchTerm)))
  );
};

export const searchClubs = (clubs, query) => {
  if (!query || query.trim() === '') return clubs;

  const searchTerm = query.toLowerCase().trim();

  return clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchTerm) ||
      club.description.toLowerCase().includes(searchTerm) ||
      club.category.toLowerCase().includes(searchTerm) ||
      (club.tags &&
        club.tags.some((tag) => tag.toLowerCase().includes(searchTerm)))
  );
};

// Sorting utilities
export const sortEventsByDate = (events, ascending = true) => {
  return [...events].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const sortEventsByPopularity = (events) => {
  return [...events].sort((a, b) => b.registeredCount - a.registeredCount);
};

export const sortClubsByMembers = (clubs, ascending = false) => {
  return [...clubs].sort((a, b) => {
    return ascending ? a.members - b.members : b.members - a.members;
  });
};

// Validation utilities
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidDate = (date) => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

// Format utilities
export const formatPoints = (points) => {
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}k`;
  }
  return points.toString();
};

export const formatMemberCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export const getEventStatusColor = (event) => {
  const now = new Date();
  const eventDate = new Date(event.date);

  if (eventDate < now) {
    return 'gray'; // Past event
  } else if (isEventToday(event.date)) {
    return 'red'; // Today
  } else if (isEventThisWeek(event.date)) {
    return 'orange'; // This week
  } else {
    return 'blue'; // Future
  }
};

export const getRegistrationStatus = (event) => {
  const availableSpots = event.maxParticipants - event.registeredCount;
  const percentFull = (event.registeredCount / event.maxParticipants) * 100;

  if (availableSpots === 0) {
    return { status: 'full', color: 'red', text: 'Event Full' };
  } else if (percentFull >= 90) {
    return { status: 'almost-full', color: 'orange', text: 'Almost Full' };
  } else if (percentFull >= 50) {
    return { status: 'filling', color: 'yellow', text: 'Filling Up' };
  } else {
    return { status: 'available', color: 'green', text: 'Spots Available' };
  }
};

// Category utilities
export const getEventCategories = (events) => {
  const categories = [...new Set(events.map((event) => event.category))];
  return categories.sort();
};

export const getClubCategories = (clubs) => {
  const categories = [...new Set(clubs.map((club) => club.category))];
  return categories.sort();
};

// Stats utilities
export const calculateUserStats = (user, events, clubs) => {
  const registeredEvents = events.filter((event) =>
    user.registeredEvents?.includes(event.id)
  );

  const joinedClubs = clubs.filter((club) =>
    user.joinedClubs?.includes(club.id)
  );

  const upcomingEvents = registeredEvents.filter((event) =>
    isEventUpcoming(event.date)
  );

  const completedEvents = registeredEvents.filter(
    (event) => !isEventUpcoming(event.date)
  );

  return {
    totalPoints: user.points || 0,
    studyHours: user.studyHours || 0,
    registeredEvents: registeredEvents.length,
    joinedClubs: joinedClubs.length,
    upcomingEvents: upcomingEvents.length,
    completedEvents: completedEvents.length,
    badges: user.badges?.length || 0,
  };
};

// Truncate text utility
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate avatar initials
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Generate random color for avatars
export const getAvatarColor = (name) => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];

  if (!name) return colors[0];

  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

// Calendar utilities for React Big Calendar
export const convertEventsForCalendar = (events) => {
  return events.map((event) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.date),
    end: new Date(event.endDate || event.date),
    resource: event,
    allDay: false,
  }));
};

// Local storage utilities
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

// URL utilities
export const createEventShareUrl = (eventId) => {
  return `${window.location.origin}/events/${eventId}`;
};

export const createClubShareUrl = (clubId) => {
  return `${window.location.origin}/clubs/${clubId}`;
};
