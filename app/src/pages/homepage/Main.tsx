import { Col, Layout, Row } from 'antd';
import HomePageheader from '@/components/HomePageheader';
import HomePageFooter from '@/components/HomePageFooter';
import './header.less';
export default function Main() {
  return (
    <Layout>
      <HomePageheader nowPage={1} />
      <div
        style={{
          backgroundColor: '#3B43F2',
          overflow: 'hidden',
          overflowX: 'hidden',
        }}
      >
        <Row wrap={false}>
          <Col flex={'10%'} />
          <Col flex={'auto'}>
            <div style={{ marginTop: '120px' }}>
              <div
                style={{ color: 'white', fontSize: '32px', fontWeight: 700 }}
              >
                蓝图创新工作室
              </div>
              <div
                style={{ color: 'white', fontSize: '30px', fontWeight: 700 }}
              >
                LEAD THE FUTURE
              </div>
              <div
                style={{
                  color: 'white',
                  marginTop: '10px',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                计算机学院(国家示范性软件学院)蓝图创新协会
              </div>
              <div
                style={{
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                北京邮电大学蓝图创新工作室
              </div>
              <div
                style={{
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                计算机学院团委科创实践部
              </div>
            </div>
            <div style={{ marginTop: '100px', width: '500px' }}>
              <div
                style={{
                  float: 'left',
                  backgroundColor: 'white',
                  height: '40px',
                  width: '120px',
                  fontSize: '16px',
                  fontWeight: 600,
                  paddingTop: '6px',
                  borderRadius: '5px',
                  textAlign: 'center',
                }}
              >
                加入我们
              </div>
              <div
                style={{
                  float: 'left',
                  backgroundColor: 'black',
                  color: 'white',
                  height: '40px',
                  width: '120px',
                  fontSize: '16px',
                  fontWeight: 600,
                  paddingTop: '6px',
                  marginLeft: '30px',
                  borderRadius: '5px',
                  textAlign: 'center',
                }}
              >
                了解蓝图
              </div>
            </div>
          </Col>
          <Col flex={'60%'}>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(45deg, #3B43F2, #459EFF)',
                borderRadius: '100%',
                position: 'absolute',
                zIndex: 0,
                clipPath: 'polygon(0 70%, 0 0, 80% 0, 80% 70%)',
                right: '-20%',
                bottom: '-30%',
              }}
            />
            <img
              style={{ position: 'absolute', zIndex: 1 }}
              width={'100%'}
              src={
                'https://puki.obs.cn-north-4.myhuaweicloud.com/v2_qnj26c.png'
              }
            />
            <img
              width={'100%'}
              src={
                'https://puki.obs.cn-north-4.myhuaweicloud.com/v2_qnj26c.png'
              }
            />
          </Col>
        </Row>
      </div>
      <HomePageFooter />
    </Layout>
  );
}
