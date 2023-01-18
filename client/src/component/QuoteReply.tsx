import React, {FC} from 'react';
import styled from 'styled-components';

export const QuoteReply: FC<{quoteMessage?: string}> = ({quoteMessage}) => {
  return (
    <>
      {quoteMessage && (
        <Container>
          <VerticalLine />
          <Text>{quoteMessage}</Text>
        </Container>
      )}
    </>
  );
};

const Container = styled.span`
  height: 40px;
  max-width: 350px;
  background: #35343e;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const VerticalLine = styled.div`
  width: 2px;
  height: 20px;
  background: #04b17d;
  border-radius: 100px;
  margin-right: 10px;
`;

const Text = styled.p`
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  font-size: 13px;
  color: #7b798f;
`;
