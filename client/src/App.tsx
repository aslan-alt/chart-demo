import React, {FC, useEffect} from 'react';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {Layout} from './component/Layout';
import {ChannelsAndMessages} from './component/ChannelsAndMessages';

const getData = async () => {
  return await fetch('http://localhost:8000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `
            query Account($id:Int, $city:String) {
                account(id:$id){
                 name
                 age
                 salary(city:$city)
                }
            }
            `,
      variables: {id: 1, city: 'shanghai'},
    }),
  });
};
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
  useEffect(() => {
    getData()
      ?.then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
