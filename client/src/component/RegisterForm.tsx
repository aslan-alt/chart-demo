import styled from 'styled-components';
import React, {FC, useState} from 'react';
import {ActionType} from './Header';
import axios from 'axios';
import {loginUrl} from '../constant/requests';
import {toast, ToastContainer} from 'react-toastify';
import {imgUrls} from '../constant/defaultAvatars';

type Props = {
  updateActionType: (v: ActionType) => void;
  closeModal: () => void;
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
export const RegisterForm: FC<Props> = ({updateActionType, closeModal}) => {
  const [index, setIndex] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState<RegisterFormType>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const updateForm = (e: FormTarget) => {
    setRegisterForm((state) => ({...state, ...{[e.name]: e.value}}));
  };

  const onRegister = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(loginUrl, {...registerForm, avatarImage: imgUrls[index]});
      toast(res.data.status ? 'Registration successful!' : res.data.msg ?? '', {
        type: res.data.status ? 'success' : 'error',
        theme: 'light',
      });
    } catch (e) {
      console.log(e);
    }

    setIsLoading(false);
    closeModal();
  };

  return (
    <Container>
      <AvatarAndButton>
        <AvatarButton
          onClick={() => {
            setIndex(index === 0 ? 10 : index - 1);
          }}
        >
          Previous
        </AvatarButton>
        <Avatar src={imgUrls[index]} alt="" />
        <AvatarButton
          onClick={() => {
            setIndex(index === 10 ? 0 : index + 1);
          }}
        >
          Next
        </AvatarButton>
      </AvatarAndButton>

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

      <Button onClick={onRegister}>{isLoading ? 'Registering...' : 'Register'}</Button>

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
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: var(--mt-chat-m-font-size);
`;

const Tips = styled.p`
  margin-top: 14px;
`;

const Avatar = styled.img`
  width: 80px;
  border-radius: 50px;
`;

const AvatarAndButton = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: end;
  gap: 8px;
`;

const AvatarButton = styled.button`
  height: 20px;
  width: 60px;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(11, 12, 16, 0.2);
`;

const Button = styled.button`
  margin-top: 20px;
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
  margin-top: 20px;
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
