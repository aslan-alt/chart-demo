import {useQuery} from 'react-query';
import axios from 'axios';
import {getAllMessages} from '../constant/requestUrls';
import {Messages} from '../component/MembersContent';
import React from 'react';

export const useGetAllMessages = ({
  from,
  to,
  onSuccess,
}: {
  from?: string;
  to?: string;
  onSuccess: React.Dispatch<React.SetStateAction<Messages[]>>;
}) => {
  return useQuery(
    ['useGetAllMessages', to],
    async () => {
      const {data} = await axios.post(`${getAllMessages}`, {
        from,
        to: [to],
      });
      return data as Messages[];
    },
    {
      enabled: !!(from || to),
      onSuccess: (messages) => {
        onSuccess(messages);
      },
    }
  );
};
