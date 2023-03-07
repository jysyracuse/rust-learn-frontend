import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { EuiDescriptionList } from '@elastic/eui';
import fetchData from '@/lib/fetch';

const User: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<[]>([]);

  useEffect(() => {
    (async () => {
      const fetchRes = await fetchData({
        method: 'GET',
        url: `/users/${router.query.id}`,
      });
      if (fetchRes.code === '200') {
        const userDesc = Object.keys(fetchRes.data).map((keyName: string) => {
          return {
            title: keyName,
            description: fetchRes.data[keyName],
          };
        });
        setUserData(userDesc);
      }
    })();
    // return () => {
    // }
  }, []);

  return (
    <>
      <div className="page-container">
        <h1 className="page-header">User Detail</h1>
        <div>Param: user_id {router.query.id}</div>
        <EuiDescriptionList
          type="column"
          listItems={userData}
          style={{ maxWidth: '400px' }}
        />
      </div>
    </>
  );
};

export default User;
