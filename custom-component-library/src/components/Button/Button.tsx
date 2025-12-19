import React from 'react';
import './Button.css';

export interface ButtonProps {
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Is button disabled?
   */
  disabled?: boolean;
  /**
   * Full width button
   */
  fullWidth?: boolean;
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
  /**
   * Custom className
   */
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  ariaLabel,
  className = '',
}) => {
  const baseClass = 'custom-button';
  const variantClass = `${baseClass}--${variant}`;
  const sizeClass = `${baseClass}--${size}`;
  const fullWidthClass = fullWidth ? `${baseClass}--full-width` : '';
  
  const classes = `${baseClass} ${variantClass} ${sizeClass} ${fullWidthClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;