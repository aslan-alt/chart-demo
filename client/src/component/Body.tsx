import styled from 'styled-components';
import {Sidebar} from './Sidebar';
import {SearchInput} from './SearchInput';
import {imgUrl} from '../constant/test';
import {Channel} from './Channel';

export const Body = () => {
  const x = [imgUrl, imgUrl];
  const imgSize = (() => {
    if ([3, 4].includes(x.length)) {
      return 20;
    }
    return x.length >= 5 ? 40 / 3 : 40;
  })();
  console.log('imgSize-----');
  console.log(imgSize);
  return (
    <Container>
      <Sidebar />
      <Content>
        <ContentLeft>
          <StyledInput iconSize={2} />
          <Channels>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => {
              return <Channel id={id} />;
            })}
          </Channels>
        </ContentLeft>
        <ContentRight></ContentRight>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: var(--mt-chat-width);
  height: 846px;
  display: grid;
  grid-template-columns: 225px 1fr;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
`;

const ContentLeft = styled.div`
  background: var(--mt-chat-background-black-color);
`;

const ContentRight = styled.div``;

const StyledInput = styled(SearchInput)`
  width: 100%;
  height: 64px;
  border-radius: 0;
  font-weight: var(--mt-font-weight-medium);
  font-size: var(--mt-spacing-2x);
  background: var(--mt-chat-background-black-color);
  color: #7b798f;
  border-bottom: 2px solid rgb(39, 38, 42);
  padding: 20px;
  input {
    margin-left: 12px;
  }
`;

const Channels = styled.div``;
