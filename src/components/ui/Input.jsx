import React from 'react';
import { Search } from 'lucide-react';

const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  variant = 'default',
  className = '',
  icon = null,
  ...props
}) => {
  const baseStyles =
    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200';

  const variants = {
    default: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
    search:
      'border-gray-300 focus:ring-purple-500 focus:border-purple-500 pl-10',
    error: 'border-red-300 focus:ring-red-500 focus:border-red-500',
    success: 'border-green-300 focus:ring-green-500 focus:border-green-500',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (variant === 'search') {
    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={combinedClassName}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={icon ? `${combinedClassName} pl-10` : combinedClassName}
        {...props}
      />
    </div>
  );
};

// Demo component to show different variants
const InputDemo = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [textValue, setTextValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Input Component Demo
        </h1>

        <div className="space-y-6">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Events
            </label>
            <Input
              variant="search"
              placeholder="Search for events, clubs, or activities..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {/* Default Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <Input
              placeholder="Enter your full name"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="your.email@college.edu"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              variant="success"
            />
          </div>

          {/* Error State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password (Error State)
            </label>
            <Input
              type="password"
              placeholder="Enter password"
              variant="error"
            />
            <p className="text-red-500 text-sm mt-1">
              Password must be at least 8 characters
            </p>
          </div>

          {/* Preview Values */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">
              Current Values:
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Search:</span>{' '}
                {searchValue || 'Empty'}
              </p>
              <p>
                <span className="font-medium">Name:</span>{' '}
                {textValue || 'Empty'}
              </p>
              <p>
                <span className="font-medium">Email:</span>{' '}
                {emailValue || 'Empty'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 border-l-4 border-blue-500 bg-blue-50">
          <h4 className="font-semibold text-blue-800">Component Features:</h4>
          <ul className="text-blue-700 text-sm mt-2 space-y-1">
            <li>• Search variant with built-in search icon</li>
            <li>• Error, success, and default states</li>
            <li>• Smooth focus transitions</li>
            <li>• Fully accessible with proper focus management</li>
            <li>• Customizable with className prop</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InputDemo;
