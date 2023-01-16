import {Icon} from './Icon';
import styled from 'styled-components';
import {FC} from 'react';

type Props = {
  path: string;
  count?: number;
};
export const IconWithCount: FC<Props> = ({path, count}) => {
  return (
    <IconWrapper>
      {count && <Count>{count}</Count>}
      <Icon name={path} size={1.5} />
    </IconWrapper>
  );
};
const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #26252d;
  position: relative;
`;
const Count = styled.div`
  width: 25px;
  height: 18px;
  background: red;
  position: absolute;
  right: -8px;
  top: -3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  font-size: 11px;
  font-weight: var(--mt-font-weight-medium);
  color: #ffffff;
`;
