import React, {FC} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Layout} from './component/Layout';
import {ChannelsAndMessages} from './component/ChannelsAndMessages';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <ChannelsAndMessages />
      </Layout>
    ),
  },
  {
    path: 'forum',
    element: <Layout>xxxxz</Layout>,
  },
  {
    path: 'chat',
    element: (
      <Layout>
        <ChannelsAndMessages />
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
    element: <Layout>members</Layout>,
  },
  {
    path: '/contributors',
    element: <Layout>contributors</Layout>,
  },
]);
const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
