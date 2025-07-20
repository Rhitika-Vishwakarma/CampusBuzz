import React from 'react';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  shadow = 'sm',
  border = true,
  rounded = 'lg',
  ...props
}) => {
  // Base card styles
  const baseStyles = 'bg-white transition-all duration-200';

  // Hover effects
  const hoverStyles = hover
    ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
    : '';

  // Padding variants
  const paddingStyles = {
    none: '',
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  // Shadow variants
  const shadowStyles = {
    none: '',
    xs: 'shadow-xs',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  // Border variants
  const borderStyles = border ? 'border border-gray-200' : '';

  // Rounded variants
  const roundedStyles = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  // Combine all styles
  const cardStyles = `${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${shadowStyles[shadow]} ${borderStyles} ${roundedStyles[rounded]} ${className}`;

  return (
    <div className={cardStyles} {...props}>
      {children}
    </div>
  );
};

// Card Header Component
export const CardHeader = ({
  children,
  className = '',
  divider = false,
  ...props
}) => {
  const dividerStyles = divider ? 'border-b border-gray-200 pb-4 mb-4' : '';

  return (
    <div className={`${dividerStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Body Component
export const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

// Card Footer Component
export const CardFooter = ({
  children,
  className = '',
  divider = false,
  ...props
}) => {
  const dividerStyles = divider ? 'border-t border-gray-200 pt-4 mt-4' : '';

  return (
    <div className={`${dividerStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Title Component
export const CardTitle = ({
  children,
  className = '',
  size = 'lg',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-sm font-medium',
    md: 'text-base font-semibold',
    lg: 'text-lg font-semibold',
    xl: 'text-xl font-bold',
    '2xl': 'text-2xl font-bold',
  };

  return (
    <h3 className={`text-gray-900 ${sizeStyles[size]} ${className}`} {...props}>
      {children}
    </h3>
  );
};

// Card Description Component
export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-gray-600 text-sm mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
};

// Image Card Component
export const ImageCard = ({
  src,
  alt,
  title,
  description,
  children,
  imageHeight = 'h-48',
  className = '',
  hover = true,
  ...props
}) => {
  return (
    <Card hover={hover} padding="none" className={className} {...props}>
      {src && (
        <div className={`${imageHeight} overflow-hidden rounded-t-lg`}>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="p-4">
        {title && <CardTitle className="mb-2">{title}</CardTitle>}

        {description && <CardDescription>{description}</CardDescription>}

        {children}
      </div>
    </Card>
  );
};

// Stats Card Component
export const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  color = 'blue',
  trend,
  className = '',
  ...props
}) => {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
    gray: 'bg-gray-50 text-gray-600',
  };

  return (
    <Card className={`${className}`} {...props}>
      <div className="flex items-center">
        {icon && (
          <div className={`p-3 rounded-lg ${colorStyles[color]} mr-4`}>
            {icon}
          </div>
        )}

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>

          {(subtitle || trend) && (
            <div className="flex items-center mt-1">
              {trend && (
                <span
                  className={`text-sm font-medium ${
                    trend.type === 'increase'
                      ? 'text-green-600'
                      : trend.type === 'decrease'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {trend.value}
                </span>
              )}

              {subtitle && (
                <span className="text-sm text-gray-600 ml-2">{subtitle}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// Interactive Card Component
export const InteractiveCard = ({
  children,
  onClick,
  selected = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const interactiveStyles = `
    ${!disabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
    ${selected ? 'ring-2 ring-blue-500 border-blue-500' : ''}
    ${!disabled ? 'hover:shadow-md hover:border-gray-300' : ''}
    transition-all duration-200
  `;

  return (
    <Card
      className={`${interactiveStyles} ${className}`}
      onClick={!disabled ? onClick : undefined}
      {...props}
    >
      {children}
    </Card>
  );
};

// Compact Card Component
export const CompactCard = ({
  title,
  subtitle,
  value,
  icon,
  className = '',
  ...props
}) => {
  return (
    <Card padding="sm" className={className} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {icon && <div className="mr-3 text-gray-400">{icon}</div>}
          <div>
            <p className="text-sm font-medium text-gray-900">{title}</p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        </div>

        {value && (
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">{value}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Card;
