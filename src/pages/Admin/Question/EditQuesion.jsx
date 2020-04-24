import React from 'react';
import { Table } from 'antd';
const { Column } = Table;

function GetData(){
  return [
    {
      title:'1',
      content:'2'
    }
  ];
}

export default function EditQuestion() {
  return   <Table dataSource={GetData}>
    <Column title="题目描述" dataIndex="title" key="title" />
    <Column title="答案" dataIndex="content" key="content" />
    <Column
      title="Action"
      key="action"
      render={(text, record) => (
        <span>
          <a style={{ marginRight: 16 }}>上升</a>
          <a style={{ marginRight: 16 }}>下降</a>
          <a>删除</a>
        </span>
      )}
    />
  </Table>;
}
