import { Col, Row, Layout } from 'antd';
const { Footer } = Layout;
import {
  GithubOutlined,
  WechatOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';

export default function HomePageFooter() {
  return (
    <Footer>
      <div style={{ height: '500px', paddingTop: '100px' }}>
        <Row wrap={false}>
          <Col flex={'15%'} />
          <Col flex={'10%'}>
            <div style={{ fontWeight: 600 }}>产品</div>
            <div style={{ fontWeight: 500, color: 'gray', marginTop: '30px' }}>
              宝蕴
            </div>
            <div style={{ fontWeight: 500, color: 'gray', marginTop: '10px' }}>
              乾清
            </div>
            <div style={{ fontWeight: 500, color: 'gray', marginTop: '10px' }}>
              导览机器人
            </div>
            <div style={{ fontWeight: 500, color: 'gray', marginTop: '10px' }}>
              泰和系统
            </div>
            <div style={{ fontWeight: 500, color: 'gray', marginTop: '10px' }}>
              组队系统
            </div>
            <div style={{ fontWeight: 500, color: 'gray', marginTop: '10px' }}>
              蓝图开放平台
            </div>
            <div style={{ fontWeight: 500, color: 'gray', marginTop: '10px' }}>
              校园导览
            </div>
          </Col>
          <Col flex={'5%'} />
          <Col flex={'10%'}>
            <div style={{ fontWeight: 600 }}>社团介绍</div>
            <div style={{ fontWeight: 500, color: 'gray', marginTop: '30px' }}>
              简介
            </div>
            <div style={{ fontWeight: 500, color: 'gray', marginTop: '10px' }}>
              组织架构
            </div>
            <div style={{ fontWeight: 500, color: 'gray', marginTop: '10px' }}>
              蓝图历程
            </div>
            <div style={{ fontWeight: 500, color: 'gray', marginTop: '10px' }}>
              蓝图章程
            </div>
          </Col>
          <Col flex={'auto'} />
          <Col flex={'30%'}>
            <div style={{ fontWeight: 600 }}>蓝图科创实践部</div>
            <div style={{ fontWeight: 500, color: 'gray', marginTop: '30px' }}>
              来自：北京邮电大学计算机学院（国家示范性软件学院）
            </div>
            <div style={{ fontWeight: 500, color: 'gray', marginTop: '10px' }}>
              微信关注：北邮蓝图
            </div>
            <div style={{ fontWeight: 500, color: 'gray', marginTop: '10px' }}>
              邮箱：lantu@blueprint.org.cn
            </div>
            <Row style={{ marginTop: '10px' }}>
              <Col flex={'15%'}>
                <div style={{ fontSize: '20px', color: 'gray' }}>
                  <WeiboCircleOutlined />
                </div>
              </Col>
              <Col flex={'15%'}>
                <div style={{ fontSize: '20px', color: 'gray' }}>
                  <WechatOutlined />
                </div>
              </Col>
              <Col flex={'15%'}>
                <div style={{ fontSize: '20px', color: 'gray' }}>
                  <GithubOutlined />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div style={{ margin: 'auto', marginTop: '50px', textAlign: 'center' }}>
          © 2020 - 2021 蓝图创新工作室 版权所有
        </div>
      </div>
    </Footer>
  );
}
