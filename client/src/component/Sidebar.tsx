import {NavItem} from './NavItem';
import styled from 'styled-components';
import {Log} from './Log';
import {LOG_URL_WHITE} from '../constant/imgUrl';

export const Sidebar = () => {
  return (
    <Container>
      <NavWrapper>
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
      </NavWrapper>
      <LogWrapper>
        <Log width={90} url={LOG_URL_WHITE} />
      </LogWrapper>
    </Container>
  );
};

const NavWrapper = styled.div`
  flex-grow: 1;
`;

const LogWrapper = styled.div`
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.4);
  border-radius: 8px;
`;

const Container = styled.div`
  background: var(--mt-chat-black-color);
  padding: 0 30px 20px 30px;
  height: 846px;
  display: flex;
  flex-direction: column;
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
