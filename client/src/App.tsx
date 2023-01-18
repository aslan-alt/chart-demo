import React, {FC} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Layout} from './component/Layout';
import {ChatContent} from './component/ChatContent';
import {MembersContent} from './component/MembersContent';
import {SocketWrapper} from './Providers/socketProvider';
import {QueryClient, QueryClientProvider} from 'react-query';

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
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000, // 10 seconds
    },
  },
});
const App: FC = () => {
  return (
    <SocketWrapper>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SocketWrapper>
  );
};

export default App;
