import { Avatar as AntAvatar } from 'antd';
import React from 'react';
// @ts-ignore
import Jdenticon from 'react-jdenticon';

export interface AvatarProps {
  src?: string;
  id?: string;
  head?: string;
  size?: any;
}

export default function Avatar(props: AvatarProps) {
  if (props.src && props.src.length > 0) {
    return <AntAvatar src={props.src} size={props.size} />;
  } else if (props.id) {
    return (
      <AntAvatar
        src={`https://api.multiavatar.com/${props.id}${props.head}.svg`}
        size={props.size}
      />
    );
  } else {
    return (
      <AntAvatar
        icon={<Jdenticon size="48" value={props.head} />}
        size={props.size}
      />
    );
  }
}
