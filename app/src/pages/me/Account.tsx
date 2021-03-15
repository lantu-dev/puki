import auth from '@/backend/auth';
import { call } from '@/utils/client';
import Avatar from '@/components/Avatar';
import { message, Switch } from 'antd';
import { useAsyncRetry, useCounter } from 'react-use';
import Item from './components/Item';
import { Female, Male, QRCode } from './components/Svg';

export default function Setting() {
  const [GenderCount, { inc, dec, set, reset }] = useCounter(0, 10, 0);

  const { value: profile, retry } = useAsyncRetry(async () => {
    const { User, Student } = await call(auth.UserService.GetProfile, {});
    return { ...User, ...Student };
  });

  const data = [
    {
      key: 'NickName',
      label: '昵称',
      validator: [
        { message: '昵称长度在2-8位之间', reg: /^.{2,8}$/ },
        {
          message: '昵称仅支持中英文与数字',
          reg: /^[0-9a-zA-Z\u4e00-\u9fa5]*$/,
        },
      ],
    },
    {
      key: 'RealName',
      label: '姓名',
      validator: [
        {
          message: '请填写真实姓名(如有问题请联系管理员)',
          reg: /^[\u4E00-\u9FA5\·]+$/,
        },
      ],
    },
    {
      key: 'University',
      label: '学校',
      validator: [
        {
          message: '请填写真实学校',
          reg: /^[\u4E00-\u9FA5\s]+$/,
        },
      ],
    },
  ] as {
    key: 'NickName' | 'RealName' | 'University';
    label: string;
    validator: { message: string; reg: RegExp }[];
  }[];

  return (
    <>
      <Item label="头像">
        <Avatar
          src={profile?.AvatarURI}
          id={profile?.ID.toString()}
          head={profile?.NickName}
          size={64}
        />
      </Item>
      {data.map((v) => (
        <Item
          key={v.key}
          label={v.label}
          editable={{
            onChange: async (value) => {
              if (profile && value !== profile[v.key].toString()) {
                for (let val of v.validator) {
                  if (!val.reg.test(value)) {
                    return message.warning(val.message);
                  }
                }
                const { Completed } = await call(
                  auth.UserService.PatchProfile,
                  {
                    [v.key]: value,
                  },
                );
                if (Completed) {
                  message.success(`${v.label}修改成功`);
                  retry();
                }
              }
            },
          }}
        >
          {profile && profile[v.key].toString()}
        </Item>
      ))}
      <Item label="性别">
        <Switch
          checked={profile?.Gender || false}
          onChange={async (value) => {
            if (GenderCount == 10) {
              message.warning('「你怎么一会儿男一会儿女啊」');
              return reset();
            }
            if (profile && value !== profile.Gender) {
              const { Completed } = await call(auth.UserService.PatchProfile, {
                Gender: value,
              });
              if (Completed) {
                message.success(`性别修改成功`);
                inc();
                retry();
              }
            }
          }}
          checkedChildren={<Male style={{ color: 'white' }} />}
          unCheckedChildren={<Female style={{ color: 'white' }} />}
          style={{
            lineHeight: '27px',
            backgroundColor: profile?.Gender === false ? '#EEA5B6' : '#52C1D5',
          }}
        />
      </Item>
      <Item label="二维码">
        <QRCode />
      </Item>
    </>
  );
}
