import React from 'react';
import styled from 'styled-components';
import {Icon} from './Icon';
import {SearchInput} from './SearchInput';
import {useState} from 'react';
import {Log} from './Log';
import {LOG_URL_GREEN, LOG_URL_WHITE} from '../constant/imgUrl';
import {LoginForm} from './LoginForm';
import {RegisterForm} from './RegisterForm';
import {ToastContainer} from 'react-toastify';
import {useSocketContext} from '../Providers/socketProvider';

export type ActionType = 'Register' | 'Login';

export type UserType = {
  username?: string;
  _id: string;
  avatarImage?: string;
};
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType>('Login');
  const {currentUser} = useSocketContext();
  const closeModal = () => {
    setIsOpen(false);
  };

  const updateActionType = (action: ActionType) => {
    setActionType(action);
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
        {currentUser?.avatarImage ? (
          <Avatar src={currentUser?.avatarImage} alt="" onClick={() => setIsOpen(true)} />
        ) : (
          <AvatarIcon name="avatar" onClick={() => setIsOpen(true)} />
        )}

        {isOpen && (
          <Modal>
            <ModalHeader>
              <Log url={LOG_URL_WHITE} />
              <CloseButton onClick={closeModal}>
                <Icon name="close" />
              </CloseButton>
            </ModalHeader>
            {actionType === 'Login' ? (
              <LoginForm updateActionType={updateActionType} closeModal={closeModal} />
            ) : (
              <RegisterForm updateActionType={updateActionType} closeModal={closeModal} />
            )}
          </Modal>
        )}
        <ToastContainer />
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

const avatarStyled = `
  width: 36px;
  height: 36px;
  margin-left: 22px;
  cursor: pointer;
`;

const AvatarIcon = styled(Icon)`
  ${avatarStyled}
`;
const Avatar = styled.img`
  ${avatarStyled};
  border-radius: 50%;
`;
