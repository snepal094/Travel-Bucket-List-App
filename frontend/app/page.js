'use client';

import EditorList from '@/components/EditorList';
import ExplorerList from '@/components/ExplorerList';
import React, { useEffect, useState } from 'react';

const Home = () => {
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

      {currentRole === 'explorer' ? <ExplorerList /> : <EditorList />}
    </div>
  );
};

export default Home;
