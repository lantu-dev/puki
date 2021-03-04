import Wechat from '@/assets/wechat.svg';
import Item from './component/Item';

export default function Setting() {
  return (
    <>
      <Item label="手机号">12345678912</Item>
      <Item label="电子邮箱">lantu@bupt.edu.cn</Item>
      <Item label="微信账号">
        <img src={Wechat} alt="wechat"/>
        lantu2021
      </Item>
    </>
  );
}
