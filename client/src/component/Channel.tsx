import {ChannelNameAndMessage} from './ChannelNameAndMessage';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {imgUrl} from '../constant/test';
import {FC} from 'react';

type Props = {
  id: number;
};

export const Channel: FC<Props> = ({id}) => {
  const x = [imgUrl, imgUrl];
  const imgSize = (() => {
    if ([3, 4].includes(x.length)) {
      return 20;
    }
    return x.length >= 5 ? 40 / 3 : 40;
  })();
  return (
    <Container to={`/chat/chanel/:${id}`}>
      <ChannelImgContainer>
        {x.map((item) => {
          return <img width={imgSize} height={imgSize} src={item} />;
        })}
      </ChannelImgContainer>

      <ChannelNameAndMessage />
    </Container>
  );
};

const Container = styled(Link)`
  display: flex;
  height: 75px;
  background: var(--mt-chat-background-black-color);

  padding: 0 20px 0 20px;
  align-items: center;
`;

const ChannelImgContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
`;
