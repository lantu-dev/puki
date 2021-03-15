import events from '@/backend/events';
import { call } from '@/utils/client';
import { Card, List, Typography } from 'antd';
import { useAsync } from 'react-use';

const { Paragraph } = Typography;

interface AnswersProps {
  questionID: string;
}

export default function Answers(props: AnswersProps) {
  const answersList = useAsync(async () => {
    const res = await call(events.QuestionService.GetAnswersList, {
      questionID: props.questionID,
    });
    console.log(res);
    return res;
  });

  return (
    <>
      <List
        dataSource={answersList.value}
        renderItem={(item) => (
          <Card
            bordered={false}
            extra={item.time}
            key={item.answerID}
            size="small"
          >
            <Paragraph>{item.content}</Paragraph>
            <span>回答者：{item.replyer}</span>
          </Card>
        )}
      />
    </>
  );
}
