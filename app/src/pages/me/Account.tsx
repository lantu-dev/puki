import SvgFemale from '@/assets/female.svg';
import SvgMale from '@/assets/male.svg';
import SvgQRCode from '@/assets/QRCode.svg';
import { Avatar } from 'antd';
import { useState } from 'react';
import Item from './component/Item';

enum Gender {
  Male,
  Female,
}

export default function Setting() {
  const [gender, setGender] = useState(Gender.Male);
  return (
    <>
      <Item label="头像">
        <Avatar size={64}></Avatar>
      </Item>
      <Item label="昵称">Future_000</Item>
      <Item label="性别">
        {gender === Gender.Male ? (
          <img src={SvgMale} alt="male" />
        ) : (
          <img src={SvgFemale} alt="female" />
        )}
      </Item>
      <Item label="二维码">
        <img src={SvgQRCode} alt="QRCode" />
      </Item>
    </>
  );
}
