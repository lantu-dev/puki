import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Image, Typography } from 'antd';
// @ts-ignore
import Jdenticon from 'react-jdenticon';
import style from './EventCard.less';

const { Paragraph } = Typography;

interface EventCardProps {
  ImageUrl: string;
  Title: string;
  Description: string;
  style?: React.CSSProperties;
  onClickCard?: () => void;
  onClickDelete?: () => void;
}

export default function EventCard(props: EventCardProps) {
  return (
    <Card
      bodyStyle={{ height: 'fit-content' }}
      size="small"
      style={{ padding: '10px', height: '250px', ...props.style }}
      cover={
        <div className={style.image}>
          {props.ImageUrl ? (
            <Image src={props.ImageUrl} />
          ) : (
            <Jdenticon size="120px" value={props.Description} />
          )}
        </div>
      }
    >
      <div onClick={props.onClickCard}>
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
      </div>
      <Button
        danger
        icon={<CloseOutlined />}
        type="primary"
        size="small"
        style={{
          position: 'absolute',
          right: '0',
          top: '0',
        }}
        onClick={props.onClickDelete}
      />
    </Card>
  );
}
