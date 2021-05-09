import './AboutUs.less';
import './header.less';
/*import logoSrc from '@/pages/zj/bq/lantu_blue.png'*/
import { Link } from 'umi';
import { Layout, Menu, Button, Card, Avatar, Input, Divider } from 'antd';
const { Header, Content, Footer } = Layout;
import HomePageheader from '@/components/HomePageheader';
import {
  WechatOutlined,
  WeiboCircleOutlined,
  TwitterOutlined,
} from '@ant-design/icons';

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import ProCardDivider from '@ant-design/pro-card/lib/components/Divider';
import HomePageFooter from '@/components/HomePageFooter';
const { Meta } = Card;
const { TextArea } = Input;

export default function IndexPage() {
  return (
    <div>
      <Layout className="layout">
        <HomePageheader nowPage={3} />

        <Content className="content">
          <div className="site-layout-content">
            <section className="about-us">
              <div className="passag">
                <div className="image-container"></div>
              </div>
              <div className="passage">
                <div className="title">
                  <br></br>
                  <p> 关于我们 </p>
                </div>
                <div className="description">
                  <p>
                    蓝图创新工作室是以“解决现实问题软硬件产品的研发、技术的创新与成果的深化”为目的。在北邮各院志同道合之士的共同努力下，真正将技术落到实处的团体。
                  </p>
                </div>
              </div>
            </section>
          </div>
          <Divider>
            <ArrowUpOutlined />
          </Divider>
          <section className="about-us2">
            {/* <br></br> */}
            <div className="tu"></div>
            <div className="passage">
              <div className="title">
                <br></br>
                <p>蓝图泰和（北京）科技有限责任公司</p>
              </div>
              <div className="description">
                <p>
                  位于北京市海淀区上地信息路26号1层0106-597室，注册于 2021 年 01
                  月 08 日
                </p>
                <p>是一家由社团创立，主要经营软件开发和服务的有限责任公司。</p>
              </div>
            </div>
          </section>

          {/*<section className="ourteam">*/}
          {/*  <div className="title">*/}
          {/*    <p>我们的团队</p>*/}
          {/*  </div>*/}
          {/*  <div className="person">*/}
          {/*    <Card*/}
          {/*      className="Card"*/}
          {/*      hoverable*/}
          {/*      bordered={false}*/}
          {/*      style={{ width: 220 }}*/}
          {/*      cover={*/}
          {/*        <img*/}
          {/*          className="img"*/}
          {/*          alt="example"*/}
          {/*          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"*/}
          {/*        />*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <Meta className="name" title="XXXXX" />*/}
          {/*      <p className="description">职务职务职务</p>*/}
          {/*    </Card>*/}
          {/*  </div>*/}
          {/*  <div className="person">*/}
          {/*    <Card*/}
          {/*      className="Card"*/}
          {/*      hoverable*/}
          {/*      bordered={false}*/}
          {/*      style={{ width: 220 }}*/}
          {/*      cover={*/}
          {/*        <img*/}
          {/*          className="img"*/}
          {/*          alt="example"*/}
          {/*          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"*/}
          {/*        />*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <Meta className="name" title="XXXXX" />*/}
          {/*      <p className="description">职务职务职务</p>*/}
          {/*    </Card>*/}
          {/*  </div>*/}
          {/*  <div className="person">*/}
          {/*    <Card*/}
          {/*      className="Card"*/}
          {/*      hoverable*/}
          {/*      bordered={false}*/}
          {/*      style={{ width: 220 }}*/}
          {/*      cover={*/}
          {/*        <img*/}
          {/*          className="img"*/}
          {/*          alt="example"*/}
          {/*          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"*/}
          {/*        />*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <Meta className="name" title="XXXXX" />*/}
          {/*      <p className="description">职务职务职务</p>*/}
          {/*    </Card>*/}
          {/*  </div>*/}
          {/*  <div className="person">*/}
          {/*    <Card*/}
          {/*      className="Card"*/}
          {/*      hoverable*/}
          {/*      bordered={false}*/}
          {/*      style={{ width: 220 }}*/}
          {/*      cover={*/}
          {/*        <img*/}
          {/*          className="img"*/}
          {/*          alt="example"*/}
          {/*          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"*/}
          {/*        />*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <Meta className="name" title="XXXXX" />*/}
          {/*      <p className="description">职务职务职务</p>*/}
          {/*    </Card>*/}
          {/*  </div>*/}
          {/*  <div className="person">*/}
          {/*    <Card*/}
          {/*      className="Card"*/}
          {/*      hoverable*/}
          {/*      bordered={false}*/}
          {/*      style={{ width: 220 }}*/}
          {/*      cover={*/}
          {/*        <img*/}
          {/*          className="img"*/}
          {/*          alt="example"*/}
          {/*          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"*/}
          {/*        />*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <Meta className="name" title="XXXXX" />*/}
          {/*      <p className="description">职务职务职务</p>*/}
          {/*    </Card>*/}
          {/*  </div>*/}
          {/*  <div className="person">*/}
          {/*    <Card*/}
          {/*      className="Card"*/}
          {/*      hoverable*/}
          {/*      bordered={false}*/}
          {/*      style={{ width: 220 }}*/}
          {/*      cover={*/}
          {/*        <img*/}
          {/*          className="img"*/}
          {/*          alt="example"*/}
          {/*          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"*/}
          {/*        />*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <Meta className="name" title="XXXXX" />*/}
          {/*      <p className="description">职务职务职务</p>*/}
          {/*    </Card>*/}
          {/*  </div>*/}
          {/*  <div className="person">*/}
          {/*    <Card*/}
          {/*      className="Card"*/}
          {/*      hoverable*/}
          {/*      bordered={false}*/}
          {/*      style={{ width: 220 }}*/}
          {/*      cover={*/}
          {/*        <img*/}
          {/*          className="img"*/}
          {/*          alt="example"*/}
          {/*          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"*/}
          {/*        />*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <Meta className="name" title="XXXXX" />*/}
          {/*      <p className="description">职务职务职务</p>*/}
          {/*    </Card>*/}
          {/*  </div>*/}
          {/*  <div className="person">*/}
          {/*    <Card*/}
          {/*      className="Card"*/}
          {/*      hoverable*/}
          {/*      bordered={false}*/}
          {/*      style={{ width: 220 }}*/}
          {/*      cover={*/}
          {/*        <img*/}
          {/*          className="img"*/}
          {/*          alt="example"*/}
          {/*          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"*/}
          {/*        />*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <Meta className="name" title="XXXXX" />*/}
          {/*      <p className="description">职务职务职务</p>*/}
          {/*    </Card>*/}
          {/*  </div>*/}
          {/*</section>*/}
          <section className="jiaru">
            <div className="text">
              <div className="title">
                <p>
                  让我们一起合作<br></br>一起做一个了不起的项目吧
                </p>
              </div>
              <div className="kk">
                <p className="biao"></p>
                <p className="iner">微信关注：北邮蓝图</p>
              </div>
              <div className="kk">
                <p className="biao">联系地址</p>
                <p className="iner">北京市海淀区</p>
                <p className="iner">北太平庄街道西土城路10号北京邮电大学</p>
              </div>
              <div className="kk">
                <p className="biao">联系邮箱</p>
                <p className="iner">lantu@blueprint.org.cn</p>
              </div>
            </div>
            <div className="tianru">
              <img
                src="https://cdn-file.blueprint.org.cn/%E8%93%9D%E5%9B%BElogo.jpg"
                className="logo"
              />
              {/*<TextArea placeholder="您怎么称呼" autoSize />*/}
              {/*<div style={{ margin: '28px 0' }} />*/}
              {/*<TextArea placeholder="请输入您的邮箱" autoSize />*/}
              {/*<div style={{ margin: '28px 0' }} />*/}
              {/*<TextArea*/}
              {/*  placeholder="请选择您的项目类型"*/}
              {/*  autoSize={{ minRows: 2, maxRows: 6 }}*/}
              {/*/>*/}
              {/*<div style={{ margin: '28px 0' }} />*/}
              {/*<TextArea*/}
              {/*  placeholder="请描述您的问题"*/}
              {/*  autoSize={{ minRows: 5, maxRows: 5 }}*/}
              {/*/>*/}
            </div>
          </section>
        </Content>
        <HomePageFooter />
      </Layout>
    </div>
  );
}
