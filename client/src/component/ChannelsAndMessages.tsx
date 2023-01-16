import {Channel} from './Channel';
import {Icon} from './Icon';
import styled from 'styled-components';
import {SearchInput} from './SearchInput';
import {useParams} from 'react-router-dom';

export const ChannelsAndMessages = () => {
  const params = useParams<{id: string}>();
  const selectedId = params?.id?.replace(':', '');
  return (
    <Content>
      <ContentLeft>
        <StyledInput iconSize={2} />
        <Channels>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => {
            return <Channel key={id} id={id} />;
          })}
        </Channels>
      </ContentLeft>
      <ContentRight>
        <ActiveChannelHeader>
          Share your story
          <GroupButton>
            <Icon name="users" size={1.5} />
            <MembersCount>{4}</MembersCount>
          </GroupButton>
        </ActiveChannelHeader>
        <ActiveChannelContent>{selectedId}</ActiveChannelContent>
      </ContentRight>
    </Content>
  );
};

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

const ActiveChannelHeader = styled.div`
  height: 64px;
  color: var(--mt-chat-white-font-color);
  font-weight: 600;
  font-size: 18px;
  padding: 10px 20px 10px 20px;
  border-bottom: 2px solid rgb(46, 45, 51);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActiveChannelContent = styled.div`
  height: 64px;
`;

const GroupButton = styled.button`
  border: 1px solid var(--mt-chat-white-font-color);
  width: 90px;
  height: 100%;
  border-radius: 50px;
  font-weight: 600;
  font-size: 15px;
  color: var(--mt-chat-white-font-color);
  background: rgb(28, 28, 34);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MembersCount = styled.span`
  margin-left: 12px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
`;

const ContentLeft = styled.div`
  background: var(--mt-chat-background-black-color);
`;

const ContentRight = styled.div`
  background: #26252d;
`;
