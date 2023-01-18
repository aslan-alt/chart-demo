import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {SearchInput} from './SearchInput';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {getAllMessages, getUsers, sendMessage} from '../constant/requestUrls';
import {UserType} from './Header';
import {Icon} from './Icon';
import {MessageItem} from './MessageItem';
import {toast} from 'react-toastify';
import {useSocketContext} from '../hooks/socketProvider';
import {QuoteReply} from './QuoteReply';

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
  const [arrivalMessage, setArrivalMessage] = useState<Messages>();

  const [quoteMessage, setQuoteMessage] = useState<string>();

  const params = useParams<{id: string}>();
  const selectedId = params?.id?.replace(':', '');

  const {currentUser, socket} = useSocketContext();

  const selectedUser = users.find((item) => item?._id === selectedId) as User;

  useEffect(() => {
    if (!localStorage.getItem('chat-user')) {
      return;
    }
    if (currentUser?._id) {
      axios.get(`${getUsers}/${currentUser._id}`).then((res) => setUsers(res.data.users ?? []));
    }
  }, []);

  useEffect(() => {
    if (selectedUser?._id) {
      axios
        .post(`${getAllMessages}`, {
          from: currentUser?._id,
          to: [selectedUser?._id],
        })
        .then((res) => setAllMessages(res.data ?? []));
    }
  }, [selectedUser]);

  useEffect(() => {
    socket?.on('msg-receive', (serverDate) => {
      setArrivalMessage({
        ...serverDate,
        fromSelf: false,
        sender: serverDate.from,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage && setAllMessages((state) => [...state, arrivalMessage]);
  }, [arrivalMessage]);

  return (
    <Content>
      <ContentLeft>
        <StyledInput iconSize={2} />
        <Users>
          {users.map((user) => {
            const isActive = selectedId === user._id;
            return (
              <UserItem key={user._id} to={`/members/user/:${user._id}`} $isActive={isActive}>
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
            {allMessages.map((item, index) => {
              const user = item.fromSelf
                ? currentUser
                : users.find((user) => {
                    return user._id === item.sender;
                  });

              return (
                <MessageItem
                  key={index + item.message}
                  username={user?.username ?? ''}
                  avatarImage={user?.avatarImage ?? ''}
                  message={item.message}
                  updatedAt={item.updatedAt}
                  isSelf={item.fromSelf}
                  quote={item.quote}
                  setQuoteMessage={setQuoteMessage}
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
                  if (message === '') {
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
