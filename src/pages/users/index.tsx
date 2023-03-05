import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { EuiBasicTable } from '@elastic/eui';
import fetchData from '@/lib/fetch';

export async function getStaticProps({ params }) {
  return { props: {} };
}

interface Pagination {
  page: number;
  page_size: number;
}

const Users: React.FC = () => {
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    page_size: 10,
  });

  const [userData, setUserData] = useState<[]>([]);

  const columns = [
    {
      field: 'id',
      name: 'Id#',
    },
    {
      field: 'name',
      name: 'Name',
    },
  ];

  useEffect(() => {
    (async () => {
      const fetchRes = await fetchData({
        method: 'GET',
        url: `/users`,
        qs: {
          ...pagination,
        },
      });
      console.log(fetchRes);
      setUserData(fetchRes.data);
    })();
    // return () => {
    // }
  }, []);

  return (
    <>
      <Head>
        <title>User Table</title>
      </Head>
      <div className="page-container">
        <h1 className="page-header">User Table</h1>
        <EuiBasicTable
          items={userData}
          rowHeader="id"
          columns={columns}
          // rowProps={getRowProps}
          // cellProps={getCellProps}
        />
      </div>
    </>
  );
};

export default Users;
