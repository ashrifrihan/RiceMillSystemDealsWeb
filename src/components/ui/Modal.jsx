import React, { useEffect } from 'react';
import { XIcon } from 'lucide-react';
import Button from './Button';
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOutsideClick = true
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const handleOutsideClick = e => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOutsideClick}>
      <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {children}
        </div>
        {footer && <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            {footer}
          </div>}
      </div>
    </div>;
};
export default Modal;