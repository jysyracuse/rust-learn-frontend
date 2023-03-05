import React from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { EuiFlexGroup, EuiFlexItem, EuiPanel } from '@elastic/eui';

import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

const Login: React.FC = () => {
  const loginForm = useForm();
  const registerForm = useForm();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <EuiFlexGroup justifyContent="spaceAround" alignItems="center">
        <EuiFlexItem>
          <EuiPanel>
            <RegisterForm formObj={registerForm} />
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <LoginForm formObj={loginForm} />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};

export default Login;
