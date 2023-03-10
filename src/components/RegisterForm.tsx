import React, { useEffect } from 'react';
import {
  EuiTitle,
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFieldPassword,
  EuiTextColor,
  EuiSpacer,
} from '@elastic/eui';
import fetchData from '@/lib/fetch';

const RegisterForm = ({ formObj }) => {
  const { register, formState, handleSubmit, setValue, getValues } = formObj;

  const onSubmit = async data => {
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
      <EuiTitle>
        <h2>Register</h2>
      </EuiTitle>
      <EuiSpacer />
      <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
        <EuiFormRow
          label="Name"
          helpText={
            <EuiTextColor color="danger">
              {formState.errors.name?.message}
            </EuiTextColor>
          }>
          <EuiFieldText
            onChange={e => setValue('name', e.target.value)}
            placeholder="Please Input Username"
          />
        </EuiFormRow>
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
        <EuiButton type="submit">Register</EuiButton>
      </EuiForm>
    </>
  );
};

export default RegisterForm;
