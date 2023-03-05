import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { EuiErrorBoundary } from '@elastic/eui';
import { Global } from '@emotion/react';
import Chrome from '../components/chrome';
import { Theme } from '../components/theme';
import { globalStyles } from '@/styles/global.styles';

const EuiApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Demo page for Rust API</title>
    </Head>
    <Global styles={globalStyles} />
    <Theme>
      <Chrome>
        <EuiErrorBoundary>
          <Component {...pageProps} />
        </EuiErrorBoundary>
      </Chrome>
    </Theme>
  </>
);

export default EuiApp;
