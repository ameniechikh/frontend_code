// componentsFournisseur/button.tsx
import React from 'react';

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type = 'button', className, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button; // Assurez-vous que c'est un export par défaut
