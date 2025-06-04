'use client';

import EditorList from '@/components/EditorList';
import ExplorerList from '@/components/ExplorerList';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { isEditor } from '@/utils/check.role';

const Home = () => {
  const router = useRouter();

  // const role = window.localStorage.getItem('currentRole');
  const [currentRole, setCurrentRole] = useState(null);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    setCurrentRole(window.localStorage.getItem('currentRole'));
    setFirstName(window.localStorage.getItem('firstName'));
  }, []);

  return (
    <div>
      <p className="text-5xl">Welcome, {firstName}!</p>
      {isEditor() && (
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => {
            router.push('/add-destination');
          }}
        >
          Add Destination
        </Button>
      )}
      <div className="h-full w-full flex justify-center items-center m-8">
        {currentRole === 'explorer' ? <ExplorerList /> : <EditorList />}
      </div>
    </div>
  );
};

export default Home;
