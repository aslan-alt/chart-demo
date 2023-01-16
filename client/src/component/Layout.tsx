import {Header} from './Header';
import {Body} from './Body';
import React, {ComponentProps, FC} from 'react';
import styled from 'styled-components';

export const Layout: FC<ComponentProps<typeof Body>> = ({children}) => {
  return (
    <Container>
      <Header />
      <Body>{children}</Body>
    </Container>
  );
};

const Container = styled.div``;
