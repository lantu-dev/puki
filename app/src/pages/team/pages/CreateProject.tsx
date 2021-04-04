import React from 'react';
import { Button, DatePicker, Form, Input, Select, Typography } from 'antd';
import { call } from '@/utils/client';
import team, { Position } from '@/backend/team';
import { PubSub } from 'pubsub-ts';
import { useAsync } from 'react-use';
import { history } from '@@/core/history';

const { Title } = Typography;
const { Option } = Select;

interface CreateProjectProps {
  competitionNames: string[];
  competitionTypes: string[];
  positionNames: string[];
  subscriber: PubSub.Subscriber;
}

//ProjectType: "类型1", ProjectCompetitions: Array(1), ProjectName: "七万五千", ProjectDescribeSimple: "wdsa", ProjectEndTime: Moment
interface formValue {
  ProjectType: string;
  ProjectName: string;
  ProjectCompetitions: string[];
  ProjectDescribeSimple: string;
  ProjectEndTime: string;
  ProjectPositions: string[];
}
export default function CreateProject(props: CreateProjectProps) {
  let publisher = new PubSub.Publisher();
  publisher.add(props.subscriber);

  const onFinish = (values: formValue) => {
    call(team.ProjectService.AddProject, {
      TypeName: values.ProjectType,
      Name: values.ProjectName,
      DescribeSimple: values.ProjectDescribeSimple,
      DescribeDetail: '',
      LinkURL: '',
      EndTime: values.ProjectEndTime,
      CompetitionNames: values.ProjectCompetitions,
      PositionNames: values.ProjectPositions,
    }).then((r) => {
      if (r.IsFailed) {
        alert('创建失败！');
      } else {
        history.push({
          pathname: '/team/ProjectDetail',
          query: {
            ProjectID: r.ProjectID.toString(),
            ProjectName: values.ProjectName,
            ProjectDescription: values.ProjectDescribeSimple,
            PositionNames: props.positionNames.join(' '),
            CompetitionNames: props.competitionNames.join(' '),
          },
        });
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      style={{ padding: '5%' }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Title level={3} style={{ marginBottom: '20px' }}>
        创建招募卡片
      </Title>
      <Form.Item
        label="项目名称"
        name="ProjectName"
        required={true}
        rules={[{ required: true, message: '请输入项目名称!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="项目类型"
        name="ProjectType"
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
      <Form.Item
        label="项目简介"
        name="ProjectDescribeSimple"
        required={true}
        rules={[{ required: true, message: '请输入项目简介!' }]}
      >
        <Input.TextArea autoSize={true} />
      </Form.Item>
      <Form.Item
        label="项目所需的岗位"
        name="ProjectPositions"
        hasFeedback
        required={true}
        rules={[{ required: true, message: '请选择项目所属的岗位' }]}
      >
        <Select mode={'multiple'}>
          {props.positionNames
            .filter((value) => value != '全部岗位')
            .map((value, index) => (
              <Select.Option key={index} value={value}>
                {value}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="项目所属比赛/活动"
        name="ProjectCompetitions"
        hasFeedback
        required={true}
        rules={[{ required: true, message: '请选择项目所属比赛!' }]}
      >
        <Select mode={'multiple'}>
          {props.competitionNames
            .filter((value) => value != '所有比赛/活动')
            .map((value, index) => (
              <Option key={index} value={value}>
                {value}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="项目报名截止日期"
        name="ProjectEndTime"
        required={true}
        rules={[{ required: true, message: '请输入报名截止日期!' }]}
      >
        <DatePicker style={{ width: '100%' }} size={'large'} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          创建项目
        </Button>
      </Form.Item>
    </Form>
  );
}
