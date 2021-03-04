import { SalonInfo } from '@/api-client/events';
import { Typography, Carousel, Card } from 'antd';
import moment from 'moment';

const { Paragraph } = Typography;

export default function Salon(props: SalonInfo) {
  return (
    <Carousel autoplay>
      {props.Schedules.map((v) => (
        <Card
          extra={moment(v.StartedAt).format('HH:mm A')}
          key={v.TalkerName}
          style={{ width: 300 }}
          title={`${v.TalkerName} ${v.TalkerTitle}`}
        >
          <Paragraph
            ellipsis={{
              rows: 2,
              expandable: true,
              symbol: '更多',
            }}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {v.TalkerDescription.replaceAll('\\n', '\n')}
          </Paragraph>
        </Card>
      ))}
    </Carousel>
  );
}
