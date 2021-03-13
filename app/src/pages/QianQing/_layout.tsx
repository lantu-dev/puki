import { IRouteComponentProps, Redirect } from 'umi';
import ProLayout, {
  PageContainer,
  SettingDrawer,
} from '@ant-design/pro-layout';
import React from 'react';
import { Link } from 'umi';

export default function Layout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  //   console.log(location);
  console.log(route);
  return (
    <ProLayout
      location={location}
      history={history}
      route={route}
      match={match}
      title={'乾清'}
      style={{ height: '100vh' }}
      layout={'mix'}
      splitMenus={true}
      menuItemRender={(item, dom) => (
        <Link to={item.path || '/admin'}>{dom}</Link>
      )}
    >
      {{ ...children }}
    </ProLayout>
  );
}
