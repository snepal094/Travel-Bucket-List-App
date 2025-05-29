import React from 'react';
import DestinationCard from './DestinationCard';
import { Pagination } from '@mui/material';
import DC from './DC';

//useQuery since destination details must be fetched beforehand

const EditorList = () => {
  return (
    <>
      <div className="flex flex-col justify-between items-center gap-8">
        {/* <DestinationCard />
        <DestinationCard />
        <DestinationCard />
        <DestinationCard />
        <DestinationCard />
        <DestinationCard />
        <DestinationCard /> */}
        <DestinationCard />
        <DC />
      </div>

      {/* <div>
        <Pagination count={3} color="primary" />
      </div> */}
    </>
  );
};

export default EditorList;
