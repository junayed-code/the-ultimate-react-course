import React from 'react';
import styled from 'styled-components';

import Button from '@ui/button';
import Heading from '@ui/heading';
import Spinner from '@ui/spinner';
import Modal, { type ModalContextValue } from '@ui/modal';

const ModalButton = styled(Button)`
  width: 7rem;
`;

type ConfirmDeleteModalProps = {
  resourceName: string;
  onConfirm(arg: ModalContextValue): void;
  isDeleting?: boolean;
  OpenButtonCom: React.ComponentType;
};

function ConfirmDeleteModal(props: ConfirmDeleteModalProps) {
  const { resourceName, onConfirm, isDeleting, OpenButtonCom } = props;

  return (
    <Modal>
      {modal => (
        <>
          <Modal.Open as={OpenButtonCom} />
          <Modal.Box>
            <Modal.Header $mb="0.5rem">
              <Heading as="h5" $size="1.125rem">
                Delete {resourceName}
              </Heading>
            </Modal.Header>

            <Modal.Body as="p" $mb="1.5rem">
              Are you sure you want to delete this {resourceName} permanently?
              This action cannot be undone.
            </Modal.Body>

            <Modal.Action>
              <Modal.Close
                as={ModalButton}
                $variant="secondary"
                disabled={isDeleting}
              >
                Cancel
              </Modal.Close>

              {/* Delete button */}
              <ModalButton
                $variant="danger"
                disabled={isDeleting}
                onClick={onConfirm.bind(void 0, modal)}
              >
                {isDeleting && <Spinner $size="sm" />} Delete
              </ModalButton>
            </Modal.Action>
          </Modal.Box>
        </>
      )}
    </Modal>
  );
}

export default ConfirmDeleteModal;
