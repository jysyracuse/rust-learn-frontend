import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  EuiBasicTable,
  EuiPagination,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
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

  const [userList, setUserList] = useState<[]>([]);
  const [userCount, setUserCount] = useState<number>(0);

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
      setUserList(fetchRes.data.list);
      setUserCount(fetchRes.data.count);
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
          items={userList}
          rowHeader="id"
          columns={columns}
          // rowProps={getRowProps}
          // cellProps={getCellProps}
        />
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>Total: {userCount}</EuiFlexItem>
          <EuiFlexItem grow={false}><EuiPagination
            pageCount={Math.floor(userCount / pagination.page_size) + 1}
            activePage={pagination.page}
            onPageClick={targetPage => console.log(targetPage)}
          /></EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
};

export default Users;
