import React, { useState } from 'react';
import { Select } from 'antd';
import { Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
const { Option } = Select;

interface student {
  id: number;
  studentId: number;
  content: string;
}

const data: student[] = [
  {
    id: 0,
    studentId: 2019211001,
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
  {
    id: 1,
    studentId: 2019211002,
    content:
      'WeWe supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
  {
    id: 2,
    studentId: 2019211003,
    content:
      'WeWeWe supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
  {
    id: 3,
    studentId: 2019211005,
    content:
      'WeWeWeWe supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
];

export function PingYi() {
  const [Id, setId] = useState(0);
  const [val, setVal] = useState();

  const filterData = (data: student[]) => {
    const temp = data.filter((fp: student) => {
      return fp.studentId === val;
    })[0];
    if (temp != null) return temp.id;
    else return null;
  };

  const selectFunc = (val: any) => {
    setVal(val);
    const fId = filterData(data);
    fId ? setId(fId) : null;
  };
  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginTop: '60px' }}>
        <Col span={8} style={{ position: 'relative' }}>
          <Select
            showSearch
            style={{ width: 200, marginTop: '5%' }}
            placeholder="学号"
            optionFilterProp="children"
            allowClear
            maxTagCount={6}
            onChange={selectFunc}
            onSearch={selectFunc}
            onMouseLeave={selectFunc}
          >
            {data.map((item: student) => (
              <Option value={item.studentId} key={item.studentId}>
                {item.studentId}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={16} style={{ textAlign: 'center', position: 'relative' }}>
          <p
            style={{
              border: '1px solid black',
              width: '80%',
              position: 'relative',
              top: '50%',
              left: '10%',
            }}
          >
            {data[Id].content}
          </p>
        </Col>
      </Row>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: '5%',
        }}
      >
        <Button href="" /*修改内容的跳转*/>修改</Button>
      </div>
    </div>
  );
}
