import React from 'react';
import { Row, Col, Input, Button, message, Popconfirm, Table, Space } from 'antd';
import { DeleteOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { addNotice, getNotice, deleteNotice, editNotice } from '@/api/index';
import './EditNotice.less';


class NoticeTable extends React.Component {
  EditableCell = ({
                    editing,
                    dataIndex,
                    children,
                    ...restProps
                  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Input style={{
            margin: 0
          }}
                 value={dataIndex === 'title' ? this.state.editTitle : this.state.editContent}
                 onChange={e => {
                   e.persist();
                   if (dataIndex === 'title') {
                     this.setState({ editTitle: e.target.value });
                   } else {
                     this.setState({ editContent: e.target.value });
                   }
                 }}
          />
        ) : (
          children
        )}
      </td>
    );
  };

  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      editable: -1,//-1为初始状态
      editableId: -1,//-1为初始状态
      editTitle: '',
      editContent: ''
    };
    this.handleDelete.bind(this);
    //this.handleSave.bind(this);
  }

  handleDelete = id => {
    deleteNotice({ id: id }).then(
      this.props.handleUpdate()
    );
  };

  handleSave = (record, e) => (
    editNotice({
      id: record.id,
      title: this.state.editTitle,
      content: this.state.editContent
    }).then(res => {
      console.log(res);
      this.setState({
        editable: -1,
        editableId: -1
      });
      this.props.handleUpdate();
    }));

  ActionButton(record) {
    const { editableId } = this.state;
    const editable = this.state.editable === record.id;
    return editable ? (
      <Space>
        <Button icon={<SaveOutlined/>} onClick={(e) => this.handleSave(record, e)}>保存</Button>
        <Button icon={<CloseOutlined/>} onClick={() => {
          this.setState({ editable: -1, editableId: -1 });
        }}>取消</Button>
      </Space>
    ) : (<Space>
      <Button disabled={this.state.editableId !== -1 && this.state.editableId !== record.id}
              icon={<EditOutlined/>} onClick={() => {
        this.setState({
          editable: record.id,
          editableId: record.id,
          editTitle: record.title,
          editContent: record.content
        });
      }}>编辑</Button>
      <Popconfirm
        title="确定删除吗?"
        onConfirm={() => this.handleDelete(record.id)}
      >
        <Button disabled={editableId !== -1 && editableId !== record.id}
                icon={<DeleteOutlined/>}>删除</Button>
      </Popconfirm>
    </Space>);
  }

  render() {
    const { editable } = this.state;
    const { dataArray } = this.props;
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        sorter: (a, b) => a.id - b.id,
        defaultSortOrder: 'ascend'
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        editable: true
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        editable: true
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (text, record) => this.ActionButton(text, record)
      }
    ];
    const mergedColumns = columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: editable === record.id
        })
      };
    });
    return (
      <Table components={{
        body: {
          cell: this.EditableCell
        }
      }}
             bordered columns={mergedColumns} dataSource={dataArray}/>
    );
  }
}

class NoticeAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    };
    this.inputChange = this.inputChange.bind(this);
    this.Finish = this.Finish.bind(this);
  }

  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  Finish() {
    addNotice(this.state).then(r => {
      console.log(r);
      message.success('公告发布成功！');
      this.props.handleFinish();
    });
  }

  render() {
    return (
      <div>
        <div>
          标题：
          <Input.TextArea rows={4} name="title" onChange={this.inputChange}/>
        </div>
        <div>
          内容：
          <Input.TextArea rows={4} name="content" onChange={this.inputChange}/>
        </div>
        <Button onClick={this.Finish}>
          发布公告
        </Button>
      </div>
    );
  }
}

class NoticeEditor extends React.Component {
  GetNotice() {
    getNotice().then(res => {
      this.setState({
        dataArray: res.data.data.notices
      });
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      dataArray: []
    };
  }

  componentDidMount() {
    getNotice().then(res => {
      this.setState({
        dataArray: res.data.data.notices
      });
    });
  }

  render() {
    return (
      <>
        <Row>
          <Col span={15}>
            <NoticeTable dataArray={this.state.dataArray} handleUpdate={this.GetNotice.bind(this)}/>
          </Col>
          <Col span={1}/>
          <Col span={8}>
            <NoticeAdd handleFinish={this.GetNotice.bind(this)}/>
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
