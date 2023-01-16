import {NavItem} from './NavItem';
import styled from 'styled-components';

export const Sidebar = () => {
  return (
    <Container>
      <Gap />
      <Engage>Engage</Engage>
      <NaveItems>
        <NavItem path="forum" />
        <NavItem path="chat" />
        <NavItem path="matches" />
      </NaveItems>
      <Divider />
      <People>People</People>
      <NaveItems>
        <NavItem path="members" />
        <NavItem path="contributors" />
      </NaveItems>
    </Container>
  );
};

const Container = styled.div`
  background: var(--mt-chat-black-color);
  padding: 0 30px 0 30px;
`;

const Gap = styled.div`
  background: transparent;
  height: 60px;
`;

const Engage = styled.p`
  color: #797b85;
  font-weight: var(--mt-font-weight-medium);
  font-size: 14px;
  margin-bottom: 30px;
`;

const People = styled(Engage)``;

const Divider = styled.div`
  margin: 30px 0 30px 0;
  border: 1px solid rgb(28, 28, 34);
`;

const NaveItems = styled.ul`
  display: grid;
  gap: 30px;
`;
