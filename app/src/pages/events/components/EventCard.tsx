import { Card, Image, Typography } from 'antd';
import style from './EventCard.less';

const { Paragraph } = Typography;

interface EventCardProps {
  ImageUrl: string;
  Title: string;
  Description: string;
}

export default function EventCard(props: EventCardProps) {
  return (
    <Card
      bodyStyle={{ height: 'fit-content' }}
      hoverable
      size="small"
      style={{ padding: '10px', height: '250px' }}
      cover={
        <div className={style.image}>
          <Image src={props.ImageUrl} />
        </div>
      }
    >
      <Card.Meta
        title={props.Title}
        description={
          <Paragraph
            ellipsis={{
              rows: 2,
            }}
          >
            {props.Description}
          </Paragraph>
        }
      />
    </Card>
  );
}
