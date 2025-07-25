// Enhanced Mock Data for College Club Management System

// Current User Data
export const currentUser = {
  id: 'user_1',
  name: 'User',
  email: 'user@college.edu',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  year: 'Junior',
  major: 'Computer Science',
  points: 2847,
  volunteerHours: 156,
  joinedClubs: ['club_1', 'club_3', 'club_5', 'club_8', 'club_12'],
  registeredEvents: [
    'event_1',
    'event_3',
    'event_5',
    'event_7',
    'event_9',
    'event_15',
  ],
  badges: [
    {
      id: 'badge_1',
      name: 'Event Enthusiast',
      icon: '🎉',
      description: 'Attended 10+ events',
      earned: true,
    },
    {
      id: 'badge_2',
      name: 'Volunteer Hero',
      icon: '🦸',
      description: 'Completed 100+ volunteer hours',
      earned: true,
    },
    {
      id: 'badge_3',
      name: 'Tech Leader',
      icon: '💻',
      description: 'Lead a tech project',
      earned: true,
    },
    {
      id: 'badge_4',
      name: 'Social Butterfly',
      icon: '🦋',
      description: 'Joined 5+ clubs',
      earned: true,
    },
    {
      id: 'badge_5',
      name: 'Point Master',
      icon: '⭐',
      description: 'Earned 5000+ points',
      earned: false,
    },
    {
      id: 'badge_6',
      name: 'Community Builder',
      icon: '🏗',
      description: 'Organized 3+ events',
      earned: false,
    },
    {
      id: 'badge_7',
      name: 'Innovation Champion',
      icon: '🚀',
      description: 'Won a hackathon or competition',
      earned: false,
    },
    {
      id: 'badge_8',
      name: 'Mentor',
      icon: '👨‍🏫',
      description: 'Mentored 5+ students',
      earned: false,
    },
  ],
};

// Enhanced Club Categories
export const clubCategories = [
  {
    id: 'tech',
    name: 'Technology & Coding',
    icon: '💻',
    color: 'bg-blue-500',
    count: 18,
    description: 'Programming, AI, Cybersecurity, Web Dev',
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    icon: '⚽',
    color: 'bg-green-500',
    count: 22,
    description: 'Football, Basketball, Tennis, Fitness',
  },
  {
    id: 'arts',
    name: 'Arts & Culture',
    icon: '🎭',
    color: 'bg-purple-500',
    count: 20,
    description: 'Drama, Music, Photography, Creative Arts',
  },
  {
    id: 'academic',
    name: 'Academic & Research',
    icon: '📚',
    color: 'bg-indigo-500',
    count: 25,
    description: 'Subject-specific study groups, Research',
  },
  {
    id: 'volunteer',
    name: 'Social & Outreach',
    icon: '🤝',
    color: 'bg-emerald-500',
    count: 15,
    description: 'Community service, Social causes',
  },
  {
    id: 'professional',
    name: 'Professional Development',
    icon: '💼',
    color: 'bg-orange-500',
    count: 16,
    description: 'Career skills, Leadership, Networking',
  },
];

// Enhanced Clubs Data
export const clubs = [
  // Tech & Coding Clubs
  {
    id: 'club_1',
    name: 'Code Warriors',
    category: 'tech',
    description: 'Competitive programming and hackathons',
    members: 234,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=200&fit=crop',
    tags: ['Programming', 'Hackathons', 'AI'],
    president: 'Sarah Chen',
    meetingTime: 'Wednesdays 7PM',
    isJoined: true,
  },
  {
    id: 'club_7',
    name: 'CodeFusion',
    category: 'tech',
    description: 'Full-stack development and modern frameworks',
    members: 189,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
    tags: ['Full-stack', 'React', 'Node.js'],
    president: 'Michael Torres',
    meetingTime: 'Fridays 6PM',
    isJoined: false,
  },
  {
    id: 'club_8',
    name: 'AlgoVerse',
    category: 'tech',
    description: 'Data structures, algorithms, and competitive coding',
    members: 167,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=300&h=200&fit=crop',
    tags: ['Algorithms', 'Data Structures', 'Competitive Programming'],
    president: 'Priya Sharma',
    meetingTime: 'Tuesdays 7PM',
    isJoined: true,
  },
  {
    id: 'club_9',
    name: 'ByteBenders',
    category: 'tech',
    description: 'Low-level programming and system design',
    members: 98,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=300&h=200&fit=crop',
    tags: ['Systems Programming', 'C++', 'Assembly'],
    president: 'Kevin Liu',
    meetingTime: 'Thursdays 8PM',
    isJoined: false,
  },
  {
    id: 'club_10',
    name: 'ML Minds',
    category: 'tech',
    description: 'Machine learning and artificial intelligence research',
    members: 203,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop',
    tags: ['Machine Learning', 'AI', 'Deep Learning'],
    president: 'Dr. Amanda Foster',
    meetingTime: 'Mondays 6PM',
    isJoined: false,
  },
  {
    id: 'club_11',
    name: 'CyberCore',
    category: 'tech',
    description: 'Cybersecurity, ethical hacking, and digital forensics',
    members: 145,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop',
    tags: ['Cybersecurity', 'Ethical Hacking', 'Network Security'],
    president: 'Marcus Thompson',
    meetingTime: 'Saturdays 2PM',
    isJoined: false,
  },
  {
    id: 'club_12',
    name: 'UX/UI Collective',
    category: 'tech',
    description: 'User experience design and interface development',
    members: 178,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
    tags: ['UX Design', 'UI Development', 'Prototyping'],
    president: 'Jessica Park',
    meetingTime: 'Wednesdays 5PM',
    isJoined: true,
  },

  // Social & Outreach Clubs
  {
    id: 'club_5',
    name: 'Environmental Action',
    category: 'volunteer',
    description: 'Making campus and community greener',
    members: 145,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop',
    tags: ['Environment', 'Sustainability', 'Community'],
    president: 'Maya Patel',
    meetingTime: 'Saturdays 10AM',
    isJoined: true,
  },
  {
    id: 'club_13',
    name: 'GreenRoots',
    category: 'volunteer',
    description: 'Environmental conservation and awareness',
    members: 134,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
    tags: ['Conservation', 'Climate Action', 'Recycling'],
    president: 'Emma Green',
    meetingTime: 'Sundays 11AM',
    isJoined: false,
  },
  {
    id: 'club_14',
    name: 'HealConnect',
    category: 'volunteer',
    description: 'Mental health awareness and peer support',
    members: 89,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
    tags: ['Mental Health', 'Counseling', 'Support Groups'],
    president: 'Dr. Sarah Martinez',
    meetingTime: 'Thursdays 6PM',
    isJoined: false,
  },
  {
    id: 'club_15',
    name: 'EduBridge',
    category: 'volunteer',
    description: 'Teaching and mentoring underprivileged students',
    members: 112,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=300&h=200&fit=crop',
    tags: ['Education', 'Mentoring', 'Community Outreach'],
    president: 'Carlos Rodriguez',
    meetingTime: 'Saturdays 9AM',
    isJoined: false,
  },
  {
    id: 'club_16',
    name: 'AnimalAid',
    category: 'volunteer',
    description: 'Animal welfare and rescue initiatives',
    members: 97,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=300&h=200&fit=crop',
    tags: ['Animal Welfare', 'Rescue', 'Veterinary Care'],
    president: 'Lisa Wang',
    meetingTime: 'Fridays 4PM',
    isJoined: false,
  },

  // Arts & Culture Clubs
  {
    id: 'club_3',
    name: 'Photography Society',
    category: 'arts',
    description: 'Capture moments, create memories',
    members: 189,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop',
    tags: ['Photography', 'Art', 'Exhibitions'],
    president: 'Emily Rodriguez',
    meetingTime: 'Fridays 5PM',
    isJoined: true,
  },
  {
    id: 'club_17',
    name: 'CultureSync',
    category: 'arts',
    description: 'Celebrating diversity through cultural arts',
    members: 156,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=200&fit=crop',
    tags: ['Cultural Arts', 'Dance', 'Music'],
    president: 'Aisha Patel',
    meetingTime: 'Sundays 3PM',
    isJoined: false,
  },
  {
    id: 'club_18',
    name: 'VibeTribe',
    category: 'arts',
    description: 'Music production, performance, and drama',
    members: 203,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
    tags: ['Music', 'Drama', 'Performance'],
    president: 'Jordan Blake',
    meetingTime: 'Tuesdays 7PM',
    isJoined: false,
  },

  // Professional Development Clubs
  {
    id: 'club_19',
    name: 'FinIQ',
    category: 'professional',
    description: 'Finance, investing, and economic analysis',
    members: 178,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop',
    tags: ['Finance', 'Investing', 'Economics'],
    president: 'Rachel Kim',
    meetingTime: 'Wednesdays 6PM',
    isJoined: false,
  },
  {
    id: 'club_6',
    name: 'Entrepreneurship Hub',
    category: 'professional',
    description: 'Build the next big startup',
    members: 267,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop',
    tags: ['Startups', 'Business', 'Innovation'],
    president: 'James Zhang',
    meetingTime: 'Wednesdays 6PM',
    isJoined: false,
  },
  {
    id: 'club_20',
    name: 'WomenInTech',
    category: 'professional',
    description: 'Supporting women in technology careers',
    members: 145,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop',
    tags: ['Women Empowerment', 'Technology', 'Networking'],
    president: 'Dr. Maria Santos',
    meetingTime: 'Thursdays 7PM',
    isJoined: false,
  },
  {
    id: 'club_21',
    name: 'DataNexus',
    category: 'professional',
    description: 'Data science, analytics, and business intelligence',
    members: 198,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    tags: ['Data Science', 'Analytics', 'Business Intelligence'],
    president: 'Alex Chen',
    meetingTime: 'Mondays 7PM',
    isJoined: false,
  },
  {
    id: 'club_22',
    name: 'ProductPitchers',
    category: 'professional',
    description: 'Product management and marketing strategies',
    members: 134,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
    tags: ['Product Management', 'Marketing', 'Strategy'],
    president: 'Taylor Swift',
    meetingTime: 'Fridays 6PM',
    isJoined: false,
  },

  // Sports Clubs
  {
    id: 'club_2',
    name: 'Basketball Club',
    category: 'sports',
    description: 'Competitive and recreational basketball',
    members: 156,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=200&fit=crop',
    tags: ['Basketball', 'Tournaments', 'Fitness'],
    president: 'Marcus Williams',
    meetingTime: 'Tuesdays & Thursdays 6PM',
    isJoined: false,
  },
  {
    id: 'club_23',
    name: 'Football Warriors',
    category: 'sports',
    description: 'Competitive football team and training',
    members: 89,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=300&h=200&fit=crop',
    tags: ['Football', 'Training', 'Competition'],
    president: 'Jake Morrison',
    meetingTime: 'Mondays & Wednesdays 5PM',
    isJoined: false,
  },
  {
    id: 'club_24',
    name: 'Tennis Academy',
    category: 'sports',
    description: 'Tennis coaching and tournaments',
    members: 67,
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop',
    tags: ['Tennis', 'Coaching', 'Singles', 'Doubles'],
    president: 'Sofia Martinez',
    meetingTime: 'Saturdays 8AM',
    isJoined: false,
  },

  // Academic Clubs
  {
    id: 'club_4',
    name: 'Debate Society',
    category: 'academic',
    description: 'Sharpen your argumentative skills',
    members: 98,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    tags: ['Debate', 'Public Speaking', 'Critical Thinking'],
    president: 'David Kim',
    meetingTime: 'Mondays 7PM',
    isJoined: false,
  },
  {
    id: 'club_25',
    name: 'Research Scholars',
    category: 'academic',
    description: 'Undergraduate research and publication',
    members: 78,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    tags: ['Research', 'Academic Writing', 'Publications'],
    president: 'Dr. Robert Johnson',
    meetingTime: 'Thursdays 4PM',
    isJoined: false,
  },
];

// Enhanced Events Data
export const events = [
  // Existing events
  {
    id: 'event_1',
    title: 'AI Hackathon 2024',
    club: 'Code Warriors',
    clubId: 'club_1',
    date: new Date('2024-02-15'),
    time: '9:00 AM - 6:00 PM',
    location: 'Tech Center, Room 301',
    description:
      '24-hour hackathon focused on AI and machine learning solutions for real-world problems.',
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop',
    category: 'tech',
    tags: ['AI', 'Hackathon', 'Programming'],
    maxParticipants: 100,
    currentParticipants: 67,
    points: 500,
    volunteerHours: 0,
    difficulty: 'Advanced',
    isRegistered: true,
    status: 'upcoming',
  },
  {
    id: 'event_2',
    title: 'Basketball Tournament Finals',
    club: 'Basketball Club',
    clubId: 'club_2',
    date: new Date('2024-02-12'),
    time: '4:00 PM - 8:00 PM',
    location: 'Main Gymnasium',
    description:
      'Championship finals of the inter-college basketball tournament.',
    image:
      'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=400&h=250&fit=crop',
    category: 'sports',
    tags: ['Basketball', 'Tournament', 'Championship'],
    maxParticipants: 200,
    currentParticipants: 156,
    points: 200,
    volunteerHours: 0,
    difficulty: 'Beginner',
    isRegistered: false,
    status: 'upcoming',
  },
  {
    id: 'event_3',
    title: 'Nature Photography Workshop',
    club: 'Photography Society',
    clubId: 'club_3',
    date: new Date('2024-02-18'),
    time: '7:00 AM - 12:00 PM',
    location: 'Campus Gardens',
    description:
      'Learn techniques for capturing stunning nature photographs with professional guidance.',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop',
    category: 'arts',
    tags: ['Photography', 'Nature', 'Workshop'],
    maxParticipants: 25,
    currentParticipants: 18,
    points: 150,
    volunteerHours: 0,
    difficulty: 'Intermediate',
    isRegistered: true,
    status: 'upcoming',
  },
  {
    id: 'event_5',
    title: 'Campus Cleanup Drive',
    club: 'Environmental Action',
    clubId: 'club_5',
    date: new Date('2024-02-10'),
    time: '8:00 AM - 12:00 PM',
    location: 'Entire Campus',
    description:
      'Join us in making our campus cleaner and greener for everyone.',
    image:
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
    category: 'volunteer',
    tags: ['Environment', 'Volunteer', 'Community'],
    maxParticipants: 80,
    currentParticipants: 45,
    points: 200,
    volunteerHours: 4,
    difficulty: 'Beginner',
    isRegistered: true,
    status: 'upcoming',
  },
  {
    id: 'event_7',
    title: 'Tech Talk: Future of Web Development',
    club: 'Code Warriors',
    clubId: 'club_1',
    date: new Date('2024-02-08'),
    time: '6:00 PM - 8:00 PM',
    location: 'Tech Center Auditorium',
    description:
      'Industry expert discusses the latest trends in web development.',
    image:
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
    category: 'tech',
    tags: ['Web Development', 'Technology', 'Talk'],
    maxParticipants: 150,
    currentParticipants: 89,
    points: 100,
    volunteerHours: 0,
    difficulty: 'Beginner',
    isRegistered: true,
    status: 'completed',
  },

  // New events for additional clubs
  {
    id: 'event_9',
    title: 'Algorithm Design Competition',
    club: 'AlgoVerse',
    clubId: 'club_8',
    date: new Date('2024-02-22'),
    time: '10:00 AM - 4:00 PM',
    location: 'Computer Science Building',
    description:
      'Test your algorithmic thinking in this intensive coding competition.',
    image:
      'https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=400&h=250&fit=crop',
    category: 'tech',
    tags: ['Algorithms', 'Competition', 'Problem Solving'],
    maxParticipants: 50,
    currentParticipants: 32,
    points: 400,
    volunteerHours: 0,
    difficulty: 'Advanced',
    isRegistered: true,
    status: 'upcoming',
  },
  {
    id: 'event_10',
    title: 'UX Design Workshop',
    club: 'UX/UI Collective',
    clubId: 'club_12',
    date: new Date('2024-02-14'),
    time: '2:00 PM - 6:00 PM',
    location: 'Design Studio',
    description:
      'Hands-on workshop covering user research, wireframing, and prototyping.',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    category: 'tech',
    tags: ['UX Design', 'Prototyping', 'User Research'],
    maxParticipants: 30,
    currentParticipants: 24,
    points: 250,
    volunteerHours: 0,
    difficulty: 'Intermediate',
    isRegistered: false,
    status: 'upcoming',
  },
  {
    id: 'event_11',
    title: 'Mental Health Awareness Week',
    club: 'HealConnect',
    clubId: 'club_14',
    date: new Date('2024-02-19'),
    time: '9:00 AM - 5:00 PM',
    location: 'Student Center',
    description:
      'Week-long series of workshops and talks on mental health and wellness.',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
    category: 'volunteer',
    tags: ['Mental Health', 'Wellness', 'Community'],
    maxParticipants: 200,
    currentParticipants: 89,
    points: 300,
    volunteerHours: 8,
    difficulty: 'Beginner',
    isRegistered: false,
    status: 'upcoming',
  },
  {
    id: 'event_12',
    title: 'Cultural Arts Festival',
    club: 'CultureSync',
    clubId: 'club_17',
    date: new Date('2024-02-24'),
    time: '12:00 PM - 8:00 PM',
    location: 'Main Auditorium',
    description:
      'Celebrating diversity through dance, music, and cultural performances.',
    image:
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=250&fit=crop',
    category: 'arts',
    tags: ['Culture', 'Dance', 'Music', 'Performance'],
    maxParticipants: 300,
    currentParticipants: 156,
    points: 200,
    volunteerHours: 0,
    difficulty: 'Beginner',
    isRegistered: false,
    status: 'upcoming',
  },
  {
    id: 'event_13',
    title: 'Fintech Innovation Summit',
    club: 'FinIQ',
    clubId: 'club_19',
    date: new Date('2024-02-26'),
    time: '1:00 PM - 6:00 PM',
    location: 'Business Center',
    description:
      'Exploring the intersection of finance and technology with industry leaders.',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
    category: 'professional',
    tags: ['Fintech', 'Innovation', 'Finance'],
    maxParticipants: 100,
    currentParticipants: 67,
    points: 350,
    volunteerHours: 0,
    difficulty: 'Intermediate',
    isRegistered: false,
    status: 'upcoming',
  },
  {
    id: 'event_14',
    title: 'Women in Tech Panel',
    club: 'WomenInTech',
    clubId: 'club_20',
    date: new Date('2024-02-16'),
    time: '3:00 PM - 5:00 PM',
    location: 'Engineering Auditorium',
    description:
      'Panel discussion with successful women leaders in technology.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop',
    category: 'professional',
    tags: ['Women Empowerment', 'Technology', 'Leadership'],
    maxParticipants: 150,
    currentParticipants: 98,
    points: 200,
    volunteerHours: 0,
    difficulty: 'Beginner',
    isRegistered: false,
    status: 'upcoming',
  },
  {
    id: 'event_15',
    title: 'Data Science Bootcamp',
    club: 'DataNexus',
    clubId: 'club_21',
    date: new Date('2024-02-17'),
    time: '9:00 AM - 5:00 PM',
    location: 'Data Lab',
    description:
      'Intensive bootcamp covering machine learning, data visualization, and analytics.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    category: 'professional',
    tags: ['Data Science', 'Machine Learning', 'Analytics'],
    maxParticipants: 40,
    currentParticipants: 98,
    points: 200,
    volunteerHours: 0,
    difficulty: 'Beginner',
    isRegistered: false,
    status: 'upcoming',
  },
];
