import { Row, Col, Space } from 'antd';
import { history } from 'umi';
import { PlusCircleTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import { useAsync } from 'react-use';
import { call } from '@/api-client';

const { Title } = Typography;

export interface GetQuestionInfoRes {
  title: string;
  question: string;
  date: string;
  questioner: string;
}

export function Question() {
  const questionData = useAsync(async () => {
    const res = await call<any, GetQuestionInfoRes>(
      'events/Info.GetQuestionInfo',
      { QuestionID: 1 },
    );
    console.log(res);
    return res;
  });

  return (
    <div
      onClick={() => {
        history.push({
          pathname: './answers',
          query: {
            //SelectedID :ID,
          },
        });
      }}
      style={{
        border: '2px solid #f5f5f5',
      }}
    >
      <Row justify="space-between">
        <Col offset={1}>
          <Title level={5}>{questionData.value?.title}</Title>
        </Col>
        <Col pull={1}>{questionData.value?.date}</Col>
      </Row>
      <Space direction={'vertical'}>
        <Row>
          <Col offset={1}>{questionData.value?.question}</Col>
        </Row>
        <Row>
          <Col offset={1}>{'提问者：' + questionData.value?.questioner}</Col>
        </Row>
      </Space>
    </div>
  );
}

//点击加号的回调函数
function AddQuestion() {
  window.alert('点击了加号按钮');
}

export default function Questions() {
  return (
    <div>
      <PlusCircleTwoTone onClick={AddQuestion}></PlusCircleTwoTone>
      <Question></Question>
    </div>
  );
}
