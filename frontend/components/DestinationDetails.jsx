'use client';

import { Button, Chip, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import $axios from '../lib/axios/axios.instance';
import { isEditor, isExplorer } from '../utils/check.role';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteDestinationDialog from './DeleteDestinationDialog';

const DestinationDetails = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== undefined) {
      setIsMounted(true);
    }
  }, []);

  // hit get product detail api
  const { data, isPending } = useQuery({
    queryKey: ['get-destination-details'],
    queryFn: async () => {
      return await $axios.get(`/destination/details/${params.id}`);
    },
  });

  const destinationDetail = data?.data?.destinationDetails;

  // add destination to bucket
  const { isPending: addToBucketPending, mutate } = useMutation({
    mutationKey: ['add-destination-to-bucket'],
    mutationFn: async () => {
      return await $axios.post(`/bucket/add/destination/${params.id}`);
    },

    onError: (error) => {
      console.log('add to bucket failed...');
      console.log(error);
    },
  });

  if (isPending || !isMounted || addToBucketPending) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col md:flex-row max-w-[90%] mx-auto shadow-2xl rounded-lg overflow-hidden bg-white">
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100">
        <Image
          src="/chitwan-national-park.jpg"
          height={600}
          width={600}
          alt="destination name"
          className="object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-start p-6 gap-4">
        <Typography
          variant="h5"
          className="font-bold text-gray-800 text-lg md:text-2xl"
        >
          {destinationDetail?.name}
        </Typography>
        <Chip
          label={destinationDetail?.city}
          color="secondary"
          className="text-sm md:text-base"
        />
        <Typography
          variant="h6"
          className="text-gray-600 text-base md:text-lg capitalize"
        >
          {destinationDetail?.country}
        </Typography>

        <Typography
          className="text-justify text-gray-600 text-sm md:text-base leading-6"
          variant="h6"
        >
          {destinationDetail?.description}
        </Typography>

        {isExplorer() && (
          <>
            {/* Add to Bucket Button */}
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                mutate();
              }}
            >
              Add to Bucket
            </Button>
          </>
        )}

        {isEditor() && (
          <div className="flex gap-8 my-4">
            <DeleteDestinationDialog destinationId={params.id} />

            <Button
              variant="contained"
              color="success"
              startIcon={<EditNoteOutlinedIcon />}
              onClick={() => {
                router.push(`/destination/edit/${params.id}`);
              }}
            >
              edit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationDetails;
