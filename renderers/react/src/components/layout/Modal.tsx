/*
 Copyright 2025 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import { useState, useCallback, useRef, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import type { Types } from '@a2ui/lit/0.8';
import type { A2UIComponentProps } from '../../types';
import { useA2UIComponent } from '../../hooks/useA2UIComponent';
import { classMapToString, stylesToObject } from '../../lib/utils';
import { ComponentNode } from '../../core/ComponentNode';

/**
 * Modal component - displays content in a dialog overlay.
 *
 * The entryPointChild component triggers the modal to open.
 * The contentChild is displayed inside the modal dialog.
 */
export const Modal = memo(function Modal({ node, surfaceId }: A2UIComponentProps<Types.ModalNode>) {
  const { theme } = useA2UIComponent(node, surfaceId);
  const props = node.properties;

  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Sync dialog element state with React state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Handle backdrop clicks
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      const dialog = dialogRef.current;
      if (dialog && e.target === dialog) {
        closeModal();
      }
    },
    [closeModal]
  );

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDialogElement>) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  const dialogContent = (
    <dialog
      ref={dialogRef}
      className={classMapToString(theme.components.Modal.element)}
      style={stylesToObject(theme.additionalStyles?.Modal)}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="a2ui-modal__content">
        <button
          className="a2ui-modal__close"
          onClick={closeModal}
          aria-label="Close modal"
        >
          ×
        </button>
        <ComponentNode node={props.contentChild} surfaceId={surfaceId} />
      </div>
    </dialog>
  );

  return (
    <>
      {/* Entry point (trigger) */}
      <div onClick={openModal} style={{ cursor: 'pointer' }}>
        <ComponentNode node={props.entryPointChild} surfaceId={surfaceId} />
      </div>

      {/* Modal dialog - rendered in portal */}
      {isOpen && createPortal(dialogContent, document.body)}
    </>
  );
});

export default Modal;
