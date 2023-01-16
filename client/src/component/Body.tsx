import styled from 'styled-components';
import {Sidebar} from './Sidebar';

import React, {FC} from 'react';

type Props = {
  children: React.ReactNode;
};

export const Body: FC<Props> = ({children}) => {
  return (
    <Container>
      <Sidebar />
      {children}
    </Container>
  );
};

const Container = styled.div`
  width: var(--mt-chat-width);
  height: 846px;
  display: grid;
  grid-template-columns: 225px 1fr;
`;
