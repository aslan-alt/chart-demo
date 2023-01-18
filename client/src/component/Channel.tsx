import {ChannelNameAndMessage} from './ChannelNameAndMessage';
import styled from 'styled-components';
import {Link, useParams} from 'react-router-dom';

import {FC} from 'react';
import {imgUrls} from '../constant/defaultAvatars';

type Props = {
  id: number;
};

export const Channel: FC<Props> = ({id}) => {
  const params = useParams<{id: string}>();
  const selectedId = Number(params?.id?.replace(':', '') ?? -1);
  const isActive = selectedId === id;

  const imgSize = (() => {
    if ([3, 4].includes(imgUrls.length)) {
      return 20;
    }
    return imgUrls.length >= 5 ? 40 / 3 : 40;
  })();

  return (
    <Container to={`/chat/chanel/:${id}`} $isActive={isActive}>
      <ChannelImgContainer>
        {imgUrls.map((item) => {
          return <img key={item} width={imgSize} height={imgSize} src={item} alt="" />;
        })}
      </ChannelImgContainer>
      <ChannelNameAndMessage />
    </Container>
  );
};

const Container = styled(Link)<{$isActive: boolean}>`
  display: flex;
  height: 75px;
  background: var(--mt-chat-background-black-color);
  ${(props) => (props.$isActive ? 'background:#26252D;' : '')}
  padding: 0 20px 0 20px;
  align-items: center;
`;

export const ChannelImgContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
`;
