//定义首屏为项目列表，供浏览正在招募中的项目
import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import team from '@/backend/team';
import { call } from '@/utils/client';

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const onFinish = (values: any) => {
  let name = values.CompetitionTypeName;
  let desc = values.Descriptions;
  call(team.CompetitionService.AddCompetitionType, {
    Description: desc,
    Name: name,
  }).then();
  console.log('success');
  history.back();
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function () {
  return (
    <>
      <div
        style={{
          width: '95%',
          margin: 'auto',
          marginTop: '10px',
          marginBottom: '20px',
        }}
      >
        <Title level={4}>添加比赛类型</Title>
      </div>

      <Form
        style={{ width: '95%', margin: 'auto', marginTop: '10px' }}
        {...layout}
        name="basic"
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout={'vertical'}
      >
        <Form.Item
          label="比赛/活动类型名称"
          name="CompetitionTypeName"
          rules={[
            {
              required: true,
              message: "Please input the competition/activity type's Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="比赛/活动类型介绍"
          name="Descriptions"
          rules={[
            {
              required: true,
              message:
                "Please input the competition/activity type's Description!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
