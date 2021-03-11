import { hasLogged } from '@/utils/client';
import React, { FunctionComponent } from 'react';
import { Redirect } from 'umi';

const EnsureLogged: FunctionComponent = (props) => {
  if (hasLogged()) {
    return <>{props.children}</>;
  } else {
    return (
      <Redirect
        to={`/auth/phone-login?redirect=${encodeURIComponent(location.href)}`}
      />
    );
  }
};

export default EnsureLogged;
