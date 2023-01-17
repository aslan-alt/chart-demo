import styled from 'styled-components';
import {Avatar, Name, User} from './MembersContent';
import React, {FC, useState} from 'react';
import {Icon} from './Icon';

type Props = {
  user: User;
  isRight: boolean;
  message: string;
};

export const MessageItem: FC<Props> = ({user, isRight, message}) => {
  const [show, setShow] = useState(false);
  return (
    <Container isRight={isRight}>
      <Avatar src={user?.avatarImage} alt="" />
      <div>
        <NameAndTime>
          <Name>{user.username}</Name> <span>20:34</span>{' '}
        </NameAndTime>
        <MessageWrapper>
          <Message
            onClick={() => {
              setShow(!show);
            }}
          >
            {message}
          </Message>
          {show && (
            <Icons>
              <Icon name="quote" size={1.3} />
              <Icon name="delete" size={1.3} />
            </Icons>
          )}
        </MessageWrapper>
      </div>
    </Container>
  );
};

const Icons = styled.div`
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
  display: flex;
  gap: 20px;
  height: 40px;
  width: 90px;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  border-radius: 10px;
`;

const Container = styled.div<{isRight: boolean}>`
  display: flex;
  flex-grow: 1;
  max-height: 80px;
  gap: 3px;

  ${(props) => {
    return props.isRight ? 'justify-content: flex-end;' : '';
  }};
`;

const NameAndTime = styled.div`
  color: #c9c7d0;
  font-weight: var(--mt-font-weight-medium);
  font-size: var(--mt-chat-s-font-size);
  max-width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-weight: var(--mt-font-weight-medium);
    font-size: 12px;
    color: white;
  }
`;

const Message = styled.p`
  font-weight: var(--mt-font-weight-medium);
  font-size: 14px;
  width: 399px;
  height: 54px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #454451;
  display: flex;
  align-items: center;
  padding: 15px;
  margin-top: 6px;
  color: white;
  border-radius: 6px;
`;

const MessageWrapper = styled.div`
  font-weight: var(--mt-font-weight-medium);
  font-size: 14px;
  height: 54px;
  display: flex;
  align-items: center;
  padding: 15px;
  margin-top: 6px;
  color: white;
  gap: 8px;
`;
