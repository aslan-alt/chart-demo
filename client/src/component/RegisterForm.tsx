import styled from 'styled-components';
import React, {FC, useState} from 'react';
import {ActionType} from './Header';

type Props = {
  updateActionType: (v: ActionType) => void;
};
// TODO: Refactor LoginForm and RegisterForm

export type RegisterFormType = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type FormTarget = HTMLInputElement & {
  name: keyof RegisterFormType;
  value: Partial<RegisterFormType>;
};
export const RegisterForm: FC<Props> = ({updateActionType}) => {
  const [registerForm, setRegisterForm] = useState<RegisterFormType>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const updateForm = (e: FormTarget) => {
    setRegisterForm((state) => ({...state, ...{[e.name]: e.value}}));
  };

  return (
    <Container>
      <Input
        name="username"
        value={registerForm.username}
        placeholder="User Name"
        onInput={(e) => {
          updateForm(e.target as FormTarget);
        }}
      />
      <Input
        name="password"
        value={registerForm.password}
        placeholder="Password"
        onInput={(e) => {
          updateForm(e.target as FormTarget);
        }}
      />
      <Input
        name="confirmPassword"
        value={registerForm.confirmPassword}
        placeholder="Confirm Password"
        onInput={(e) => {
          updateForm(e.target as FormTarget);
        }}
      />

      <Button>Register</Button>

      <Tips>
        Already registered with us?{' '}
        <ToggleButton
          onClick={() => {
            updateActionType('Login');
          }}
        >
          Login
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

const Button = styled.button`
  margin-top: 40px;
  width: 300px;
  height: 48px;
  background: var(--mt-chat-background-black-color);
  color: var(--mt-chat-white-font-color);
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
