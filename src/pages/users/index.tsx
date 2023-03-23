import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  EuiBasicTable,
  EuiSelect,
  EuiPagination,
  EuiFlexGroup,
  EuiFlexGrid,
  EuiFlexItem,
  EuiLink,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import fetchData from '@/lib/fetch';
import Navbar from '@/components/Navbar';
import { USER_STATUS_DICT } from '@/lib/dicts';

export async function getStaticProps({ params }) {
  return { props: {} };
}

interface Pagination {
  page: number;
  page_size: number;
}

interface UserFilterType {
  status: string;
}

const Users: React.FC = () => {
  const router = useRouter();

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    page_size: 10,
  });

  const [filter, setFilter] = useState<UserFilterType>({
    status: '99',
  });

  const paginationRef = useRef() as any;
  paginationRef.current = pagination;

  const filterRef = useRef() as any;
  filterRef.current = filter;

  const [userList, setUserList] = useState<[]>([]);
  const [userCount, setUserCount] = useState<number>(0);

  const getUsers = async (pag, fil) => {
    const fetchRes = await fetchData({
      method: 'GET',
      url: `/users`,
      qs: {
        ...pag,
        ...fil,
      },
    });
    setUserList(fetchRes.data.list);
    setUserCount(fetchRes.data.count);
  };

  const updateUserStatus = async (userId, status) => {
    const fetchRes = await fetchData({
      method: 'POST',
      url: `/users/${userId}/update_status`,
      body: {
        status,
      },
    });
    getUsers(pagination, filter);
  };

  const columns = [
    {
      field: 'id',
      name: 'Id#',
    },
    {
      field: 'name',
      name: 'Name',
    },
    {
      name: 'Status',
      render: record => <span>{(USER_STATUS_DICT as any)[record.status]}</span>,
    },
    {
      name: 'Action',
      render: record => (
        <span>
          <EuiLink onClick={() => router.push(`/users/${record.id}`)}>
            View
          </EuiLink>
          &nbsp;|&nbsp;
          <EuiLink
            onClick={() =>
              updateUserStatus(record.id, record.status === 0 ? 1 : 0)
            }>
            {record.status === 0 ? 'Activate' : 'Pause'}
          </EuiLink>
        </span>
      ),
    },
  ];

  useEffect(() => {
    getUsers(pagination, filter);
    // return () => {
    // }
  }, []);

  return (
    <>
      <Head>
        <title>User Table</title>
      </Head>
      <Navbar />
      <div className="page-container">
        <h1 className="page-header">User Table</h1>
        <EuiFlexGrid columns={4}>
          <EuiFlexItem>
            <EuiText>Status</EuiText>
            <EuiSelect
              id="selectDocExample"
              options={(Object.keys(USER_STATUS_DICT) as any).map(
                (key: string) => {
                  return { value: key, text: USER_STATUS_DICT[key] };
                }
              )}
              value={filter.status}
              onChange={e => {
                const newFilter = {
                  ...filter,
                  status: e.target.value,
                };
                const newPagination = {
                  page_size: pagination.page_size,
                  page: 1,
                };
                setFilter(newFilter);
                setPagination(newPagination);
                getUsers(newPagination, newFilter);
              }}
              aria-label="Status"
            />
          </EuiFlexItem>
        </EuiFlexGrid>

        <EuiSpacer />
        <EuiBasicTable
          items={userList}
          rowHeader="id"
          columns={columns}
          // rowProps={getRowProps}
          // cellProps={getCellProps}
        />
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>Total: {userCount}</EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiPagination
              pageCount={Math.floor(userCount / pagination.page_size) + 1}
              activePage={pagination.page}
              onPageClick={targetPage => {
                const newPagination = {
                  page_size: pagination.page_size,
                  page: targetPage,
                };
                setPagination(newPagination);
                getUsers(newPagination, filter);
              }}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
};

export default Users;
