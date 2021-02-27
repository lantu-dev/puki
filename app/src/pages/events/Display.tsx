import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, Menu, Row, Space, Typography } from 'antd';
// @ts-ignore
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import style from './Display.less';
import { useSetState } from 'react-use';

const { Text } = Typography;

export default function () {
  const [state, setState] = useSetState({
    menu: 'recommend',
  });

  return (
    <>
      <Space
        direction="vertical"
        style={{ width: '100%', backgroundColor: '#F6F6F6', padding: '16px' }}
      >
        <Row align="middle" justify="space-around" gutter={16} wrap={false}>
          <Col flex={1}>
            <Row
              align="middle"
              wrap={false}
              style={{
                padding: '5px 10px',
                backgroundColor: 'white',
                borderRadius: '5px',
              }}
            >
              <Col flex={1} style={{ textAlign: 'center' }}>
                您有 <span style={{ color: '#1890FF' }}>2</span>{' '}
                场正在进行的活动
              </Col>
              <Col>
                <Button
                  size="small"
                  type="primary"
                  style={{ borderRadius: '5px' }}
                >
                  查看
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Button
              icon={<SearchOutlined />}
              type="primary"
              style={{ borderRadius: '5px' }}
            ></Button>
          </Col>
        </Row>
        <div>
          <Text style={{ fontWeight: 'bolder', fontSize: 'x-large' }}>
            科技节
          </Text>
          <Slider
            centerMode
            infinite
            centerPadding="80px"
            style={{ margin: '1em' }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7].map((v) => (
              <div key={v}>
                <Card
                  hoverable
                  size="small"
                  style={{ padding: '10px' }}
                  cover={
                    <div className={style.image}>
                      <Image src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                    </div>
                  }
                >
                  <Card.Meta title="标题" description="描述" />
                </Card>
              </div>
            ))}
          </Slider>
        </div>
        <div>
          <Menu
            onClick={(e) => {
              setState({ menu: e.key as string });
            }}
            selectedKeys={[state.menu]}
            mode="horizontal"
            style={{ width: '204px' }}
          >
            <Menu.Item key="recommend">推荐</Menu.Item>
            <Menu.Item key="salon">沙龙</Menu.Item>
            <Menu.Item key="lecture">讲座</Menu.Item>
          </Menu>
          <Slider
            centerMode
            centerPadding="0"
            infinite={false}
            vertical
            verticalSwiping
          >
            {[0, 1, 2, 3, 4, 5, 6, 7].map((v) => (
              <div key={v}>
                <Card
                  style={{ margin: '10px' }}
                  cover={
                    <div className={style.image}>
                      <Image src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                    </div>
                  }
                >
                  <Card.Meta title="标题" description="描述" />
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </Space>
    </>
  );
}
