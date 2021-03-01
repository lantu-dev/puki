import lantu_blue from '@/assets/lantu-blue.png';
import tree from '@/assets/tree.png';
import { Button, Col, Image, Input, Row, Space, Switch } from 'antd';
import { Link } from 'umi';
import style from '@/pages/community/community.less';
import { useState } from 'React';
interface PageProps {
  title: string;
  content: string;
  threads: Thread[];
}

interface Thread {
  title: string;
  content: string;
  commentIcon: string;
  comments: string;
  peopleIcon: string;
  people: string;
  rateIcon: string;
  rate: string;
  //image: string[];
}

const data: PageProps = {
  title: '#社区#',
  content: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
  threads: [
    {
      title: '论坛帖子论坛帖子论坛帖子论坛帖子论坛帖子',
      content: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
      commentIcon: '',
      comments: '156人评价',
      peopleIcon: '',
      people: '26人参与讨论',
      rateIcon: '',
      rate: '4.7',
      // image: '', //{tree},
    },
  ],
};
export default function Community() {
  const [state, setState] = useState(0);
  return (
    <div className={style.background}>
      <Row justify="space-between" style={{ fontSize: '0.8em' }}>
        <Image src={lantu_blue} preview={false} className={style.lantu}></Image>
        <Col>首页</Col>
        <Col>功能模块</Col>
        <Col>关于我们</Col>
        <Col>社区</Col>

        <Button shape="round" type="primary">
          注册/登录
        </Button>
      </Row>
      {/* <Row>
        <Col
          className={`${state === 0 ? style.active : ''}`}
          onClick={() => {
            setState(0);
          }}
        >
          开源代码
        </Col>
        <Col
          className={`${state === 1 ? style.active : ''}`}
          onClick={() => {
            setState(1);
          }}
        >
          XXXXXXX
        </Col>
        <Col
          className={`${state === 2 ? style.active : ''}`}
          onClick={() => {
            setState(2);
          }}
        >
          XXXXXXX
        </Col>
        <Col
          className={`${state === 3 ? style.active : ''}`}
          onClick={() => {
            setState(3);
          }}
        >
          XXXXXXX
        </Col>
        <Col
          className={`${state === 4 ? style.active : ''}`}
          onClick={() => {
            setState(4);
          }}
        >
          XXXXXXX
        </Col>
        <Col
          className={`${state === 5 ? style.active : ''}`}
          onClick={() => {
            setState(5);
          }}
        >
          XXXXXXX
        </Col>
        <Col
          className={`${state === 6 ? style.active : ''}`}
          onClick={() => {
            setState(6);
          }}
        >
          XXXXXXX
        </Col>
      </Row> */}
      {/* <>
        {[0, 1, 2, 3, 4, 5, 6].map((v) => (
          <div
            key={v}
            className={`${style.tab} ${state === v ? style.active : ''}`}
            onClick={() => {
              console.log(v);
              setState(v);
            }}
          >
            {v + 1}
          </div>
        ))}
      </> */}

      {/* <div>
      <div>
        <div>欢迎使用</div> 
        <div>蓝图开放平台</div>
        <Button>注册/登录</Button>
        <Button>了解更多</Button>
      </div>
    </div> */}
      <Row justify="space-between" style={{ fontSize: '0.8em' }}>
        <Col>
          {' '}
          <Link to="/">产品</Link>
        </Col>
        <Col>
          {' '}
          <Link to="/">企业介绍</Link>
        </Col>
      </Row>
      <Row>
        <Col>
          {' '}
          <Link to="/">产品介绍</Link>
        </Col>
        <Col>
          {' '}
          <Link to="/">关于我们</Link>
        </Col>
      </Row>
      <Row justify="space-between" style={{ fontSize: '0.8em' }}>
        <Col>
          {' '}
          <Link to="/">产品服务</Link>
        </Col>
        <Col>
          {' '}
          <Link to="/">社区</Link>
        </Col>
      </Row>

      <div>蓝图开放平台</div>
      <div>来自：北京邮电大学计算机学院</div>
      <div>电话：xxx</div>
      <div>邮箱：XXX@xx.com</div>
    </div>
  );
}
