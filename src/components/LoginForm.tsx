import React, { useEffect } from 'react';
import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFieldPassword,
} from '@elastic/eui';
import fetchData from '@/lib/fetch';

const LoginForm = ({ formObj }) => {
  const { register, formState, handleSubmit, setValue, setError } = formObj;

  const onSubmit = async data => {
    console.log(formState.errors);
    alert(JSON.stringify(data, null, 2));
    const fetchRes = await fetchData({
      method: 'POST',
      url: `/login`,
      body: data,
    });
    console.log(fetchRes);
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
      <h1>请登录</h1>
      <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
        <EuiFormRow label="用户名" helpText={formState.errors.name?.message}>
          <EuiFieldText
            onChange={e => setValue('name', e.target.value)}
            placeholder="请输入用户名"
          />
        </EuiFormRow>
        <EuiFormRow label="密码" helpText={formState.errors.password?.message}>
          <EuiFieldPassword
            onChange={e => setValue('password', e.target.value)}
            placeholder="请输入密码"
          />
        </EuiFormRow>
        <EuiButton type="submit">登录</EuiButton>
      </EuiForm>
      <div>{JSON.stringify(formState.errors.name)}</div>
      <div>{JSON.stringify(formState.errors.password)}</div>
    </>
  );
};

export default LoginForm;
