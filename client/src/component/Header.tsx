import styled from 'styled-components';
import {Icon} from './Icon';
import {SearchInput} from './SearchInput';

export const Header = () => {
  return (
    <Container>
      <LeftWrapper>
        <Log
          src="https://assets.website-files.com/6150e12db09d8462f07c877d/61db9d46e675d673f6b0b10e_logo-gradual.svg"
          alt="icon"
        />
      </LeftWrapper>
      <RightWrapper>
        <SearchInput />
        <Time>
          <Icon name="time" size={1.5} />
          <p>UTC -05:00 Chicago</p>
        </Time>
        <Tips name="tips_2" size={1.5} />
        <Tips name="tips_1" size={1.5} />
        <Avatar name="avatar" />
      </RightWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: var(--mt-chat-width);
  padding: var(--mt-spacing-2x) 30px var(--mt-spacing-2x) 26px;
  height: 70px;
  background: var(--mt-chat-black-color);
  display: flex;
  justify-content: space-between;
`;

const LeftWrapper = styled.div`
  display: flex;
`;

const Log = styled.img`
  width: 120px;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Time = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;

  color: #929699;
  font-size: var(--mt-chat-m-font-size);
  svg:first-child {
    margin-right: var(--mt-spacing-1x);
  }
`;

const Tips = styled(Icon)`
  margin-left: var(--mt-spacing-3x);
`;

const Avatar = styled(Icon)`
  width: 36px;
  height: 36px;
  margin-left: 22px;
`;
