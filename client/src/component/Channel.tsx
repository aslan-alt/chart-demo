import {ChannelNameAndMessage} from './ChannelNameAndMessage';
import styled from 'styled-components';
import {Link, useParams} from 'react-router-dom';
import {imgUrl} from '../constant/test';
import {FC} from 'react';

type Props = {
  id: number;
};

export const Channel: FC<Props> = ({id}) => {
  const params = useParams<{id: string}>();
  const selectedId = Number(params?.id?.replace(':', '') ?? -1);
  const isActive = selectedId === id;
  const x = [imgUrl, imgUrl];
  const imgSize = (() => {
    if ([3, 4].includes(x.length)) {
      return 20;
    }
    return x.length >= 5 ? 40 / 3 : 40;
  })();
  return (
    <Container to={`/chat/chanel/:${id}`} isActive={isActive}>
      <ChannelImgContainer>
        {x.map((item, index) => {
          return <img key={item + index} width={imgSize} height={imgSize} src={item} alt="" />;
        })}
      </ChannelImgContainer>
      <ChannelNameAndMessage />
    </Container>
  );
};

const Container = styled(Link)<{isActive: boolean}>`
  display: flex;
  height: 75px;
  background: var(--mt-chat-background-black-color);
  ${(props) => {
    return props.isActive ? 'background:#26252D;' : '';
  }};
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
