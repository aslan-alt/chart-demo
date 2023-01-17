import styled from 'styled-components';
import React, {FC, useState} from 'react';
import {ActionType} from './Header';
import {FormTarget} from './RegisterForm';
import axios from 'axios';
import {loginUrl} from '../constant/requestUrls';
import {toast} from 'react-toastify';
import {useSocketContext} from '../hooks/socketProvider';

type Props = {
  updateActionType: (v: ActionType) => void;
  closeModal: () => void;
};
// TODO: Refactor LoginForm and RegisterForm

export const LoginForm: FC<Props> = ({updateActionType, closeModal}) => {
  const {setCurrentUser} = useSocketContext();
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  const updateForm = (e: FormTarget) => {
    setLoginForm((state) => ({...state, ...{[e.name]: e.value}}));
  };

  const onLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(loginUrl, {...loginForm});
      toast(res.data.status ? 'Login successful' : res.data.msg, {
        type: res.data.status ? 'success' : 'error',
      });
      if (res.data.status) {
        localStorage.setItem('chat-user', JSON.stringify(res.data.user));
        setCurrentUser?.(res.data.user);
        closeModal();
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Input
        name="username"
        value={loginForm.username}
        placeholder="User Name"
        onInput={(e) => {
          updateForm(e.target as FormTarget);
        }}
      />
      <Input
        name="password"
        value={loginForm.password}
        placeholder="Password"
        onInput={(e) => {
          updateForm(e.target as FormTarget);
        }}
      />

      <Button onClick={onLogin} disabled={isLoading} isLoading={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>

      <Tips>
        Not a member yet?{' '}
        <ToggleButton
          onClick={() => {
            updateActionType('Register');
          }}
        >
          Create a New Account
        </ToggleButton>
      </Tips>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: var(--mt-chat-m-font-size);
`;

const Tips = styled.p`
  margin-top: 14px;
`;

const Button = styled.button<{isLoading: boolean}>`
  margin-top: 40px;
  width: 300px;
  height: 48px;
  background: var(--mt-chat-background-black-color);
  color: var(--mt-chat-white-font-color);
  ${(props) => (props.isLoading ? 'background: rgba(11, 12, 16,0.3);border:none;' : '')}
  border: 1px solid var(--mt-chat-background-black-color);
  font-size: var(--mt-chat-l-font-size);
  font-weight: var(--mt-font-weight-large);
`;

const Input = styled.input`
  height: 48px;
  width: 300px;
  margin-top: 40px;
  background: transparent;
  border-radius: 10px;
  border: 1px solid rgba(11, 12, 16);
  color: black;
  padding-left: var(--mt-spacing-1x);
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: rgba(23, 90, 226);
  cursor: pointer;
`;
