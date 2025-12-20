import React from 'react';
const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  noPadding = false,
  bordered = true,
  shadow = true
}) => {
  const cardClasses = `
    bg-white rounded-lg overflow-hidden
    ${bordered ? 'border border-gray-200' : ''}
    ${shadow ? 'shadow-md' : ''}
    ${className}
  `;
  const bodyClasses = `
    ${!noPadding ? 'p-5' : ''}
    ${bodyClassName}
  `;
  return <div className={cardClasses}>
      {(title || subtitle) && <div className={`border-b border-gray-200 p-4 ${headerClassName}`}>
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>}
      <div className={bodyClasses}>
        {children}
      </div>
      {footer && <div className={`border-t border-gray-200 p-4 ${footerClassName}`}>
          {footer}
        </div>}
    </div>;
};
export default Card;