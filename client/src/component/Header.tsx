import React from 'react';
import styled from 'styled-components';
import {Icon} from './Icon';
import {SearchInput} from './SearchInput';
import {useState} from 'react';
import {Log} from './Log';
import {LOG_URL_GREEN, LOG_URL_WHITE} from '../constant/imgUrl';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState<'Register' | 'Login'>('Login');

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <LeftWrapper>
        <Log url={LOG_URL_GREEN} width={40} />
        <div>Gradual Community</div>
      </LeftWrapper>
      <RightWrapper>
        <SearchInput />
        <Time>
          <Icon name="time" size={1.5} />
          <p>UTC -05:00 Chicago</p>
        </Time>
        <Tips name="tips_2" size={1.5} />
        <Tips name="tips_1" size={1.5} />
        <Avatar name="avatar" onClick={() => setIsOpen(true)} />
        {isOpen && (
          <Modal>
            <ModalHeader>
              <Log url={LOG_URL_WHITE} />
              <CloseButton onClick={closeModal}>
                <Icon name="close" />
              </CloseButton>
            </ModalHeader>
            <Input
              value={''}
              placeholder="User Name"
              onInput={(e) => {
                console.log(e);
              }}
            />
            <Input
              value={''}
              placeholder="Password"
              onInput={(e) => {
                console.log(e);
              }}
            />
            <Input
              value={''}
              placeholder="Confirm password"
              onInput={(e) => {
                console.log(e);
              }}
            />

            <Button>login</Button>
          </Modal>
        )}
      </RightWrapper>
    </Container>
  );
};

const Modal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -300px;
  background: var(--mt-chat-white-font-color);
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  margin-top: 30px;
  width: 300px;
  height: 48px;
  background: var(--mt-chat-background-black-color);
  color: var(--mt-chat-white-font-color);
  border: 1px solid var(--mt-chat-background-black-color);
  font-size: var(--mt-chat-l-font-size);
  font-weight: var(--mt-font-weight-large);
`;

const CloseButton = styled.label`
  position: absolute;
  width: 40px;
  height: 40px;
  padding: 10px;
  right: 0;
  top: 0;
  cursor: pointer;
`;

const ModalHeader = styled.div`
  background: rgba(11, 12, 16);
  height: 68px;
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
`;

const Input = styled.input`
  height: 48px;
  width: 300px;
  margin-top: 30px;
  background: transparent;
  border-radius: 10px;
  border: 1px solid rgba(11, 12, 16);
  color: black;
  padding-left: var(--mt-spacing-1x);
`;

const Container = styled.div`
  width: var(--mt-chat-width);
  padding: var(--mt-spacing-2x) 30px var(--mt-spacing-2x) 26px;
  height: 70px;
  background: var(--mt-chat-black-color);
  display: flex;
  justify-content: space-between;
`;

const LeftWrapper = styled.div`
  display: flex;
  color: var(--mt-chat-white-font-color);
  align-items: center;
  gap: 25px;
  font-weight: 600;
  font-size: 14px;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Time = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;

  color: #929699;
  font-size: var(--mt-chat-m-font-size);
  svg:first-child {
    margin-right: var(--mt-spacing-1x);
  }
`;

const Tips = styled(Icon)`
  margin-left: var(--mt-spacing-3x);
`;

const Avatar = styled(Icon)`
  width: 36px;
  height: 36px;
  margin-left: 22px;
  cursor: pointer;
`;
