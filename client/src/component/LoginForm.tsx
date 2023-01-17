import styled from 'styled-components';
import React, {FC, useState} from 'react';
import {ActionType} from './Header';
import {FormTarget, RegisterFormType} from './RegisterForm';
import axios from 'axios';
import {loginUrl} from '../constant/requests';
import {ToastContainer} from 'react-toastify';

type Props = {
  updateActionType: (v: ActionType) => void;
  closeModal: () => void;
};
// TODO: Refactor LoginForm and RegisterForm

type LoginFormType = Omit<RegisterFormType, 'confirmPassword'>;

export const LoginForm: FC<Props> = ({updateActionType, closeModal}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginFormType>({
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
      console.log('res-------');
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
    closeModal();
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
      <ToastContainer />
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
