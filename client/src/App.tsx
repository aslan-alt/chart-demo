import React, {FC} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Layout} from './component/Layout';
import {ChatContent} from './component/ChatContent';
import {MembersContent} from './component/MembersContent';
import {SocketWrapper} from './hooks/socketProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <ChatContent />
      </Layout>
    ),
  },
  {
    path: 'forum',
    element: <Layout>forum</Layout>,
  },
  {
    path: 'chat',
    element: (
      <Layout>
        <ChatContent />
      </Layout>
    ),
    children: [
      {
        path: '/chat/chanel/:id',
      },
    ],
  },
  {
    path: 'matches',
    element: <Layout>matches</Layout>,
  },
  {
    path: '/members',
    element: (
      <Layout>
        <MembersContent />
      </Layout>
    ),
    children: [
      {
        path: '/members/user/:id',
      },
    ],
  },
  {
    path: '/contributors',
    element: <Layout>contributors</Layout>,
  },
]);
const App: FC = () => {
  return (
    <SocketWrapper>
      <RouterProvider router={router} />
    </SocketWrapper>
  );
};

export default App;
