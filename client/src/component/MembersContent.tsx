import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {SearchInput} from './SearchInput';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {sendMessage} from '../constant/requestUrls';
import {UserType} from './Header';
import {Icon} from './Icon';
import {MessageItem} from './MessageItem';
import {toast} from 'react-toastify';
import {useSocketContext} from '../Providers/socketProvider';
import {QuoteReply} from './QuoteReply';
import {useGetUsers} from '../hooks/useGetUsers';
import {useGetAllMessages} from '../hooks/useGetAllMessages';
import {isEmpty} from 'lodash';

export type Messages = {
  fromSelf: boolean;
  message: string;
  updatedAt: string;
  sender: string;
  quote?: string;
};

export type User = UserType & {_id?: string};
export const MembersContent = () => {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [allMessages, setAllMessages] = useState<Messages[]>([]);

  const [quoteMessage, setQuoteMessage] = useState<string>();

  const params = useParams<{id: string}>();
  const selectedId = params?.id?.replace(':', '');

  const {currentUser, socket} = useSocketContext();

  useGetUsers({onSuccess: setUsers, id: currentUser?._id});

  const selectedUser = users.find((item) => item?._id === selectedId) as User;
  useGetAllMessages({from: currentUser?._id, to: selectedUser?._id, onSuccess: setAllMessages});

  useEffect(() => {
    socket?.on('msg-receive', (serverDate) => {
      const newArrivalMessage = {
        ...serverDate,
        fromSelf: false,
        sender: serverDate.from,
      };
      setAllMessages((state) => [...state, newArrivalMessage]);
    });
  }, []);

  return (
    <Content>
      <ContentLeft>
        <StyledInput iconSize={2} />
        <Users>
          {users.map((user) => {
            return (
              <UserItem
                key={user._id}
                to={`/members/user/:${user._id}`}
                $isActive={selectedId === user._id}
              >
                <Avatar src={user.avatarImage} alt="" />
                <Name>{user.username}</Name>
              </UserItem>
            );
          })}
        </Users>
      </ContentLeft>
      <ContentRight>
        <ActiveChannelHeader>
          {selectedUser?.username ?? ''}
          <GroupButton>
            <Icon name="users" size={1.5} />
          </GroupButton>
        </ActiveChannelHeader>
        <ActiveChannelContent>
          <MessageContainer>
            {allMessages.map((item) => {
              const user = item.fromSelf
                ? currentUser
                : users.find((user) => {
                    return user._id === item.sender;
                  });

              return (
                <MessageItem
                  key={item.updatedAt}
                  message={item.message}
                  updatedAt={item.updatedAt}
                  isSelf={item.fromSelf}
                  quote={item.quote}
                  setQuoteMessage={setQuoteMessage}
                  username={user?.username ?? ''}
                  avatarImage={user?.avatarImage ?? ''}
                />
              );
            })}
          </MessageContainer>
          <MessageInputWrapper>
            <MessageInput
              placeholder="Enter"
              value={message}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  if (isEmpty(message) || isEmpty(selectedUser._id)) {
                    return;
                  }

                  const {data} = await axios.post(sendMessage, {
                    from: currentUser?._id ?? '',
                    to: [selectedUser._id],
                    message,
                    ...(quoteMessage ? {quote: quoteMessage} : {}),
                  });

                  socket?.emit('send-msg', data.lastMessage);
                  data?.allMessage && setAllMessages(data?.allMessage);

                  toast('sent successful!', {
                    type: 'success',
                  });
                  setMessage('');
                  setQuoteMessage(undefined);
                }
              }}
              onInput={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setMessage(value);
              }}
            />
            {quoteMessage && (
              <QuoteReplyWrapper>
                <QuoteReply quoteMessage={quoteMessage} />
                <CloseWrapper
                  onClick={() => {
                    setQuoteMessage(undefined);
                  }}
                >
                  <Icon name="close" size={0.8} />
                </CloseWrapper>
              </QuoteReplyWrapper>
            )}
          </MessageInputWrapper>
        </ActiveChannelContent>
      </ContentRight>
    </Content>
  );
};

const overflowStyle = `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CloseWrapper = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #35343e;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const QuoteReplyWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MessageContainer = styled.div`
  display: flex;
  height: 680px;
  color: white;
  padding: 20px;
  overflow: auto;
  flex-direction: column;
  gap: 30px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: black;
  }

  ::-webkit-scrollbar-thumb {
    background: #4e4e4e;
    border-radius: 25px;
  }
`;

const UserItem = styled(Link)<{$isActive: boolean}>`
  display: flex;
  height: 75px;
  background: var(--mt-chat-background-black-color);
  ${(props) => (props.$isActive ? 'background:#26252D;' : '')}
  padding: 0 20px 0 20px;
  align-items: center;
`;

const MessageInput = styled.input`
  width: 100%;
  flex-grow: 1;
  border: none;
  background: transparent;
  color: white;
  font-size: var(--mt-chat-l-font-size);
  font-weight: 500;
`;

const StyledInput = styled(SearchInput)`
  width: 100%;
  height: 64px;
  border-radius: 0;
  font-weight: var(--mt-font-weight-medium);
  font-size: var(--mt-spacing-2x);
  background: var(--mt-chat-background-black-color);
  color: #7b798f;
  border-bottom: 2px solid rgb(39, 38, 42);
  padding: 20px;
  input {
    margin-left: 12px;
  }
`;

const Users = styled.div``;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
`;

export const Name = styled.p`
  color: white;
  margin-left: 2px;
  font-weight: 500;
  font-size: 12px;
  width: 240px;
  ${overflowStyle}
`;

const ActiveChannelHeader = styled.div`
  height: 64px;
  color: var(--mt-chat-white-font-color);
  font-weight: 600;
  font-size: 18px;
  padding: 10px 20px 10px 20px;
  border-bottom: 2px solid rgb(46, 45, 51);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActiveChannelContent = styled.div`
  height: 782px;
  display: flex;
  flex-direction: column;
`;

const GroupButton = styled.button`
  border: none;
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
  width: 90px;
  height: 100%;
  border-radius: 50px;
  font-weight: 600;
  font-size: 15px;
  color: var(--mt-chat-white-font-color);
  background: rgb(28, 28, 34);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageInputWrapper = styled.label`
  border-top: 2px solid rgb(46, 45, 51);
  height: 100px;
  padding: 0 20px 20px 20px;
  color: var(--mt-chat-white-font-color);
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
`;

const ContentLeft = styled.div`
  background: var(--mt-chat-background-black-color);
`;

const ContentRight = styled.div`
  background: #26252d;
  height: 846px;
`;
