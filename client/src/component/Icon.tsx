import styled from 'styled-components';
import {FC} from 'react';

type Props = {
  size?: number;
  color?: string;
  name: string;
};
export const Icon: FC<Props> = (props) => {
  return (
    <Svg className="icon" aria-hidden="true" {...props}>
      <use xlinkHref={`#icon-${props.name}`}></use>
    </Svg>
  );
};

const Svg = styled.svg<Props>`
  ${(props) => {
    return `${props.size ? `width: ${props.size}em;height: ${props.size}em` : ''}`;
  }};
  ${(props) => {
    return `${props.size ? `color: ${props.color};` : ''}`;
  }};
`;
