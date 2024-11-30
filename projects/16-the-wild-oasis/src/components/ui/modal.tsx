import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import React, { createContext, useContext } from 'react';
import { HiXMark } from 'react-icons/hi2';

import Row from '@ui/row';
import Button from '@ui/button';

// Modal animation duration
const AD = 200;

const modalBoxSize = { large: '42rem', medium: '26rem' };

type BaseStylesProps = Partial<
  Record<'$mt' | '$mb' | '$pt' | '$pb' | '$pr' | '$pl', string>
>;

const baseStyles = css<BaseStylesProps>`
  ${({ $mt }) => $mt && `margin-top: ${$mt}`};
  ${({ $mb }) => $mb && `margin-bottom: ${$mb}`};
  ${({ $pt }) => $pt && `padding-top: ${$pt}`};
  ${({ $pb }) => $pb && `padding-bottom: ${$pb}`};
  ${({ $pr }) => $pr && `padding-right: ${$pr}`};
  ${({ $pl }) => $pl && `padding-left: ${$pl}`};
`;

const StyledModal = styled.dialog`
  width: 100%;
  height: 100%;
  border: none;
  max-width: none;
  max-height: none;
  overflow: hidden;
  visibility: hidden;
  pointer-events: none;
  background-color: transparent;
  opacity: 0;
  position: fixed;
  inset: 0;
  z-index: 999;
  display: grid;
  align-items: center;
  justify-items: center;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transition-property: opacity, visibility;

  &[open] {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    & > div {
      transform: scale(1);
    }
  }

  &::backdrop {
    backdrop-filter: blur(2px);
    background: var(--backdrop-color);
  }
`;

type StyledModalBoxProps = BaseStylesProps & {
  $size?: keyof typeof modalBoxSize;
};

const StyledModalBox = styled.div<StyledModalBoxProps>`
  width: 95%;
  padding: 1.75rem 2.125rem;
  max-width: ${({ $size = 'medium' }) => modalBoxSize[$size]};
  max-height: calc(100dvh - 5em);
  overflow-y: auto;
  overscroll-behavior: contain;
  grid-row-start: 1;
  grid-column-start: 1;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
  color: var(--color-grey-700);
  background-color: var(--color-grey);
  border-radius: var(--border-radius-lg);
  transform: scale(0.9);
  transition: transform ${AD}ms ease;
  position: relative;
  ${baseStyles}
`;

const StyledModalHeader = styled(Row).attrs<BaseStylesProps>({
  $align: 'start',
  $justify: 'between',
})`
  ${baseStyles}
`;

const StyledModalBody = styled.div<BaseStylesProps>`
  font-size: 0.875rem;
  color: var(--color-grey-700);
  ${baseStyles}
`;

const StyledModalAction = styled(Row).attrs<BaseStylesProps>({
  $gap: '0.75rem',
  $justify: 'end',
})`
  ${baseStyles}
`;

const StyledButton = styled(Button).attrs({ $variant: 'secondary' })``;

const ModalCloseButton = styled(Button).attrs({
  $size: 'icon',
  $variant: 'secondary',
  children: <HiXMark />,
})`
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background: none;
  top: 0.75rem;
  right: 0.75rem;
  position: absolute;

  &:disabled {
    background: none;
  }
  & svg {
    color: var(--color-grey-500);
  }
`;

const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

export type ModalContextValue = {
  open: boolean;
  handleOpen(): void;
  handleClose(): void;
  modalRef: React.RefObject<HTMLDialogElement>;
};

const ModalContext = createContext({} as ModalContextValue);
const useModal = () => useContext(ModalContext);

type ModalProps = {
  open?: boolean;
  children?: React.ReactNode | ((modal: ModalContextValue) => React.ReactNode);
};

function Modal({ open: _open = false, children }: ModalProps) {
  const modalRef = React.useRef<HTMLDialogElement>(null);
  const [open, setOpen] = React.useState(_open);

  const handleOpen = () => (
    setOpen(true), setTimeout(() => modalRef.current?.showModal())
  );

  const handleClose = () => (
    modalRef.current?.close(), setTimeout(() => setOpen(false), AD)
  );

  React.useEffect(() => {
    const modal = modalRef.current;
    if (modal === null) return;

    modal.addEventListener('close', handleClose);
    return () => modal.removeEventListener('close', handleClose);
  }, [open]);

  return (
    <ModalContext.Provider value={{ handleOpen, handleClose, modalRef, open }}>
      {typeof children === 'function'
        ? children({ handleClose, handleOpen, modalRef, open })
        : children}
    </ModalContext.Provider>
  );
}

type BoxProps = React.ComponentProps<typeof StyledModalBox>;

function ModalBox({ children, ...props }: BoxProps) {
  const { open, modalRef, handleClose } = useModal();

  if (!open) return null;

  return createPortal(
    <StyledModal onClick={handleClose} ref={modalRef}>
      <StyledModalBox onClick={handleStopPropagation} {...props}>
        {children}
        <ModalCloseButton onClick={handleClose} />
      </StyledModalBox>
    </StyledModal>,
    document.body,
  );
}

type OpenButtonProps<Com extends React.ComponentType> =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: Com;
  } & React.ComponentProps<Com>;

function OpenButton<Com extends React.ComponentType>({
  as: _as,
  ...props
}: OpenButtonProps<Com>) {
  const { handleOpen } = useModal();

  const Button = _as ? _as : StyledButton;

  return <Button {...props} onClick={handleOpen} />;
}

type CloseButtonProps<Com extends React.ComponentType> =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: Com;
  } & React.ComponentProps<Com>;

function CloseButton<Com extends React.ComponentType>({
  as: _as,
  ...props
}: CloseButtonProps<Com>) {
  const { handleClose } = useModal();

  const Button = _as ? _as : StyledButton;

  return <Button {...props} onClick={handleClose} />;
}

Modal.Box = ModalBox;
Modal.Open = OpenButton;
Modal.Close = CloseButton;
Modal.Body = StyledModalBody;
Modal.Header = StyledModalHeader;
Modal.Action = StyledModalAction;

export default Modal;
