import React from "react";
import styled from "styled-components";

interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal = ({ title, message, onConfirm, onCancel }: ModalProps) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ModalButtons>
          <Button onClick={onCancel}>취소</Button>
          <Button onClick={onConfirm}>복구</Button>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #292929;
  color: #d4d4d4;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ModalMessage = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  &:nth-child(2) {
    background-color: #f44336; // 취소와 복구 버튼 색상 차이
  }
`;
