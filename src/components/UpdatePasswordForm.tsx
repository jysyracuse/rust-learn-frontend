import React, { useState, useEffect } from 'react';
import {
  EuiButton,
  EuiForm,
  EuiFormRow,
  EuiFieldPassword,
  EuiCallOut,
  EuiSpacer,
  EuiTextColor,
} from '@elastic/eui';
import fetchData from '@/lib/fetch';

const UpdatePasswordForm = ({ formObj, addToast, onCloseModal }) => {
  const { register, formState, handleSubmit, setValue, getValues } = formObj;
  const onSubmit = async data => {
    const userId = data.user_id;
    delete data.user_id;
    const fetchRes = await fetchData({
      method: 'POST',
      url: `/users/${userId}/update_password`,
      body: data,
    });
    if (fetchRes.code === '200') {
      addToast({
        title: 'Updated complete!',
        color: 'success',
        text: `Updated password for ${userId}`,
      });
      onCloseModal();
    } else {
      addToast({
        title: 'Updated failed!',
        color: 'danger',
        text: fetchRes.message,
      });
    }
  };

  useEffect(() => {
    register('user_id', {
      required: { value: true, message: 'user_id is required' },
    });
    register('password', {
      required: { value: true, message: 'password is required' },
    });
    register('password_confirm', {
      required: { value: true, message: 'you need to confirm password' },
      validate: {
        matchesPreviousPassword: value => {
          const { password } = getValues();
          return password === value || "Passwords don't match";
        },
      },
    });
  }, []);

  return (
    <>
      {Object.keys(formState.errors).length ? (
        <EuiCallOut
          size="s"
          title="Please Check your input"
          color="danger"
          iconType="user">
          {Object.keys(formState.errors).map(errorKey => (
            <div key={errorKey}>{formState.errors[errorKey].message}</div>
          ))}
        </EuiCallOut>
      ) : null}
      <EuiSpacer />
      <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
        <EuiFormRow
          label="Password"
          helpText={
            <EuiTextColor color="danger">
              {formState.errors.password?.message}
            </EuiTextColor>
          }>
          <EuiFieldPassword
            onChange={e => setValue('password', e.target.value)}
            placeholder="Please Input Username"
          />
        </EuiFormRow>
        <EuiFormRow
          label="Password"
          helpText={
            <EuiTextColor color="danger">
              {formState.errors.password_confirm?.message}
            </EuiTextColor>
          }>
          <EuiFieldPassword
            onChange={e => setValue('password_confirm', e.target.value)}
            placeholder="Please Input Username"
          />
        </EuiFormRow>
        <EuiButton fill type="submit">
          Update Password
        </EuiButton>
      </EuiForm>
    </>
  );
};

export default UpdatePasswordForm;
