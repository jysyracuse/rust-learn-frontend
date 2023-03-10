import React, { useEffect, useState } from 'react';
import {
  EuiTitle,
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFieldPassword,
  EuiCallOut,
} from '@elastic/eui';
import fetchData from '@/lib/fetch';
import storage from '@/lib/storage';

const LoginForm = ({ formObj }) => {
  const { register, formState, handleSubmit, setValue, setError } = formObj;
  const [successCallout, setSuccessCallout] = useState<string | null>(null);
  const [errorCallout, setErrorCallout] = useState<string | null>(null);

  const onSubmit = async data => {
    setSuccessCallout(null);
    setErrorCallout(null);
    const fetchRes = await fetchData({
      method: 'POST',
      url: `/login`,
      body: data,
    });
    if (fetchRes.code === '200') {
      storage.set(
        'user',
        JSON.stringify({
          id: fetchRes.data.id,
          name: fetchRes.data.name,
        })
      );
      setSuccessCallout(fetchRes.data.name);
    } else {
      setErrorCallout(fetchRes.message);
    }
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
      <EuiTitle>
        <h2>Login</h2>
      </EuiTitle>
      {successCallout ? (
        <EuiCallOut
          size="s"
          title="Login Success"
          color="success"
          iconType="user">
          <p>Welcome, {successCallout}</p>
        </EuiCallOut>
      ) : null}
      {errorCallout ? (
        <EuiCallOut
          size="s"
          title="Login Failed"
          color="danger"
          iconType="user">
          <p>{errorCallout}</p>
        </EuiCallOut>
      ) : null}
      <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
        <EuiFormRow label="Username" helpText={formState.errors.name?.message}>
          <EuiFieldText
            onChange={e => setValue('name', e.target.value)}
            placeholder="Please Input Username"
          />
        </EuiFormRow>
        <EuiFormRow
          label="Password"
          helpText={formState.errors.password?.message}>
          <EuiFieldPassword
            onChange={e => setValue('password', e.target.value)}
            placeholder="Please Input Password"
          />
        </EuiFormRow>
        <EuiButton fill type="submit">
          Login
        </EuiButton>
      </EuiForm>
    </>
  );
};

export default LoginForm;
