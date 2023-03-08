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
import Navbar from '@/components/Navbar';

interface IOwnProps {
  addToast?: void;
  children?: React.ReactNode;
}

const User: React.FC<IOwnProps> = ({ addToast }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<any[]>([]);
  const [passwordModalCtrl, setPasswordModalCtrl] = useState<boolean>(false);
  const updatePasswordForm = useForm();
  // const { addToast } = props;
  useEffect(() => {
    (async () => {
      if (router.query.id) {
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
      }
    })();
    // return () => {
    // }
  }, [router.query.id]);

  const passwordModal = passwordModalCtrl ? (
    <EuiOverlayMask>
      <EuiModal
        onClose={() => setPasswordModalCtrl(false)}
        initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Update Password</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <UpdatePasswordForm
            formObj={updatePasswordForm}
            addToast={addToast}
            onCloseModal={() => setPasswordModalCtrl(false)}
          />
        </EuiModalBody>
      </EuiModal>
    </EuiOverlayMask>
  ) : null;

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="page-header">User Detail</h1>
        <div>Param: user_id {router.query.id}</div>
        <EuiDescriptionList
          type="column"
          listItems={userData}
          style={{ maxWidth: '400px' }}
        />
        <EuiButton
          onClick={() => {
            updatePasswordForm.setValue('user_id', router.query.id);
            setPasswordModalCtrl(true);
          }}>
          Update Password
        </EuiButton>
      </div>
      {passwordModal}
    </>
  );
};

export default User;
