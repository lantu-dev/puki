import React, { useState } from 'react';
import { Modal, Input, Button, TreeSelect, Radio, Divider } from 'antd';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';

const { SHOW_PARENT } = TreeSelect;
const App = () => {
  const [value, setValue] = React.useState(1.1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Radio.Group name="App" onChange={onChange} value={value}>
      <Radio value={1.1}>我填</Radio>
      <Radio value={1.2}>必填</Radio>
      <Radio value={1.3}>选填</Radio>
    </Radio.Group>
  );
};
const App2 = () => {
  const [value, setValue] = React.useState(2.1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Radio.Group name="App2" onChange={onChange} value={value}>
      <Radio value={2.1}>我填</Radio>
      <Radio value={2.2}>必填</Radio>
      <Radio value={2.3}>选填</Radio>
    </Radio.Group>
  );
};
const App3 = () => {
  const [value, setValue] = React.useState(3.1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Radio.Group name="App3" onChange={onChange} value={value}>
      <Radio value={3.1}>我填</Radio>
      <Radio value={3.2}>必填</Radio>
      <Radio value={3.3}>选填</Radio>
    </Radio.Group>
  );
};
const App4 = () => {
  const [value, setValue] = React.useState(4.1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    if (e.target.value == 4.1) {
      console.log('活动地点我填');
    }
  };

  return (
    <Radio.Group name="App4" onChange={onChange} value={value}>
      <Radio value={4.1}>我填</Radio>
      <Radio value={4.2}>必填</Radio>
      <Radio value={4.3}>选填</Radio>
    </Radio.Group>
  );
};
const App5 = () => {
  const [value, setValue] = React.useState(5.1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Radio.Group name="App5" onChange={onChange} value={value}>
      <Radio value={5.1}>我填</Radio>
      <Radio value={5.2}>必填</Radio>
      <Radio value={5.3}>选填</Radio>
    </Radio.Group>
  );
};
const App6 = () => {
  const [value, setValue] = React.useState(6.1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Radio.Group name="App6" onChange={onChange} value={value}>
      <Radio value={6.1}>我填</Radio>
      <Radio value={6.2}>必填</Radio>
      <Radio value={6.3}>选填</Radio>
    </Radio.Group>
  );
};
const treeData = [
  {
    title: '2020211xxx',
    value: '0-0',
    key: '0-0',
  },
  {
    title: '2020211xxx',
    value: '0-1',
    key: '0-1',
  },
  {
    title: '2020211xxx',
    value: '0-2',
    key: '0-2',
  },
];

class Demo extends React.Component {
  state = {};

  onChange = (value: any) => {
    console.log('onChange ', value);
    this.setState({ value });
  };

  render() {
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: 'Please select',
      style: {
        width: '100%',
      },
    };
    return <TreeSelect {...tProps} />;
  }
}

export default function PublishNew() {
  return (
    <>
      <div
        style={{
          marginTop: '113px',
          marginLeft: '159px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <text style={{ color: 'darkblue', fontSize: '26px' }}>发布活动↘</text>
        <div style={{ marginLeft: '15px', marginTop: '21px' }}>
          <text style={{ fontSize: '24px' }}>必填活动信息</text>
        </div>
        <div
          style={{
            marginLeft: '45px',
            marginTop: '23px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <text style={{ fontSize: '18px' }}>活动主题</text>
          <div style={{ marginLeft: '65px' }}>
            <Input placeholder="请输入活动主题" style={{ width: '646px' }} />
          </div>
        </div>
        <div
          style={{
            marginLeft: '45px',
            display: 'flex',
            flexDirection: 'row',
            marginTop: '20px',
          }}
        >
          <text style={{ fontSize: '18px' }}>标签</text>
          <div style={{ marginLeft: '83px' }}>
            <Button type="link">选择标签</Button>
          </div>
        </div>
        <div
          style={{
            marginLeft: '45px',
            display: 'flex',
            flexDirection: 'row',
            marginTop: '20px',
          }}
        >
          <text style={{ fontSize: '18px' }}>发布到</text>
          <div style={{ marginLeft: '65px' }}>
            <ModalForm<{
              name: string;
              company: string;
            }>
              width="500px"
              title="选择班级"
              trigger={<Button type="link">选择班级</Button>}
            >
              <Demo />
            </ModalForm>
          </div>
        </div>
        <div style={{ marginLeft: '15px', marginTop: '21px' }}>
          <text style={{ fontSize: '24px' }}>选填活动信息</text>
        </div>
        <div
          style={{
            marginLeft: '45px',
            display: 'flex',
            flexDirection: 'row',
            marginTop: '20px',
          }}
        >
          <text style={{ fontSize: '18px' }}>活动链接🔗</text>
          <div style={{ marginLeft: '65px' }}>
            <div style={{ marginBottom: 16 }}>
              <Input placeholder="请输入/粘贴" style={{ width: '288px' }} />
            </div>
          </div>
        </div>
        <div style={{ marginLeft: '15px', marginTop: '21px' }}>
          <text style={{ fontSize: '24px' }}>选择其他信息的补充要求</text>
        </div>
        <div style={{ marginLeft: '383px' }}>
          <ModalForm<{
            name: string;
            company: string;
          }>
            width="1000px"
            trigger={<Button type="link">点击开始选择</Button>}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <text>活动名称</text>
              <div style={{ marginLeft: '200px' }}>
                <App />
              </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <text>活动组织者</text>
              <div style={{ marginLeft: '186px' }}>
                <App2 />
              </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <text>活动时间</text>
              <div style={{ marginLeft: '200px' }}>
                <App3 />
              </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <text>活动地点</text>
              <div style={{ marginLeft: '200px' }}>
                <App4 />
              </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <text>参与名单及参与人数</text>
              <div style={{ marginLeft: '130px' }}>
                <App5 />
              </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <text>活动内容介绍</text>
              <div style={{ marginLeft: '170px' }}>
                <App6 />
              </div>
            </div>
          </ModalForm>
        </div>
        <div style={{ marginLeft: '15px', marginTop: '21px' }}>
          <text style={{ fontSize: '24px' }}>“我填”补充</text>
        </div>
        <Button
          style={{
            backgroundColor: '#F8E689',
            width: '134px',
            height: '63px',
            marginLeft: '407px',
            fontSize: '28px',
            color: 'white',
            borderRadius: '15px',
          }}
        >
          保存草稿
        </Button>
      </div>
      <Button
        style={{
          color: '#0F2089',
          fontSize: '28px',
          marginLeft: '565px',
          marginTop: '20px',
        }}
        type="link"
      >
        确认提交
      </Button>
    </>
  );
}
