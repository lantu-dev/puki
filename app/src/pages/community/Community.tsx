import React from 'react';
import { Button, Menu, Typography, Avatar, Pagination } from 'antd';
import {
  UserAddOutlined,
  TeamOutlined,
  SnippetsOutlined,
  UserOutlined,
  HeartOutlined,
  StarOutlined,
  EditOutlined,
  TwitterOutlined,
  WeiboOutlined,
  WechatOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

interface PageProps {
  partName: string;
  introduction: string;
  threads: Thread[];
}

interface Thread {
  postTitle: string;
  postContent: string;
  commentNumber: number;
  participantsNumber: number;
  score: number;
}

const data: PageProps = {
  partName: '# 社 区 #',
  introduction:
    '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
  threads: [
    {
      postTitle: '论坛帖子论坛帖子论坛帖子论坛帖子论坛帖子',
      postContent:
        '简介简介简介简介简介简介简介简介简介简介简介，简介简介简介简介简介，简介简介简介简介简介，简介简介简介简介简介，简介简介简介简介简介，简介简介简介简介简介.',
      commentNumber: 156,
      participantsNumber: 26,
      score: 4.7,
    },
  ],
};

export default function CommunityPage() {
  const { partName, introduction } = data;
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/*以下顶部导航栏 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div
            style={{
              marginLeft: '150px',
            }}
          >
            <img src="https://i.loli.net/2021/02/27/eV4LEtv8DQGJT3o.png"></img>
          </div>
          <div
            style={{
              marginLeft: '440px',
              marginRight: '149px',
              marginTop: '20px',
            }}
          >
            <Menu mode="horizontal">
              <Menu.Item key="home">
                <a
                  href="https://ant.design"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  首页
                </a>
              </Menu.Item>
              <Menu.Item key="function">
                <a
                  href="https://ant.design"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  功能模块
                </a>
              </Menu.Item>
              <Menu.Item key="about">
                <a
                  href="https://ant.design"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  关于我们
                </a>
              </Menu.Item>
              <Menu.Item key="community">
                <a
                  href="https://ant.design"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  社区
                </a>
              </Menu.Item>
              <Menu.Item key="rigester/logIn">
                <a
                  href="https://ant.design"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  注册/登录
                </a>
              </Menu.Item>
            </Menu>
          </div>
        </div>
        {/*以下上方蓝框 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#3C44F1',
          }}
        >
          <br />
          <br />
          <div
            style={{
              color: 'white',
              fontSize: 70,
            }}
          >
            <b>{partName}</b>
          </div>

          <br />

          <div
            style={{
              color: 'white',
              fontSize: 25,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyItems: 'center',
            }}
          >
            <text>{introduction}</text>
          </div>
          <br />
          <br />
        </div>
        <br />
        <br />
        {/*以下左侧导航栏 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyItems: 'flex-start',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '125px',
              marginRight: '11px',
            }}
          >
            <div
              style={{
                backgroundColor: '#3C44F1',
              }}
            >
              <br />
              <div>
                <div
                  style={{
                    color: 'white',
                    fontSize: 20,
                    marginLeft: '5px',
                  }}
                >
                  <Button icon={<SnippetsOutlined />} size="large" ghost>
                    开源代码
                  </Button>
                </div>
              </div>
              <br />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Button icon={<TeamOutlined />} size="large" type="link">
                xxxxxxxx
              </Button>
              <Button icon={<UserOutlined />} size="large" type="link">
                xxxxxxxx
              </Button>
              <Button icon={<UserAddOutlined />} size="large" type="link">
                xxxxxxxx
              </Button>
              <Button icon={<TeamOutlined />} size="large" type="link">
                xxxxxxxx
              </Button>
              <Button icon={<HeartOutlined />} size="large" type="link">
                xxxxxxxx
              </Button>
              <Button icon={<TeamOutlined />} size="large" type="link">
                xxxxxxxx
              </Button>
            </div>
          </div>

          {/*论坛帖子重复部分只写了一遍 */}
          <div>
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
                }}
              >
                <div
                  style={{
                    marginRight: '108px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      marginLeft: '44px',
                      marginRight: '26px',
                      marginTop: '47px',
                    }}
                  >
                    <Title level={5}>
                      论坛帖子论坛帖子论坛帖子论坛帖子论坛帖子论坛帖子论坛帖子论坛帖子
                    </Title>
                    <text>
                      简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介
                    </text>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '15px',
                      }}
                    >
                      <div>
                        <Avatar icon={<UserOutlined />} />
                        <text>126人评价</text>
                      </div>
                      <div
                        style={{
                          marginLeft: '32px',
                        }}
                      >
                        <Avatar icon={<EditOutlined />} />
                        <text>27人参与讨论</text>
                      </div>
                      <div
                        style={{
                          marginLeft: '254px',
                        }}
                      >
                        <Avatar icon={<StarOutlined />} />
                        <text>4.7</text>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: '44px',
                    marginRight: '26px',
                    marginTop: '47px',
                  }}
                >
                  <img src="https://i.loli.net/2021/02/27/GqP9AxYZubT5R3c.png"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** 以下底部分页 */}
      <div
        style={{
          marginLeft: '600px',
        }}
      >
        <Pagination defaultCurrent={1} total={50} />
      </div>
      {/* 以下底部蓝框 */}
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#3C44F1',
            marginTop: '82px',
          }}
        >
          <br />
          <br />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                color: 'white',
                fontSize: 18,
                marginLeft: '140px',
              }}
            >
              <b>欢迎使用</b>
            </div>
            <div
              style={{
                color: 'white',
                fontSize: 60,
              }}
            >
              <b>蓝图开放平台</b>
            </div>
          </div>
          <br />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Button size="large">注册/登录</Button>
            <div
              style={{
                marginLeft: '55px',
              }}
            >
              <Button size="large">了解更多</Button>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
      {/**以下最底部白色文字跳转 */}
      <br />
      <br />
      <br />
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
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: '266px',
            }}
          >
            <Button type="text">产品</Button>
            <Button type="text" style={{ marginLeft: '188px' }}>
              企业介绍
            </Button>
          </div>
          <br />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: '266px',
            }}
          >
            <Button type="text">产品介绍</Button>
            <Button type="text" style={{ marginLeft: '159px' }}>
              关于我们
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: '266px',
            }}
          >
            <Button type="text">产品服务</Button>
            <Button type="text" style={{ marginLeft: '159px' }}>
              社区
            </Button>
          </div>
        </div>

        <div
          style={{
            marginLeft: '428px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Title level={4}>蓝图开放平台</Title>
          <br />
          <text>来自：北京邮电大学计算机学院</text>
          <text>电话：XXXXXXXXX</text>
          <text>邮箱：XXXXXXX@XXX.COM</text>
          <br />

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div>
              <Avatar icon={<WeiboOutlined />} />
            </div>
            <div style={{ marginLeft: '15px' }}>
              <Avatar icon={<WechatOutlined />} />
            </div>
            <div style={{ marginLeft: '15px' }}>
              <Avatar icon={<TwitterOutlined />} />
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

function ThreadView(props: Thread) {
  return (
    <>
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
          }}
        >
          <div
            style={{
              marginRight: '108px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                marginLeft: '44px',
                marginRight: '26px',
                marginTop: '47px',
              }}
            >
              <Title level={5}>{props.postTitle}</Title>
              <text>{props.postContent}</text>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <div>
                  <Avatar icon={<UserOutlined />} />
                  <text>{props.commentNumber}人评价</text>
                </div>
                <div
                  style={{
                    marginLeft: '32px',
                  }}
                >
                  <Avatar icon={<EditOutlined />} />
                  <text>{props.participantsNumber}人参与讨论</text>
                </div>
                <div
                  style={{
                    marginLeft: '254px',
                  }}
                >
                  <Avatar icon={<StarOutlined />} />
                  <text>{props.score}</text>
                </div>
              </div>
            </div>
            <div>
              <img src="https://i.loli.net/2021/02/27/GqP9AxYZubT5R3c.png"></img>
            </div>
          </div>
          <image></image>
        </div>
      </div>
    </>
  );
}
