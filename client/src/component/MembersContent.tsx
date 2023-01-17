import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {SearchInput} from './SearchInput';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {getUsers, sendMessage} from '../constant/requests';
import {UserType} from './Header';
import {Icon} from './Icon';
import {MessageItem} from './MessageItem';

export type User = UserType & {_id: string};
export const MembersContent = () => {
  const params = useParams<{id: string}>();
  const selectedId = params?.id?.replace(':', '');

  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const currentUser = JSON.parse(localStorage.getItem('chat-user') ?? '');
  const selectedUser = users.find((item) => item._id === selectedId) as User;
  const messages =
    users.length > 0
      ? [
          {
            user: users[0],
            message: 'xxxxxx',
          },
          {
            user: users[1],
            message: 'xxxxxx',
          },
        ]
      : [];
  useEffect(() => {
    if (!localStorage.getItem('chat-user')) {
      return;
    }

    axios.get(`${getUsers}/${currentUser._id}`).then((res) => setUsers(res.data.users ?? []));
  }, []);

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
            {messages.map((item, index) => {
              const isSameUser = index !== 0 && messages[index].user?._id === item.user?._id;

              return (
                <MessageItem
                  key={item.user?._id}
                  message={item.message}
                  user={item?.user}
                  isRight={isSameUser}
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
                  console.log('huichzhixingle');
                  const {data} = await axios.post(sendMessage, {
                    from: currentUser._id,
                    to: [selectedUser._id],
                    message,
                  });
                  console.log('data------');
                  console.log(data);
                }
              }}
              onInput={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setMessage(value);
              }}
            />
          </MessageInputWrapper>
        </ActiveChannelContent>
      </ContentRight>
    </Content>
  );
};

const MessageContainer = styled.div`
  display: flex;
  flex-grow: 1;
  color: white;
  padding: 20px;
  flex-direction: column;
  gap: 30px;
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
  height: 100%;
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
  font-size: 14px;
  width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  padding: 0 20px 0 20px;
  color: var(--mt-chat-white-font-color);
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
