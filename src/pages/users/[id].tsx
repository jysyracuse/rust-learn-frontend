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
  EuiButtonEmpty,
  EuiFlexItem,
  EuiFlexGroup,
  EuiSpacer,
} from '@elastic/eui';
import fetchData from '@/lib/fetch';
import UpdatePasswordForm from '@/components/UpdatePasswordForm';
import Navbar from '@/components/Navbar';

interface IOwnProps {
  addToast?: any; //?
  children?: React.ReactNode;
}

const User: React.FC<IOwnProps> = ({ addToast }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<any[]>([]);
  const [passwordModalCtrl, setPasswordModalCtrl] = useState<boolean>(false);
  const [deleteModalCtrl, setDeleteModalCtrl] = useState<boolean>(false);

  const deleteUser = async (userId: string | string[]) => {
    const fetchRes = await fetchData({
      method: 'DELETE',
      url: `/users/${userId}`,
    });
    if (fetchRes.code === '200') {
      addToast({
        title: 'UserDeleted',
        color: 'success',
      });
      router.push('/users');
    } else {
      addToast({
        title: 'Query Failed',
        color: 'danger',
        text: fetchRes.message,
      });
    }
  };

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
        } else {
          addToast({
            title: 'Query Failed',
            color: 'danger',
            text: fetchRes.message,
          });
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

  const deleteModal = deleteModalCtrl ? (
    <EuiOverlayMask>
      <EuiModal
        onClose={() => setDeleteModalCtrl(false)}
        initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Delete User</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <p>Are you sure to delete this user?</p>
          <EuiSpacer />
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiButton
                color="danger"
                fill
                onClick={() => deleteUser(router.query.id)}>
                Delete
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                color="text"
                onClick={() => setDeleteModalCtrl(false)}>
                Cancel
              </EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
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
        <EuiSpacer />
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiButton
              onClick={() => {
                updatePasswordForm.setValue('user_id', router.query.id);
                setPasswordModalCtrl(true);
              }}>
              Update Password
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton color="danger" onClick={() => setDeleteModalCtrl(true)}>
              Delete
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
      {passwordModal}
      {deleteModal}
    </>
  );
};

export default User;
