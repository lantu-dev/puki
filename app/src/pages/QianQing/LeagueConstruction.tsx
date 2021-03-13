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
              <Title level={4}>党员人数</Title>
            </div>
            <div style={{ marginLeft: '15px' }}>
              <Title level={4}>11</Title>
            </div>
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
                  placeholder="请输入新的人数"
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
              <Title level={4}>预备党员人数</Title>
            </div>
            <div style={{ marginLeft: '15px' }}>
              <Title level={4}>3</Title>
            </div>
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
                  placeholder="请输入新的人数"
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
              <Title level={4}>提交入党申请书</Title>
            </div>
            <div style={{ marginLeft: '9px' }}>
              <Button type="link">导入文档</Button>
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
              <Title level={4}>获得党课结业书</Title>
            </div>
            <div style={{ marginLeft: '9px' }}>
              <Button type="link">导出文档</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
