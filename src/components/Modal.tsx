import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { openModalAtom } from '../states/atom';

interface Props {
  children: React.ReactNode;
  title: string;
}

function Modal({ children, title }: Props) {
  const modalRef = useRef(document.createElement('div'));
  const [modalOpen, setModalOpen] = useRecoilState(openModalAtom);

  useEffect(() => {
    const clickOutside = (e: Event) => {
      const target = e.target as Element;
      const condition = modalRef.current.contains(target);
      if (!condition) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalWrap tabIndex={-1} className={modalOpen ? 'on' : 'off'}>
      <ModalContent ref={modalRef}>
        <ModalHeader>
          <HeaderTitle>{title}</HeaderTitle>
          <ModalClose onClick={closeModal} />
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalWrap>
  );
}

export default Modal;

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1040;

  &.off {
    display: none;
  }
`;

const ModalContent = styled.div`
  position: relative;
  width: calc(60vw);
  height: auto;
  max-height: calc(100vh - 40px);
  top: 50%;
  left: 50%;
  padding: 20px;
  border-radius: 20px;
  background: ${({ theme }) => theme.bgColor};
  outline: 0;
  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const ModalClose = styled.button`
  width: 16px;
  height: 16px;
  background: url(${'/images/close.png'}) no-repeat 50% 50%;
  background-size: cover;
  cursor: pointer;
  z-index: 100;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 0 20px 0;
  margin-bottom: 10px;
`;

const HeaderTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: normal;
`;

const ModalBody = styled.div`
  line-height: 1.5;
`;
