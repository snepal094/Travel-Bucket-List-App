'use client';

import React, { useState } from 'react';
import { Pagination } from '@mui/material';
import DC from './DC';
import { useQuery } from '@tanstack/react-query';
import $axios from '@/lib/axios/axios.instance';
import Loader from './Loader';
import { isEditor } from '@/utils/check.role';

//useQuery since destination details must be fetched beforehand

const EditorList = () => {
  const [page, setPage] = useState(1);
  const { isPending, data, error } = useQuery({
    queryKey: ['editor-destination-list', page], //array because can do ['q-key', page] to change page where page will be a dependency
    queryFn: async () => {
      return await $axios.post('destination/editor/list', {
        page: page,
        limit: 3,
      });
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: isEditor(),
  });

  // console.log(data); //data:response

  const destinationsList = data?.data?.destinationsList || [];
  console.log(destinationsList);

  if (isPending) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col justify-between items-center gap-8  ">
      <div className="flex justify-center items-center gap-8 flex-wrap">
        {destinationsList.length ? (
          destinationsList?.map((item) => {
            return (
              <DC key={item._id} {...item} />

              //equivalent to:
              //  key={item._id}
              //   name={item.name}
              //   city={item.city}
              //   country={item.country}
              //   // image={item.images} //current images are empty strings (bad practice- causes error)
              //   // TODO: make em null or enable image uploads
              //   description={item.description}
            );
          })
        ) : (
          <p className="text-3xl bold text-red-600">No destinations found.</p>
        )}
      </div>

      <Pagination
        page={page}
        count={5} //TODO unlimited counts up to the number of total documents
        color="secondary"
        className="my-12"
        size="large"
        onChange={(_, value) => {
          // event, count = _, value
          // event not required here, hence _
          // _ => a value is passed here which will not be needed
          setPage(value);
        }}
      />
    </div>
  );
};

export default EditorList;
