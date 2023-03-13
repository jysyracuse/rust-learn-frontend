import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthUserType } from '@/lib/types';
import storage from '@/lib/storage';
import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLinks,
  EuiHeaderLink,
} from '@elastic/eui';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<AuthUserType>({
    id: null,
    name: null,
  });

  useEffect(() => {
    const authUserData = storage.get('user');
    if (authUserData) {
      setAuthUser(JSON.parse(authUserData));
    }
    // return () => {
    // }
  }, []);

  return (
    <EuiHeader>
      <EuiHeaderSectionItem border="right">
        <EuiHeaderLink
          iconType="/images/rust.svg"
          href="/"
          isActive={router.pathname == '/'}>
          Home
        </EuiHeaderLink>
        <EuiHeaderLink
          href="/users"
          isActive={router.pathname.startsWith('/users')}>
          Users
        </EuiHeaderLink>
      </EuiHeaderSectionItem>
      <EuiHeaderLinks>
        <EuiHeaderLink href="/users" isActive>
          Hi, {authUser.name}
        </EuiHeaderLink>
      </EuiHeaderLinks>
    </EuiHeader>
  );
};

export default Navbar;
