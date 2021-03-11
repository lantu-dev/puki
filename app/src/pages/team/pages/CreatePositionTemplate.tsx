//定义首屏为项目列表，供浏览正在招募中的项目
import React, { useEffect } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import team from '@/backend/team';
import { call } from '@/utils/client';

const { Title } = Typography;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const onFinish = (values: any) => {
  let name = values.positionName;
  let desc = values.Descriptions;
  call(team.PositionService.CreatePositionTemplate, {
    Name: name,
    DefaultDescribe: desc,
  }).then(() => {});
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
        <Title level={4}>添加岗位模板</Title>
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
          label="岗位名称"
          name="positionName"
          rules={[
            {
              required: true,
              message: "Please input the position's Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="岗位默认介绍"
          name="Descriptions"
          rules={[
            {
              required: true,
              message: "Please input the position's Description!",
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
