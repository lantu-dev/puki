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
  let name = values.CompetitionName;
  let desc = values.Descriptions;
  call(team.CompetitionService.AddCompetition, {
    Description: desc,
    Name: name,
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
        <Title level={4}>添加比赛</Title>
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
          label="比赛/活动名称"
          name="CompetitionName"
          rules={[
            {
              required: true,
              message: "Please input the competition/activity's Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="比赛/活动介绍"
          name="Descriptions"
          rules={[
            {
              required: true,
              message: "Please input the competition/activity's Description!",
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
