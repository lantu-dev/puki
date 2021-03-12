import React from 'react';
import { Avatar, Typography, Button, Space, message, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-form';

const { Title } = Typography;
const { confirm } = Modal;

export default function BscInfo() {
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '72px',
            marginTop: '89px',
          }}
        >
          <Avatar size={130} icon={<UserOutlined />} />
          <div
            style={{
              marginTop: '67px',
            }}
          >
            <Title level={4}>2020211307</Title>
            <Title level={4}>/</Title>
            <Title level={4}>计算机学院</Title>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: '164px',
              marginTop: '280px',
            }}
          >
            <div>
              <Title level={4}>记录人</Title>
            </div>
            <div style={{ marginLeft: '15px' }}>
              <Title level={4}>巨XX</Title>
            </div>
            <div style={{ marginLeft: '9px' }}></div>
            <ModalForm<{
              name: string;
            }>
              trigger={<Button type="link">修改</Button>}
              width="450px"
              modalProps={{
                onCancel: () => console.log('Cancle'),
              }}
            >
              <ProForm.Group style={{ display: 'flex', flexDirection: 'row' }}>
                <text>当前记录人</text>
                <br />
                <text>李X</text>
                <br />
                <ModalForm
                  trigger={
                    <Button danger type="link">
                      删除
                    </Button>
                  }
                  width="200px"
                  submitter={{
                    searchConfig: {
                      submitText: '确认',
                      resetText: '暂不修改',
                    },
                  }}
                  onFinish={async (values) => {
                    console.log(values);
                    message.success('提交成功');
                    return true;
                  }}
                >
                  <text>确认删除？</text>
                </ModalForm>
              </ProForm.Group>
              <br />

              <ProForm.Group
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <ProFormSelect
                  options={[
                    {
                      value: '1',
                      label: '王xx  2020211XXX',
                    },
                    {
                      value: '2',
                      label: '王xx  2020211XXX',
                    },
                  ]}
                  width="md"
                  name="NewRecord"
                  label="新记录人"
                />
              </ProForm.Group>
            </ModalForm>
          </div>
          <br />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: '164px',
            }}
          >
            <div>
              <Title level={4}>总人数</Title>
            </div>
            <div style={{ marginLeft: '15px' }}>
              <Title level={4}>33</Title>
            </div>
            <div style={{ marginLeft: '9px' }}>
              <ModalForm
                trigger={<Button type="link">编辑</Button>}
                width="360px"
                submitter={{
                  searchConfig: {
                    submitText: '确认',
                    resetText: '暂不修改',
                  },
                }}
                onFinish={async (values) => {
                  console.log(values);
                  message.success('提交成功');
                  return true;
                }}
              >
                <ProForm.Group>
                  <br />
                  <ProFormText
                    width="sm"
                    name="NewNum"
                    placeholder="请输入新的总人数"
                  />
                </ProForm.Group>
              </ModalForm>
            </div>
          </div>
          <br />

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: '164px',
            }}
          >
            <div>
              <Title level={4}>支部人数</Title>
            </div>
            <div style={{ marginLeft: '15px' }}>
              <Title level={4}>33</Title>
            </div>
            <div style={{ marginLeft: '9px' }}>
              <ModalForm
                trigger={<Button type="link">编辑</Button>}
                width="360px"
                submitter={{
                  searchConfig: {
                    submitText: '确认',
                    resetText: '暂不修改',
                  },
                }}
                onFinish={async (values) => {
                  console.log(values);
                  message.success('提交成功');
                  return true;
                }}
              >
                <ProForm.Group>
                  <br />
                  <ProFormText
                    width="sm"
                    name="NewLeagueNum"
                    placeholder="请输入新的支部人数"
                  />
                </ProForm.Group>
              </ModalForm>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
