import {Header} from './Header';
import {Body} from './Body';
import React from 'react';
import styled from 'styled-components';

export const Layout = () => {
  return (
    <Container>
      <Header />
      <Body />
    </Container>
  );
};

const Container = styled.div``;
