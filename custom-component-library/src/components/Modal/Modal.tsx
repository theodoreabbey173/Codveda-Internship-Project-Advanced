import React, { useEffect } from 'react';
import './Modal.css';

export interface ModalProps {
  /**
   * Is modal open?
   */
  isOpen: boolean;
  /**
   * Close handler
   */
  onClose: () => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Modal size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Show close button
   */
  showCloseButton?: boolean;
  /**
   * Close on backdrop click
   */
  closeOnBackdrop?: boolean;
  /**
   * Custom className
   */
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnBackdrop = true,
  className = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      onClose();
    }
  };

  const baseClass = 'custom-modal';
  const sizeClass = `${baseClass}__content--${size}`;
  const modalClasses = `${baseClass}__content ${sizeClass} ${className}`.trim();

  return (
    <div 
      className={`${baseClass}__backdrop`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div className={modalClasses}>
        {(title || showCloseButton) && (
          <div className={`${baseClass}__header`}>
            {title && (
              <h2 id="modal-title" className={`${baseClass}__title`}>
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                className={`${baseClass}__close-button`}
                onClick={onClose}
                aria-label="Close modal"
              >
                &times;
              </button>
            )}
          </div>
        )}
        <div className={`${baseClass}__body`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;