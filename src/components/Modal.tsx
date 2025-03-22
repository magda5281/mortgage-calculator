import React, { useRef, useEffect } from 'react';
import dialogPolyfill from 'dialog-polyfill';
import { X } from 'lucide-react';
import '../styles/modal.css';
import { useClickOutside } from '../hooks/useClickOutside';
import { ModalProps } from '../../types';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  title,
  closeOnOutsideClick,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    // Apply the polyfill if showModal is not supported like in older safari browsers
    const needsPolyfill = (dialog: HTMLDialogElement) => {
      return (
        dialog &&
        typeof dialog.showModal !== 'function' &&
        !dialog.hasAttribute('data-polyfilled')
      );
    };

    if (dialog) {
      if (needsPolyfill(dialog)) {
        dialogPolyfill.registerDialog(dialog);
      }
      if (isOpen && !dialog.open) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }, [isOpen]);

  useClickOutside(modalRef, onClose, closeOnOutsideClick);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={`modal  ${className}`}
      onCancel={onClose}>
      <div ref={modalRef} className="modal_content">
        <div className="modal_header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
};
