import React from 'react';
import './Card.css';

export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Card title
   */
  title?: string;
  /**
   * Card subtitle
   */
  subtitle?: string;
  /**
   * Card image URL
   */
  imageUrl?: string;
  /**
   * Image alt text for accessibility
   */
  imageAlt?: string;
  /**
   * Card elevation/shadow
   */
  elevation?: 'low' | 'medium' | 'high';
  /**
   * Card is hoverable
   */
  hoverable?: boolean;
  /**
   * Card click handler
   */
  onClick?: () => void;
  /**
   * Custom className
   */
  className?: string;
  /**
   * ARIA label
   */
  ariaLabel?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  imageUrl,
  imageAlt = 'Card image',
  elevation = 'medium',
  hoverable = false,
  onClick,
  className = '',
  ariaLabel,
}) => {
  const baseClass = 'custom-card';
  const elevationClass = `${baseClass}--elevation-${elevation}`;
  const hoverableClass = hoverable ? `${baseClass}--hoverable` : '';
  const clickableClass = onClick ? `${baseClass}--clickable` : '';
  
  const classes = `${baseClass} ${elevationClass} ${hoverableClass} ${clickableClass} ${className}`.trim();

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={classes}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
    >
      {imageUrl && (
        <div className={`${baseClass}__image-container`}>
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className={`${baseClass}__image`}
          />
        </div>
      )}
      <div className={`${baseClass}__content`}>
        {title && (
          <h3 className={`${baseClass}__title`}>{title}</h3>
        )}
        {subtitle && (
          <p className={`${baseClass}__subtitle`}>{subtitle}</p>
        )}
        <div className={`${baseClass}__body`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;