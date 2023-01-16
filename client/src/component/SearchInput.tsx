import {Icon} from './Icon';
import styled from 'styled-components';
import {FC} from 'react';

type Props = {
  fontSize?: number;
  iconSize?: number;
};

export const SearchInput: FC<Props> = ({iconSize, ...other}) => {
  return (
    <InputWrapper {...other}>
      <Icon name="search_light" size={iconSize ?? 1.5} />
      <Input placeholder="Search" />
    </InputWrapper>
  );
};

const InputWrapper = styled.label`
  display: flex;
  align-items: center;
  width: 143px;
  height: 38px;
  background: rgb(19, 20, 24);
  border-radius: 10px;
  padding: 12px;
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  color: #929699;
  font-size: var(--mt-chat-m-font-size);
  font-weight: var(--mt-font-weight-large);
  margin-left: var(--mt-spacing-1x);
`;
