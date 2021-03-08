import { Button, Result } from 'antd';
import { history } from 'umi';

export default function () {
  return (
    <Result
      status="success"
      title="活动报名成功!"
      subTitle=""
      extra={[
        <Button
          type="primary"
          key="return"
          onClick={() => {
            history.goBack();
          }}
        >
          继续浏览
        </Button>,
        <Button
          key="check"
          onClick={() => {
            history.replace('/me/events');
          }}
        >
          我的活动
        </Button>,
      ]}
    />
  );
}
