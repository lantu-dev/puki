import events from '@/backend/events';
import { call } from '@/utils/client';
import { QuestionInfo } from '@/backend/events';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Drawer, Typography } from 'antd';
import { useAsync, useMethods } from 'react-use';
import { history } from 'umi';
import Answers from './components/Answers';

const { Paragraph, Title } = Typography;

const initialState = {
  visible: false,
  questionInfo: {} as QuestionInfo,
};
const createMethods = (state: typeof initialState) => ({
  openQuestion(questionInfo: QuestionInfo) {
    return { ...state, questionInfo, visible: true };
  },
  closeQuestion() {
    return { ...state, visible: false };
  },
});

export default function Questions() {
  const [state, methods] = useMethods(createMethods, initialState);

  const questionsList = useAsync(async () => {
    const res = await call(events.QuestionService.GetQuestionsList, {
      eventID: history.location.query?.eventID,
    });
    console.log(res);
    return res;
  });

  return (
    <>
      {questionsList.value?.map((v) => (
        <div
          key={v.questionID}
          onClick={() => {
            methods.openQuestion(v);
          }}
        >
          <Question {...v}></Question>
        </div>
      ))}

      <Drawer
        destroyOnClose
        headerStyle={{ paddingTop: '24px' }}
        onClose={methods.closeQuestion}
        title={<Question {...state.questionInfo}></Question>}
        visible={state.visible}
        width="100%"
      >
        <Title level={4}>回答</Title>
        <Answers questionID={state.questionInfo.questionID}></Answers>
      </Drawer>
      <div
        style={{
          position: 'fixed',
          right: '2em',
          bottom: '5em',
          opacity: 0.7,
        }}
      >
        <Button
          icon={<PlusOutlined />}
          shape="circle"
          size="large"
          type="primary"
        ></Button>
      </div>
    </>
  );
}

interface QuestionProps {
  questionID: string;
  question: string;
  questioner: string;
  time: string;
  title: string;
}

function Question(props: QuestionProps) {
  return (
    <Card
      bordered={false}
      extra={props.time}
      size="small"
      title={<Title level={5}>{props.title}</Title>}
    >
      <Paragraph>{props.question}</Paragraph>
      <span>{'提问者：' + props.questioner}</span>
    </Card>
  );
}
