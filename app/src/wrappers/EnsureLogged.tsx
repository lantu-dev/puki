import { hasLogged } from '@/api-client';
import React, { FunctionComponent } from 'react';
import { Redirect } from 'umi';

const EnsureLogged: FunctionComponent = (props) => {
  console.log(123);
  if (hasLogged()) {
    console.log(456);
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
