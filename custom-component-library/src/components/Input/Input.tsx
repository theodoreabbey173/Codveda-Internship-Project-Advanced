import React from 'react';
import './Input.css';

export interface InputProps {
  /**
   * Input label
   */
  label?: string;
  /**
   * Input type
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  /**
   * Input placeholder
   */
  placeholder?: string;
  /**
   * Input value
   */
  value?: string;
  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Is input disabled?
   */
  disabled?: boolean;
  /**
   * Is input required?
   */
  required?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Input name
   */
  name?: string;
  /**
   * Input ID
   */
  id?: string;
  /**
   * Full width input
   */
  fullWidth?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * ARIA label
   */
  ariaLabel?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  error,
  helperText,
  name,
  id,
  fullWidth = false,
  className = '',
  ariaLabel,
}) => {
  const baseClass = 'custom-input';
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  
  const containerClasses = `${baseClass}-container ${fullWidth ? `${baseClass}-container--full-width` : ''} ${className}`.trim();
  const inputClasses = `${baseClass} ${hasError ? `${baseClass}--error` : ''}`.trim();

  return (
    <div className={containerClasses}>
      {label && (
        <label 
          htmlFor={inputId} 
          className={`${baseClass}-label`}
        >
          {label}
          {required && <span className={`${baseClass}-required`} aria-label="required"> *</span>}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={inputClasses}
        aria-label={ariaLabel || label}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
      />
      {error && (
        <span 
          id={`${inputId}-error`}
          className={`${baseClass}-error-text`}
          role="alert"
        >
          {error}
        </span>
      )}
      {!error && helperText && (
        <span 
          id={`${inputId}-helper`}
          className={`${baseClass}-helper-text`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;