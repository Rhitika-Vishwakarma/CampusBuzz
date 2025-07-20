import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const baseClasses =
    'inline-flex items-center font-medium rounded-full transition-colors';

  const variants = {
    default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    success: 'bg-green-100 text-green-800 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    danger: 'bg-red-100 text-red-800 hover:bg-red-200',
    info: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200',
    purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    indigo: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return <span className={classes}>{children}</span>;
};

// Demo component to show all badge variants
const BadgeDemo = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Badge Component Demo
        </h1>

        {/* Variants Demo */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Badge Variants
          </h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="danger">Cancelled</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="purple">Premium</Badge>
            <Badge variant="indigo">Featured</Badge>
          </div>
        </div>

        {/* Sizes Demo */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Badge Sizes
          </h2>
          <div className="flex items-center gap-4">
            <Badge variant="primary" size="sm">
              Small
            </Badge>
            <Badge variant="primary" size="md">
              Medium
            </Badge>
            <Badge variant="primary" size="lg">
              Large
            </Badge>
          </div>
        </div>

        {/* Use Cases Demo */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Common Use Cases
          </h2>
          <div className="space-y-4">
            {/* Event Status */}
            <div className="flex items-center gap-3">
              <span className="text-gray-700">Event Status:</span>
              <Badge variant="success">Confirmed</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="danger">Cancelled</Badge>
            </div>

            {/* Club Categories */}
            <div className="flex items-center gap-3">
              <span className="text-gray-700">Club Type:</span>
              <Badge variant="purple">Technical</Badge>
              <Badge variant="indigo">Cultural</Badge>
              <Badge variant="info">Sports</Badge>
              <Badge variant="primary">Academic</Badge>
            </div>

            {/* User Roles */}
            <div className="flex items-center gap-3">
              <span className="text-gray-700">User Role:</span>
              <Badge variant="success" size="sm">
                Member
              </Badge>
              <Badge variant="warning" size="sm">
                Moderator
              </Badge>
              <Badge variant="danger" size="sm">
                Admin
              </Badge>
            </div>

            {/* Achievement Levels */}
            <div className="flex items-center gap-3">
              <span className="text-gray-700">Achievement:</span>
              <Badge variant="default" size="sm">
                Bronze
              </Badge>
              <Badge variant="warning" size="sm">
                Silver
              </Badge>
              <Badge variant="success" size="sm">
                Gold
              </Badge>
              <Badge variant="purple" size="sm">
                Platinum
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badge;
export { BadgeDemo };
