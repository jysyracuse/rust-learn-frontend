import React, { useState, useEffect } from 'react';
import { EuiButton, EuiForm, EuiFormRow, EuiFieldPassword } from '@elastic/eui';
import fetchData from '@/lib/fetch';

const UpdatePasswordForm = ({ formObj }) => {
  const { register, formState, handleSubmit, setValue, setError } = formObj;
  // const onSubmit = async data => {
  //   console.log(formState.errors)
  //   alert(JSON.stringify(data, null, 2));
  //   const fetchRes = await fetchData({
  //     method: 'POST',
  //     url: `/login`,
  //     body: data,
  //   });
  //   console.log(fetchRes);
  // };
  const onSubmit = data => {
    alert(JSON.stringify(data, null, 2));
  };

  useEffect(() => {
    register('name', {
      required: { value: true, message: 'name is required' },
    });
    register('password', {
      required: { value: true, message: 'password is required' },
    });
  }, []);

  return (
    <>
      <h1>注册</h1>
      <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
        <EuiFormRow label="密码" helpText={formState.errors.name?.message}>
          <EuiFieldPassword
            onChange={e => setValue('name', e.target.value)}
            placeholder="请输入密码"
          />
        </EuiFormRow>
        <EuiFormRow label="密码" helpText={formState.errors.password?.message}>
          <EuiFieldPassword
            onChange={e => setValue('password', e.target.value)}
            placeholder="请确认密码"
          />
        </EuiFormRow>
        <EuiButton type="submit">注册</EuiButton>
      </EuiForm>
      <div>{JSON.stringify(formState.errors)}</div>
    </>
  );
};

export default UpdatePasswordForm;
