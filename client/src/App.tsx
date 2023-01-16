import React, {FC, useEffect} from 'react';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Home} from './Home';

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
    element: <Home />,
  },
  {
    path: '/forum',
    element: <div>forum</div>,
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
