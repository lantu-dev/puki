import { Col, Image, Row, Typography } from 'antd';
import Avatar from '@/components/Avatar';
import React from 'react';
import moment from 'moment';

export interface UserInfoProps {
  id?: string;
  avatarUrl?: string;
  displayName: string;
  createdAt: Date;
}

export function UserInfo(props: UserInfoProps) {
  return (
    <div className="flex px2 py1 items-center">
      <Col>
        <Avatar
          src={props.avatarUrl}
          id={props.id}
          head={props.displayName}
          size="large"
        />
      </Col>
      <Col className="ml1">
        <Row>
          <Col>
            <Typography.Text strong>{props.displayName}</Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            {' '}
            <Col>{moment(props.createdAt).format('HH:mm YYYY-MM-DD')}</Col>
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export interface PreviewProps extends UserInfoProps {
  title: string;
  abstract: string;
  imageUrls: string[];
}

export function Preview(props: PreviewProps) {
  return (
    <Col>
      <Row>
        <UserInfo {...props} />
      </Row>
      <Row>
        <Typography.Paragraph>
          <Typography.Text strong>{props.title}</Typography.Text>
          {props.abstract}...
        </Typography.Paragraph>
      </Row>
      <Row>
        {props.imageUrls.map((url) => (
          <Col>
            <Image src={url} preview={{ src: `${url}-thumbnail` }} />
          </Col>
        ))}
      </Row>
    </Col>
  );
}
