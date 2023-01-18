import styled from 'styled-components';
import {Avatar, Name} from './MembersContent';
import React, {FC, useState} from 'react';
import {Icon} from './Icon';
import {getTime} from '../helpers';
import {QuoteReply} from './QuoteReply';

type Props = {
  username: string;
  avatarImage: string;
  isSelf: boolean;
  message: string;
  updatedAt: string;
  quote?: string;
  setQuoteMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const MessageItem: FC<Props> = ({
  username,
  avatarImage,
  isSelf,
  message,
  updatedAt,
  setQuoteMessage,
  quote,
}) => {
  const [show, setShow] = useState(false);

  const messageAndName = (
    <NameAndTime>
      <Name>{username}</Name> <span>{getTime(updatedAt)}</span>{' '}
    </NameAndTime>
  );
  const avatar = <Avatar src={avatarImage} alt="" />;

  return (
    <Container isSelf={isSelf} hasQuote={!!quote}>
      {isSelf ? (
        <>
          <IsSelfMessageAndName>
            {messageAndName}
            <IsSelfMessageContentWrapper>
              <IsSelfMessageContent
                onClick={() => {
                  setShow(!show);
                }}
              >
                {message}
              </IsSelfMessageContent>
              <StyledQuoteReply quoteMessage={quote} />
            </IsSelfMessageContentWrapper>
          </IsSelfMessageAndName>
          {avatar}
        </>
      ) : (
        <>
          {avatar}
          <MessageAndName id="xxxxxxz">
            {messageAndName}
            <MessageContentWrapper>
              <MessageContent
                onClick={() => {
                  setShow(!show);
                }}
              >
                {message}
              </MessageContent>
              {show && (
                <Icons>
                  <Icon
                    name="quote"
                    size={1.2}
                    $cursor
                    onClick={() => {
                      setQuoteMessage(message);
                    }}
                  />
                  <Icon name="delete" size={1.3} $cursor />
                </Icons>
              )}
            </MessageContentWrapper>
            <StyledQuoteReply quoteMessage={quote} />
          </MessageAndName>
        </>
      )}
    </Container>
  );
};

const StyledQuoteReply = styled(QuoteReply)`
  left: 0;
  top: 100px;
`;

const MessageAndName = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 410px;
`;

const IsSelfMessageAndName = styled(MessageAndName)`
  align-items: flex-end;
`;

const Icons = styled.div`
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
  display: flex;
  gap: 20px;
  height: 40px;
  width: 90px;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  border-radius: 10px;
`;

const Container = styled.div<{isSelf: boolean; hasQuote: boolean}>`
  display: flex;
  flex-grow: 1;
  max-height: 80px;
  gap: 3px;

  ${(props) => {
    return props.isSelf ? 'justify-content: flex-end;' : '';
  }};
  ${(props) => {
    return props.hasQuote ? 'max-height: 100px;' : '';
  }};
`;

const NameAndTime = styled.div`
  color: #c9c7d0;
  font-weight: var(--mt-font-weight-medium);
  font-size: var(--mt-chat-s-font-size);
  max-width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 15px;
  span {
    font-weight: var(--mt-font-weight-medium);
    font-size: 12px;
    padding-left: 8px;
    color: white;
  }
`;

const MessageContent = styled.div`
  font-weight: var(--mt-font-weight-medium);
  font-size: 14px;
  width: 400px;
  height: 54px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #454451;
  display: flex;
  align-items: center;
  padding: 15px;
  margin-top: 6px;
  color: white;
  border-radius: 6px;
`;

const IsSelfMessageContent = styled(MessageContent)`
  background: linear-gradient(0deg, rgba(4, 177, 125, 0.5), rgba(4, 177, 125, 0.5)), #ffffff;
  color: #0c0e13;
`;

const MessageContentWrapper = styled.div`
  font-weight: var(--mt-font-weight-medium);
  font-size: 14px;
  display: flex;
  height: 54px;
  align-items: center;

  margin-top: 6px;
  color: white;
  gap: 8px;
`;

const IsSelfMessageContentWrapper = styled(MessageContentWrapper)`
  flex-direction: column;
  align-items: flex-start;
`;
