import styled from 'styled-components';

export const ChannelNameAndMessage = () => {
  return (
    <Container>
      <ChannelName>
        Announcements <span>20:34</span>{' '}
      </ChannelName>
      <Message>Jerry: [File] Design Guideline.pdfxxxxxxxxxxx</Message>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 3px;
`;

const ChannelName = styled.div`
  color: #c9c7d0;
  font-weight: var(--mt-font-weight-medium);
  font-size: var(--mt-spacing-2x);

  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-weight: var(--mt-font-weight-large);
    font-size: 12px;
    color: #7b798f;
  }
`;

const Message = styled.p`
  color: #7b798f;
  font-weight: var(--mt-font-weight-medium);
  font-size: 14px;
  width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
