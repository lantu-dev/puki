
import { View, Text } from '@tarojs/components'
import './index.scss'
import {useAsync} from "react-use";
import {call} from "../../api-client/client";
import {auth} from "../../api-client";

export default function Index() {
  call(auth.UserService.GetProfile, {}).then(console.log).catch(console.error)
  const phoneNumberState = useAsync(async () => {
    const { User } = await call(auth.UserService.GetProfile, {});
    if (User.RealName && User.RealName.length > 0) {
      // message.error({ content: '用户已完成注册' });
      // setState({ registered: true });
    }
    // form.setFieldsValue({ phoneNumber: '+' + User.PhoneNumber });
    return User.PhoneNumber;
  });
  return (
    <View className='index pt-2'>
      <Text>Hello world!222 {phoneNumberState.value}</Text>
    </View>
  )
}
