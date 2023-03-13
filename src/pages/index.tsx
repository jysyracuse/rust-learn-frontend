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
      <div>Home Page</div>
      {/* <Wrapper>
        
      </Wrapper> */}
    </>
  );
};

export default Index;
