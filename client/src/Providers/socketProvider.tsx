import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {io, Socket} from 'socket.io-client';
import {host} from '../constant/requestUrls';
import {UserType} from '../component/Header';
import {Messages} from '../component/MembersContent';

type ServerToClientEvents = {
  'msg-receive': (value: Messages & {from: string}) => void;
};
type ClientToServerEvents = {
  'add-user': (v: string) => void;
  'send-msg': (v: {to: string; from: string; message: string}) => void;
};

type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const SocketContext = React.createContext<{
  currentUser?: UserType;
  setCurrentUser?: (v: UserType) => void;
  socket?: ClientSocket;
}>({});

export const useSocketContext = () => useContext(SocketContext);

export const SocketWrapper: FC<{children?: React.ReactNode}> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<UserType>(
    JSON.parse(localStorage.getItem('chat-user') ?? '{}')
  );
  const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(io(host));

  useEffect(() => {
    if (currentUser) {
      socket.current?.emit('add-user', currentUser._id);
    }
  }, [currentUser]);

  return (
    <SocketContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        socket: socket.current,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
