import React from 'react';
import { Row, Col } from 'antd';
import { Table } from 'antd';
import { getNotice } from '@/api/index';
import './EditNotice.less';

class NoticeTable extends React.Component {
  GetNotice(){
    getNotice().then(res => {
      this.setState({
        dataArray: res.data.data.notices,
      });
    });
  }
  constructor(props) {
    super(props);
    this.state={
      dataArray: [],
    };
    this.GetNotice();
  }
  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
      },
    ];
    return (
      <Table columns={columns} dataSource={this.state.dataArray} />
    );
  }
}

class NoticeAdd extends React.Component {
  render() {

    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content'
      }
    ];
    return (
      <Table columns={columns}/>
    );
  }
}

class NoticeEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Row>
          <Col span={11}>
            <NoticeTable />
          </Col>
          <Col span={1} />
          <Col span={12}>

          </Col>
        </Row>
      </>
    );
  }
}

export default function EditNotice() {
  return (
    <div className="NoticeEditor">
      <NoticeEditor/>
    </div>
  );
}
