import React from 'react';
import { EuiButton, EuiEmptyPrompt, EuiPageTemplate } from '@elastic/eui';
import { useTheme } from '../components/theme';
import { useRouter } from 'next/router';

const NotFoundPage: React.FC = () => {
  const { colorMode } = useTheme();

  const isDarkTheme = colorMode === 'dark';

  const router = useRouter();

  const handleClick = e => {
    e.preventDefault();
    router.back();
  };

  return (
    <EuiPageTemplate>
      <EuiPageTemplate.EmptyPrompt>
        <EuiEmptyPrompt
          actions={[
            <EuiButton
              color="primary"
              fill
              onClick={handleClick}
              key="404-go-back">
              Go back
            </EuiButton>,
          ]}
          body={<p>Oops! Page not found.</p>}
          layout="vertical"
          title={<h2>Page not found</h2>}
          titleSize="m"
        />
      </EuiPageTemplate.EmptyPrompt>
    </EuiPageTemplate>
  );
};

export default NotFoundPage;
