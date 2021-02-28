import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';

const { Option } = Select;

// CreatorID      int64
// TypeID         int64
// Name           string
// DescribeSimple string
// DescribeDetail string
// LinkURL        string
// EndTime        time.Time
// CompetitionsID []int64 //传入ID数组，在创建Project后依据ID创建一系列中间表
// Positions      []models.Position

interface CreateProjectProps {
  competitionNames: string[];
  competitionTypes: string[];
  positionNames: string[];
}

export default function CreateProject(props: CreateProjectProps) {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      style={{ width: '95%' }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="项目类型"
        name="项目类型"
        hasFeedback
        required={true}
        rules={[{ required: true, message: '请选择项目类型!' }]}
      >
        <Select>
          {props.competitionTypes
            .filter((value) => value != '所有类别')
            .map((value, index) => (
              <Option key={index} value={value}>
                {value}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
