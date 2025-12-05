import React from 'react';
import { ButtonType } from '../types';

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
  type?: ButtonType;
  className?: string;
  doubleWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  type = ButtonType.NUMBER, 
  className = '',
  doubleWidth = false
}) => {
  
  const getBaseStyles = () => {
    switch (type) {
      case ButtonType.OPERATOR:
      case ButtonType.ACTION:
        // Google Blue for actions/operators
        return 'bg-google-blue-500 hover:bg-google-blue-600 text-white font-medium text-2xl shadow-button';
      case ButtonType.FUNCTION:
        // Darker gray for top row functions
        return 'bg-google-gray-300 hover:bg-google-gray-200 text-google-text-primary font-medium text-xl';
      case ButtonType.NUMBER:
      default:
        // Light gray for numbers
        return 'bg-google-gray-100 hover:bg-google-gray-200 text-google-text-primary font-medium text-2xl';
    }
  };

  const widthClass = doubleWidth ? 'col-span-2 w-full aspect-[2/1] rounded-[36px]' : 'w-full aspect-square rounded-full';

  return (
    <button
      onClick={() => onClick(label)}
      className={`
        ${widthClass}
        ${getBaseStyles()}
        flex items-center justify-center
        transition-all duration-200 active:scale-95 active:shadow-none
        ${className}
      `}
    >
      {label}
    </button>
  );
};