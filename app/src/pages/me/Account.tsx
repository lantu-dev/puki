import { auth, call } from '@/api-client';
import SvgFemale from '@/assets/female.svg';
import SvgMale from '@/assets/male.svg';
import SvgQRCode from '@/assets/QRCode.svg';
import { Avatar } from 'antd';
import { useAsync } from 'react-use';
import Item from './component/Item';

export default function Setting() {
  const { value: profile } = useAsync(async () => {
    const { User, Student } = await call(auth.UserService.GetProfile, {});
    return { ...User, ...Student };
  });

  return (
    <>
      <Item label="头像">
        <Avatar size={64} src={profile?.AvatarURI}></Avatar>
      </Item>
      <Item label="昵称">{profile?.NickName}</Item>
      <Item label="手机号">{profile?.PhoneNumber.toString().slice(2)}</Item>
      <Item label="性别">
        {(() => {
          if (profile?.Gender === true) {
            return <img src={SvgMale} alt="male" />;
          } else if (profile?.Gender === false) {
            return <img src={SvgFemale} alt="female" />;
          }
        })()}
      </Item>
      <Item label="二维码">
        <img src={SvgQRCode} alt="QRCode" />
      </Item>
    </>
  );
}
