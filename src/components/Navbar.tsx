import React, { useState, useEffect } from 'react';
import { AuthUserType } from '@/lib/types';
import storage from '@/lib/storage';

import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
} from '@elastic/eui';

const Navbar: React.FC = () => {
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
        <EuiHeaderLogo href="#">Rust Learn</EuiHeaderLogo>
      </EuiHeaderSectionItem>
      <EuiHeaderLinks>
        <EuiHeaderLink href="/users" isActive>
          Users
        </EuiHeaderLink>
      </EuiHeaderLinks>
    </EuiHeader>
  );
};

export default Navbar;
