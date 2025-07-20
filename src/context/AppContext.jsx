import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the App Context
const AppContext = createContext();

// Custom hook to use the App Context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// App Context Provider Component
export const AppProvider = ({ children }) => {
  // User state
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@college.edu',
    avatar: '/api/placeholder/150/150',
    year: 'Junior',
    major: 'Computer Science',
    points: 2450,
    studyHours: 128,
    badges: ['Early Bird', 'Tech Enthusiast', 'Team Player'],
    joinedClubs: ['coding-club', 'robotics-society', 'tech-innovators'],
    registeredEvents: ['hackathon-2024', 'ai-workshop', 'coding-bootcamp'],
  });

  // Events state
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Clubs state
  const [clubs, setClubs] = useState([]);
  const [userClubs, setUserClubs] = useState([]);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  // Filter and search state
  const [eventFilters, setEventFilters] = useState({
    category: 'all',
    date: 'all',
    club: 'all',
    registered: false,
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Calendar view state
  const [calendarView, setCalendarView] = useState('month');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'calendar'

  // Modal state
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  // Notification state
  const [notifications, setNotifications] = useState([]);

  // Initialize app data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load mock data
  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Mock events data
      const mockEvents = [
        {
          id: 'hackathon-2024',
          title: 'Annual Hackathon 2024',
          description: 'Build innovative solutions in 48 hours',
          date: new Date('2024-03-15'),
          time: '09:00 AM',
          location: 'Innovation Hub',
          category: 'Competition',
          club: 'coding-club',
          clubName: 'Coding Club',
          maxParticipants: 100,
          registeredCount: 67,
          image: '/api/placeholder/400/200',
          isRegistered: true,
          points: 500,
        },
        {
          id: 'ai-workshop',
          title: 'AI & Machine Learning Workshop',
          description: 'Learn the fundamentals of AI and ML',
          date: new Date('2024-03-20'),
          time: '02:00 PM',
          location: 'CS Lab 101',
          category: 'Workshop',
          club: 'robotics-society',
          clubName: 'Robotics Society',
          maxParticipants: 30,
          registeredCount: 15,
          image: '/api/placeholder/400/200',
          isRegistered: true,
          points: 200,
        },
        {
          id: 'coding-bootcamp',
          title: 'Web Development Bootcamp',
          description: 'Intensive 3-day web development course',
          date: new Date('2024-03-25'),
          time: '10:00 AM',
          location: 'Computer Lab',
          category: 'Bootcamp',
          club: 'tech-innovators',
          clubName: 'Tech Innovators',
          maxParticipants: 25,
          registeredCount: 8,
          image: '/api/placeholder/400/200',
          isRegistered: true,
          points: 300,
        },
        {
          id: 'design-thinking',
          title: 'Design Thinking Workshop',
          description: 'Learn creative problem-solving techniques',
          date: new Date('2024-03-30'),
          time: '11:00 AM',
          location: 'Design Studio',
          category: 'Workshop',
          club: 'design-club',
          clubName: 'Design Club',
          maxParticipants: 40,
          registeredCount: 22,
          image: '/api/placeholder/400/200',
          isRegistered: false,
          points: 150,
        },
      ];

      // Mock clubs data
      const mockClubs = [
        {
          id: 'coding-club',
          name: 'Coding Club',
          description: 'Learn programming and software development',
          category: 'Technology',
          members: 156,
          events: 12,
          image: '/api/placeholder/300/200',
          isJoined: true,
        },
        {
          id: 'robotics-society',
          name: 'Robotics Society',
          description: 'Build and program robots',
          category: 'Technology',
          members: 89,
          events: 8,
          image: '/api/placeholder/300/200',
          isJoined: true,
        },
        {
          id: 'tech-innovators',
          name: 'Tech Innovators',
          description: 'Innovation and entrepreneurship in technology',
          category: 'Technology',
          members: 134,
          events: 15,
          image: '/api/placeholder/300/200',
          isJoined: true,
        },
        {
          id: 'design-club',
          name: 'Design Club',
          description: 'UI/UX and graphic design community',
          category: 'Creative',
          members: 78,
          events: 10,
          image: '/api/placeholder/300/200',
          isJoined: false,
        },
      ];

      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setClubs(mockClubs);
      setUserClubs(mockClubs.filter((club) => club.isJoined));
    } catch (error) {
      console.error('Error loading data:', error);
      addNotification('Error loading data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Event registration functions
  const registerForEvent = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    if (event.registeredCount >= event.maxParticipants) {
      addNotification('Event is full', 'error');
      return;
    }

    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === eventId
          ? {
              ...e,
              isRegistered: true,
              registeredCount: e.registeredCount + 1,
            }
          : e
      )
    );

    setCurrentUser((prev) => ({
      ...prev,
      registeredEvents: [...prev.registeredEvents, eventId],
      points: prev.points + event.points,
    }));

    addNotification(`Successfully registered for ${event.title}!`, 'success');
  };

  const unregisterFromEvent = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === eventId
          ? {
              ...e,
              isRegistered: false,
              registeredCount: e.registeredCount - 1,
            }
          : e
      )
    );

    setCurrentUser((prev) => ({
      ...prev,
      registeredEvents: prev.registeredEvents.filter((id) => id !== eventId),
      points: prev.points - event.points,
    }));

    addNotification(`Unregistered from ${event.title}`, 'info');
  };

  // Club management functions
  const joinClub = (clubId) => {
    const club = clubs.find((c) => c.id === clubId);
    if (!club) return;

    setClubs((prevClubs) =>
      prevClubs.map((c) =>
        c.id === clubId ? { ...c, isJoined: true, members: c.members + 1 } : c
      )
    );

    setUserClubs((prev) => [...prev, { ...club, isJoined: true }]);
    setCurrentUser((prev) => ({
      ...prev,
      joinedClubs: [...prev.joinedClubs, clubId],
    }));

    addNotification(`Joined ${club.name}!`, 'success');
  };

  const leaveClub = (clubId) => {
    const club = clubs.find((c) => c.id === clubId);
    if (!club) return;

    setClubs((prevClubs) =>
      prevClubs.map((c) =>
        c.id === clubId ? { ...c, isJoined: false, members: c.members - 1 } : c
      )
    );

    setUserClubs((prev) => prev.filter((c) => c.id !== clubId));
    setCurrentUser((prev) => ({
      ...prev,
      joinedClubs: prev.joinedClubs.filter((id) => id !== clubId),
    }));

    addNotification(`Left ${club.name}`, 'info');
  };

  // Filter and search functions
  const applyFilters = (filters) => {
    setEventFilters(filters);
    let filtered = [...events];

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(
        (event) =>
          event.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Club filter
    if (filters.club !== 'all') {
      filtered = filtered.filter((event) => event.club === filters.club);
    }

    // Registration filter
    if (filters.registered) {
      filtered = filtered.filter((event) => event.isRegistered);
    }

    // Date filter
    if (filters.date !== 'all') {
      const now = new Date();
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date);
        switch (filters.date) {
          case 'today':
            return eventDate.toDateString() === now.toDateString();
          case 'week':
            const weekFromNow = new Date(
              now.getTime() + 7 * 24 * 60 * 60 * 1000
            );
            return eventDate >= now && eventDate <= weekFromNow;
          case 'month':
            const monthFromNow = new Date(
              now.getFullYear(),
              now.getMonth() + 1,
              now.getDate()
            );
            return eventDate >= now && eventDate <= monthFromNow;
          default:
            return true;
        }
      });
    }

    setFilteredEvents(filtered);
  };

  const searchEvents = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredEvents(events);
      return;
    }

    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.clubName.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredEvents(filtered);
  };

  // Modal functions
  const openModal = (modalType, data = null) => {
    setActiveModal(modalType);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  // Notification functions
  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date(),
    };

    setNotifications((prev) => [notification, ...prev]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Theme functions
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Stats calculations
  const getStats = () => {
    const registeredEvents = events.filter((e) => e.isRegistered).length;
    const joinedClubs = clubs.filter((c) => c.isJoined).length;
    const upcomingEvents = events.filter((e) => {
      const eventDate = new Date(e.date);
      return eventDate > new Date() && e.isRegistered;
    }).length;

    return {
      totalPoints: currentUser.points,
      studyHours: currentUser.studyHours,
      registeredEvents,
      joinedClubs,
      upcomingEvents,
      badges: currentUser.badges.length,
    };
  };

  const contextValue = {
    // User state
    currentUser,
    setCurrentUser,

    // Events
    events,
    filteredEvents,
    selectedEvent,
    setSelectedEvent,

    // Clubs
    clubs,
    userClubs,

    // UI state
    isLoading,
    setIsLoading,
    sidebarOpen,
    setSidebarOpen,
    theme,

    // Filters and search
    eventFilters,
    searchQuery,
    calendarView,
    setCalendarView,
    viewMode,
    setViewMode,

    // Modal state
    activeModal,
    modalData,

    // Notifications
    notifications,

    // Functions
    registerForEvent,
    unregisterFromEvent,
    joinClub,
    leaveClub,
    applyFilters,
    searchEvents,
    openModal,
    closeModal,
    addNotification,
    removeNotification,
    toggleTheme,
    getStats,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
