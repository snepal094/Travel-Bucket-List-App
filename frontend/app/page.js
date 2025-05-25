'use client';

import EditorList from '@/components/EditorList';
import ExplorerList from '@/components/ExplorerList';
import { Expletus_Sans } from 'next/font/google';
import React from 'react';

const Home = () => {
  const role = window.localStorage.getItem('currentRole');

  return (
    <div>
      <p className="text-5xl">
        Welcome, {window.localStorage.getItem('firstName')}!
      </p>

      {role === 'explorer' ? <ExplorerList /> : <EditorList />}
    </div>
  );
};

export default Home;
