import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import {
  EuiDescriptionList,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiButton,
} from '@elastic/eui';
import fetchData from '@/lib/fetch';
import UpdatePasswordForm from '@/components/UpdatePasswordForm';

const User: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any[]>([]);
  const [passwordModalCtrl, setPasswordModalCtrl] = useState<boolean>(false);
  const updatePasswordForm = useForm();

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

  const passwordModal = passwordModalCtrl ? (
    <EuiOverlayMask>
      <EuiModal
        onClose={() => setPasswordModalCtrl(false)}
        initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Update Password</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <UpdatePasswordForm formObj={updatePasswordForm} />
        </EuiModalBody>
      </EuiModal>
    </EuiOverlayMask>
  ) : null;

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
        <EuiButton onClick={() => setPasswordModalCtrl(true)}>
          Update Password
        </EuiButton>
      </div>
      {passwordModal}
    </>
  );
};

export default User;
