import styled from 'styled-components';
import {Icon} from './Icon';

export const Body = () => {
  return (
    <Container>
      <Sidebar>
        <Gap />
        <Engage>Engage</Engage>
        <EngageItems>
          <li>
            <IconWrapper>
              <Icon name="notification" size={1.5} />
            </IconWrapper>
            Forum
          </li>
          <li>
            <IconWrapper>
              <Icon name="chat" size={1.5} />
            </IconWrapper>
            Chat
          </li>
          <li>
            <IconWrapper>
              <Icon name="matches" size={1.5} />
            </IconWrapper>
            Matches
          </li>
        </EngageItems>
      </Sidebar>
    </Container>
  );
};

const Container = styled.div`
  width: var(--mt-chat-width);
  height: 846px;
`;

const Gap = styled.div`
  background: transparent;
  height: 60px;
`;

const Engage = styled.p`
  color: #797b85;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 30px;
`;

const Sidebar = styled.div`
  width: 225px;
  background: var(--mt-chat-black-color);
  padding-left: 30px;
  height: 100%;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  background: #26252d;
`;

const EngageItems = styled.ul`
  display: grid;
  gap: 30px;
  li {
    display: grid;
    align-items: center;
    grid-template-columns: 40px 1fr;
    gap: var(--mt-spacing-2x);
    font-weight: 500;
    font-size: 18px;
    color: #929699;
  }
`;
