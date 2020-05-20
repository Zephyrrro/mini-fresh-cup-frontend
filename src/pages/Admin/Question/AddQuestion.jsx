import React from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { deleteQuestion, getQuestion } from '@/api';
import { DeleteOutlined } from '@ant-design/icons';

class QuestionTable extends React.Component {
  GetQuestion() {
    getQuestion().then(res => {
      this.setState({
        dataArray: res.data.data.questions
      });
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      dataArray: []
    };
    this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.GetQuestion();
  }
  handleDelete = id => {
    deleteQuestion({ id: id }).then(
      this.GetQuestion()
    );
  };

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        sorter: (a, b) => a.id - b.id,
        defaultSortOrder: 'ascend',
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
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (text, record) => {
          return (<Space>
            <Popconfirm
              title="确定删除吗?"
              onConfirm={() => this.handleDelete(record.id)}
            >
              <Button icon={<DeleteOutlined/>}>删除</Button>
            </Popconfirm>
          </Space>);
        }
      }
    ];
    return (
      <Table bordered columns={columns} dataSource={this.state.dataArray}/>
    );
  }
}

export default function AddQuesion() {
  return (
    <div className="QuestionTable">
      <QuestionTable/>
    </div>
  );
}
