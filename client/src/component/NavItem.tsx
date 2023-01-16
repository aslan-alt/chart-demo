import {FC} from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {IconWithCount} from './IconWithCount';

type Props = {
  path: string;
  count?: number;
};
export const NavItem: FC<Props> = (props) => {
  return (
    <StyledNavLink to={`/${props.path}`}>
      <IconWithCount {...props} />
      {props.path[0].toUpperCase() + props.path.slice(1)}
    </StyledNavLink>
  );
};

const StyledNavLink = styled(NavLink)`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 40px 1fr;
  gap: var(--mt-spacing-2x);
  font-weight: var(--mt-font-weight-medium);
  font-size: 18px;
  color: #929699;
`;
