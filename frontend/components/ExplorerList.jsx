import $axios from '@/lib/axios/axios.instance';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loader from './Loader';
import DC from './DC';
import { Pagination } from '@mui/material';
import { isExplorer } from '@/utils/check.role';

const ExplorerList = () => {
  const [page, setPage] = useState(1);
  const { isPending, data, error } = useQuery({
    queryKey: ['explorer-destination-list', page],
    queryFn: async () => {
      return await $axios.post('/destination/explorer/list', {
        page: page,
        limit: 10,
      });
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: isExplorer(),
  });

  const destinationsList = data?.data?.destinationsList || [];

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-between items-center gap-8  ">
      <div className="flex justify-center items-center gap-8 flex-wrap">
        {destinationsList.length ? (
          destinationsList?.map((item) => {
            return <DC key={item._id} {...item} />;
          })
        ) : (
          <p className="text-3xl bold text-red-600">No destinations found.</p>
        )}
      </div>
      <Pagination
        page={page}
        count={5}
        color="secondary"
        className="my-12"
        size="large"
        onChange={(_, value) => {
          setPage(value);
        }}
      />
    </div>
  );
};

export default ExplorerList;
