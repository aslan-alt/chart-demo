import {useQuery} from 'react-query';
import axios from 'axios';
import {getUsers} from '../constant/requestUrls';
import React from 'react';
import {UserType} from '../component/Header';

type UseGetUsers = {
  id?: string;
  onSuccess: React.Dispatch<React.SetStateAction<UserType[]>>;
};

export const useGetUsers = ({id, onSuccess}: UseGetUsers) => {
  return useQuery(
    ['useGetUsers'],
    async () => {
      return await axios.get(`${getUsers}/${id}`).then((res) => res.data.users as UserType[]);
    },
    {
      enabled: !!id,
      onSuccess: (users) => {
        onSuccess(users);
      },
    }
  );
};
