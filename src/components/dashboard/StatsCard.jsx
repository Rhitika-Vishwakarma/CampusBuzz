import React, { useEffect, useState } from 'react';

const StatsCard = ({
  icon: Icon,
  label,
  value,
  color = 'blue',
  trend = null,
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const finalValue =
      typeof value === 'string' ? parseInt(value.replace(/\D/g, '')) : value;
    let startValue = 0;
    const increment = finalValue / 20;
    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= finalValue) {
        setAnimatedValue(finalValue);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(startValue));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [value]);

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    green: 'bg-green-50 text-green-600 border-green-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  };

  const iconColorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500',
    indigo: 'text-indigo-500',
  };

  const formatValue = (val) => {
    if (typeof value === 'string' && value.includes('+')) {
      return `${val}+`;
    }
    return val.toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div
            className={`inline-flex p-3 rounded-lg ${colorClasses[color]} mb-4`}
          >
            <Icon className={`h-6 w-6 ${iconColorClasses[color]}`} />
          </div>

          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">
            {formatValue(animatedValue)}
          </p>

          {trend && (
            <div
              className={`flex items-center mt-2 text-sm ${
                trend.positive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  trend.positive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {trend.positive ? '↗' : '↘'} {trend.value}
              </span>
              <span className="ml-2 text-gray-500">{trend.label}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
