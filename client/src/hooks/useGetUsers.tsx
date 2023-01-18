import {useQuery} from 'react-query';
import axios from 'axios';
import {getUsers} from '../constant/requestUrls';
import {User} from '../component/MembersContent';
import React from 'react';

export const useGetUsers = ({
  id,
  onSuccess,
}: {
  id?: string;
  onSuccess: React.Dispatch<React.SetStateAction<User[]>>;
}) => {
  return useQuery(
    ['useGetUsers'],
    async () => {
      return await axios.get(`${getUsers}/${id}`).then((res) => res.data.users as User[]);
    },
    {
      enabled: !!id,
      onSuccess: (users) => {
        onSuccess(users);
      },
    }
  );
};
