import { HackathonInfo } from '@/backend/events';
import { Typography } from 'antd';

const { Paragraph } = Typography;

export default function Hackathon(props: HackathonInfo) {
  return (
    <Paragraph
      ellipsis={{
        rows: 2,
        expandable: true,
        symbol: '更多',
      }}
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {props.Hackathon.Steps.replaceAll('\\n', '\n')}
    </Paragraph>
  );
}
