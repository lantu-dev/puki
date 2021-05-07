import './AboutUs.less';
/*import logoSrc from '@/pages/zj/bq/lantu_blue.png'*/
import { Link } from 'umi';
import { Layout, Menu, Button, Card, Avatar, Input, Divider } from 'antd';
const { Header, Content, Footer } = Layout;
import Homepageheader from '@/components/Homepageheader'
import {
  WechatOutlined,
  WeiboCircleOutlined,
  TwitterOutlined,
} from '@ant-design/icons';

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ArrowUpOutlined
} from '@ant-design/icons';
import ProCardDivider from '@ant-design/pro-card/lib/components/Divider';
const { Meta } = Card;
const { TextArea } = Input;

export default function IndexPage() {
  return (
    <div>
      <Layout className="layout">
        <Homepageheader />

        <Content className="content">
          <div className="site-layout-content">
            <section className="about-us">
              <div className="passag">
                <div className="image-container"></div>
              </div>
              <div className="passage">
                <div className="title">
                  <br></br>
                  <p># 关于我们 #</p>
                </div>
                <div className="description">
                  <p>
                    简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介
                  </p>
                </div>
              </div>
            </section>
          </div>
          <Divider><ArrowUpOutlined /></Divider>
          <section className="about-us2">
            {/* <br></br> */}
            <div className="tu"></div>
            <div className="passage">
              <div className="title">
                <br></br>
                <p>蓝图xxxxxxxxxxx有限公司</p>
              </div>
              <div className="description">
                <p>
                  简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介
                </p>
                <p>
                  简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介
                </p>
              </div>
            </div>
          </section>

          <section className="ourteam">
            <div className="title">
              <p>我们的团队</p>
            </div>
            <div className="person">
              <Card
                className="Card"
                hoverable
                bordered={false}
                style={{ width: 220 }}
                cover={
                  <img
                    className="img"
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta className="name" title="XXXXX" />
                <p className="description">职务职务职务</p>
              </Card>
            </div>
            <div className="person">
              <Card
                className="Card"
                hoverable
                bordered={false}
                style={{ width: 220 }}
                cover={
                  <img
                    className="img"
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta className="name" title="XXXXX" />
                <p className="description">职务职务职务</p>
              </Card>
            </div>
            <div className="person">
              <Card
                className="Card"
                hoverable
                bordered={false}
                style={{ width: 220 }}
                cover={
                  <img
                    className="img"
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta className="name" title="XXXXX" />
                <p className="description">职务职务职务</p>
              </Card>
            </div>
            <div className="person">
              <Card
                className="Card"
                hoverable
                bordered={false}
                style={{ width: 220 }}
                cover={
                  <img
                    className="img"
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta className="name" title="XXXXX" />
                <p className="description">职务职务职务</p>
              </Card>
            </div>
            <div className="person">
              <Card
                className="Card"
                hoverable
                bordered={false}
                style={{ width: 220 }}
                cover={
                  <img
                    className="img"
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta className="name" title="XXXXX" />
                <p className="description">职务职务职务</p>
              </Card>
            </div>
            <div className="person">
              <Card
                className="Card"
                hoverable
                bordered={false}
                style={{ width: 220 }}
                cover={
                  <img
                    className="img"
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta className="name" title="XXXXX" />
                <p className="description">职务职务职务</p>
              </Card>
            </div>
            <div className="person">
              <Card
                className="Card"
                hoverable
                bordered={false}
                style={{ width: 220 }}
                cover={
                  <img
                    className="img"
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta className="name" title="XXXXX" />
                <p className="description">职务职务职务</p>
              </Card>
            </div>
            <div className="person">
              <Card
                className="Card"
                hoverable
                bordered={false}
                style={{ width: 220 }}
                cover={
                  <img
                    className="img"
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta className="name" title="XXXXX" />
                <p className="description">职务职务职务</p>
              </Card>
            </div>
          </section>
          <section className="jiaru">
            <div className="text">
              <div className="title">
                <p>
                  让我们一起合作<br></br>一起做一个了不起的项目吧
                </p>
              </div>
              <div className="kk">
                <p className="biao">联系电话</p>
                <p className="iner">+86 XXXXXXXXXX</p>
              </div>
              <div className="kk">
                <p className="biao">联系地址</p>
                <p className="iner">北京市海淀区</p>
                <p className="iner">北太平庄街道西土城路10号北京邮电大学</p>
              </div>
              <div className="kk">
                <p className="biao">联系邮箱</p>
                <p className="iner">XXXXXXXX@XX.com</p>
              </div>
            </div>
            <div className="tianru">
              <TextArea placeholder="您怎么称呼" autoSize />
              <div style={{ margin: '28px 0' }} />
              <TextArea placeholder="请输入您的邮箱" autoSize />
              <div style={{ margin: '28px 0' }} />
              <TextArea
                placeholder="请选择您的项目类型"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
              <div style={{ margin: '28px 0' }} />
              <TextArea
                placeholder="请描述您的问题"
                autoSize={{ minRows: 5, maxRows: 5 }}
              />
            </div>
            <div className="tu"></div>
          </section>
          <section className="jww">
            <div className="gyl">
              <ul>
                <p className="tt">产品</p>
                <Button className="lk">
                  <Link to="">产品介绍</Link>
                </Button>
                <Button className="lk">
                  <Link to="">产品服务</Link>
                </Button>
              </ul>
            </div>
            <div className="gyl">
              <ul>
                <p className="tt">企业介绍</p>
                <Button className="lk">
                  <Link to="">关于我们</Link>
                </Button>
                <Button className="lk">
                  <Link to="">社区</Link>
                </Button>
              </ul>
            </div>

            <div className="guanyu">
              <h2 className="title">蓝图开放平台</h2>
              <p className="passage">来自：北京邮电大学计算机学院</p>
              <p className="passage">电话：***********</p>
              <p className="passage">邮箱：***@.******.com</p>
              <div className="biao">
                <WechatOutlined />
              </div>
              <div className="biao">
                <WeiboCircleOutlined />
              </div>
              <div className="biao">
                <TwitterOutlined />
              </div>
            </div>
          </section>
        </Content>
        <Footer style={{ textAlign: 'center' }}>蓝图创新工作室 ©2021</Footer>
      </Layout>
    </div>
  );
}
