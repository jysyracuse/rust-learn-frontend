import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { EuiErrorBoundary, EuiGlobalToastList } from '@elastic/eui';
import { Global } from '@emotion/react';
import Chrome from '../components/chrome';
import { Theme } from '../components/theme';
import { globalStyles } from '@/styles/global.styles';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [toasts, setToasts] = useState([]);
  const removeToast = removedToast => {
    setToasts(toasts.filter(toast => toast.id !== removedToast.id));
  };

  const addToast = toast => {
    toast.id = getRandomInt(1, 100);
    setToasts(toasts.concat(toast));
  };

  return (
    <>
      <Head>
        <title>Demo page for Rust API</title>
      </Head>
      <Global styles={globalStyles} />
      <Theme>
        <Chrome>
          <EuiErrorBoundary>
            <Component {...pageProps} addToast={addToast} />
            <EuiGlobalToastList
              toasts={toasts}
              dismissToast={removeToast}
              toastLifeTimeMs={2000}
            />
          </EuiErrorBoundary>
        </Chrome>
      </Theme>
    </>
  );
};

export default App;
