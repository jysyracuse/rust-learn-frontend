import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';

const Index: React.FC = () => {
  return (
    <>
      <Head>
        <title>Rust Learn</title>
      </Head>
      <Navbar />
      <div># Hello, *world*!</div>
      <div>This is a test page for rust learn</div>
    </>
  );
};

export default Index;
