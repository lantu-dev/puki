import React from 'react';
import { Table } from 'antd';

const { Column } = Table;
import 'antd/dist/antd.css';

interface content {
  studentId: number;
  name: string;
  result: string;
  isAllowed: boolean;
}

const data: content[] = [
  { studentId: 2019211001, name: '张三', result: '优秀', isAllowed: true },
  { studentId: 2019211002, name: '李四', result: '优秀', isAllowed: false },
  { studentId: 2019211003, name: '王五', result: '优秀', isAllowed: true },
  { studentId: 2019211004, name: '钱六', result: '优秀', isAllowed: true },
  { studentId: 2019211005, name: '赵七', result: '优秀', isAllowed: true },
];

function Judge(res: boolean): string {
  if (res) return '是';
  else return '否';
}

export function Store() {
  return (
    <div>
      <Table dataSource={data} bordered={true}>
        <Column title="学号" dataIndex="studentId" key="studentId" />
        <Column title="名字" dataIndex="name" key="name" />
        <Column title="评议结果" dataIndex="result" key="result" />
        <Column
          title="是否允许"
          key="isAllowed"
          render={(text, record: any) => <span>{Judge(record.isAllowed)}</span>}
        />
      </Table>
    </div>
  );
}
