import avatar from '@/assets/avatar.png';
import {
  ArrowLeftOutlined,
  EllipsisOutlined,
  LikeOutlined,
  MessageOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Affix,
  Alert,
  Avatar,
  Button,
  Divider,
  Image,
  Menu,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
const { Title, Paragraph, Text } = Typography;

interface PageProps {
  avatarUrl: string;
  title: string;
  threads: ThreadProps[];
}

interface ThreadProps {
  avatarUrl: string;
  name: string;
  userTags: string[];
  tags: string[];
  time: Date;
  content?: string;
  images: string[];
  comments: string[];
  votesCount: number;
  commentsCount: number;
}

const thread = {
  avatarUrl: avatar,
  name: '王某某',
  userTags: ['已认证'],
  tags: ['活动', '精选'],
  time: new Date(),
  content:
    '组件拖出来特别多一个一个删麻烦。这个问题，首先将组件拖入画布中，然后按住“shift”键，用鼠标点击要使用的组件，使该组件取消选择。组件拖出来特别多一个一个删麻烦。这个问题，首先将组件拖入画布中，然后按住“shift”键，用鼠标点击要使用的组件，使该组件取消选择。组件拖出来特别多一个一个删麻烦。这个问题，首先将组件拖入画布中，然后按住“shift”键，用鼠标点击要使用的组件，使该组件取消选择。',
  images: [
    'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  ],
  comments: ['张三: 这个好', '李四: 这个不好'],
  votesCount: 100,
  commentsCount: 100,
};
const data: PageProps = {
  avatarUrl: avatar,
  title: '前端学习计划',
  threads: [thread, thread, thread, thread],
};

export default function () {
  return <Page {...data} />;
}

function Page(props: PageProps) {
  const [selected, setSelected] = useState(['topic']);

  const onMenuClick = function ({ key, keyPath }: { key: any; keyPath: any }) {
    console.log(key);
    setSelected(keyPath);
  };

  return (
    <>
      <Affix
        style={{
          width: '100%',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
          }}
        >
          <ArrowLeftOutlined
            style={{
              fontSize: 'x-large',
              margin: '10px',
            }}
            onClick={() => {
              history.back();
            }}
          />
          <Title
            level={4}
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '0 5px',
            }}
          >
            <Avatar
              shape="circle"
              src={props.avatarUrl}
              style={{
                marginRight: '10px',
              }}
            ></Avatar>
            {props.title}
          </Title>
          <div
            style={{
              position: 'relative',
            }}
          >
            <Menu
              mode="horizontal"
              defaultSelectedKeys={['topic']}
              onClick={onMenuClick}
              selectedKeys={selected}
            >
              <Menu.Item key="topic">话题</Menu.Item>
              <Menu.Item key="about">与我有关</Menu.Item>
            </Menu>
            <Button
              style={{
                position: 'absolute',
                top: '0px',
                right: '10px',
                transform: 'translateY(10px)',
              }}
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
            ></Button>
          </div>
        </div>
      </Affix>

      {selected[0] === 'topic' ? (
        <div>
          {props.threads.map((v, i) => (
            <Thread key={i} {...v}></Thread>
          ))}
        </div>
      ) : (
        <div />
      )}
    </>
  );
}

function Thread(props: ThreadProps) {
  return (
    <div style={{ margin: '10px 10px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        <Avatar
          style={{ alignSelf: 'center', marginRight: '10px' }}
          src={props.avatarUrl}
        ></Avatar>
        <div>
          <Text
            strong
            style={{
              marginRight: '10px',
            }}
          >
            {props.name}
          </Text>
          {props.userTags.map((tag) => (
            <Text code key={tag}>
              {tag}
            </Text>
          ))}
          <div>
            <Text
              style={{
                textAlign: 'center',
              }}
            >
              {dayjs(props.time).format('HH:mm YYYY-MM-DD')}
            </Text>
          </div>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div style={{ alignSelf: 'flex-end' }}>
          {props.tags.map((v) => (
            <Text code key={v}>
              {v}
            </Text>
          ))}
        </div>
      </div>
      <div style={{ margin: '0 5px' }}>
        <div>
          <Paragraph
            ellipsis={{
              rows: 2,
              expandable: true,
              symbol: '更多',
            }}
            style={{
              margin: '10px 0',
            }}
          >
            {props.content}
          </Paragraph>
          <div style={{ display: 'flex' }}>
            {props.images.map((v, i) => (
              <div
                key={i}
                style={{
                  marginRight: '20px',
                }}
              >
                <Image src={v} width={130}></Image>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            margin: '10px 0',
          }}
        >
          {props.comments.map((v, i) => (
            <Alert
              key={i}
              message={v}
              type="warning"
              style={{
                margin: '5px 0',
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            margin: '15px 0',
          }}
        >
          <div
            style={{
              marginRight: '20px',
            }}
          >
            <LikeOutlined />
            {props.votesCount}
          </div>
          <div>
            <MessageOutlined />
            {props.commentsCount}
          </div>
          <div style={{ flexGrow: 1 }}></div>
          <EllipsisOutlined style={{ marginRight: '10px' }} />
        </div>
      </div>
      <Divider
        style={{
          margin: '10px 0',
        }}
      ></Divider>
    </div>
  );
}
