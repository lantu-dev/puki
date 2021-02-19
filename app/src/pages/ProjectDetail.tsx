import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Typography } from 'antd';

const { Title } = Typography;
// flexbox
export default function ProjectDetail() {
    return (
        <div>
            <div style={{ display: "flex" }}>
                <Title level={2}><ArrowLeftOutlined style={{ fontSize: "24px" }} />  h2. Ant Design</Title>
            </div>
        </div>
    );
}
