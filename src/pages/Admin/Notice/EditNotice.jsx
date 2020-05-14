import React from 'react';
import { Row, Col, Input, Button, message, Popconfirm, Table, Space, Form } from 'antd';
import { DeleteOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { addNotice, getNotice, deleteNotice } from '@/api/index';
import './EditNotice.less';


class NoticeTable extends React.Component {
  formRef = React.createRef();
  EditableCell = ({
                    editing,
                    dataIndex,
                    title,
                    inputType,
                    record,
                    index,
                    children,
                    ...restProps
                  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form ref={this.formRef.current}>
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0
              }}
            >
              <Input/>
            </Form.Item>
          </Form>
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
      editable: -1,
      editableId: -1
    };
    this.handleDelete.bind(this);
  }

  handleDelete = id => {
    deleteNotice({ id: id }).then(
      this.props.handleUpdate()
    );
  };

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        align: 'center'
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
        render: (text, record) => {
          const editable = this.state.editable === record.id;
          return editable ? (
            <Space>
              <Button icon={<SaveOutlined/>} onClick={() => {
              }}>保存</Button>
              <Button icon={<CloseOutlined/>} onClick={() => {
                this.setState({ editable: -1, editableId: -1 });
              }}>取消</Button>
            </Space>
          ) : (<Space>
            <Button disabled={this.state.editableId !== -1 && this.state.editableId !== record.id}
                    icon={<EditOutlined/>} onClick={() => {
              this.setState({
                editable: record.id,
                editableId: record.id
              });
              this.formRef.current.setFieldsValue({
                title: record.title,
                content: record.content
              });
            }}>编辑</Button>
            <Popconfirm
              title="确定删除吗?"
              onConfirm={() => this.handleDelete(record.id)}
            >
              <Button disabled={this.state.editableId !== -1 && this.state.editableId !== record.id}
                      icon={<DeleteOutlined/>}>删除</Button>
            </Popconfirm>
          </Space>);
        }
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
          editing: this.state.editable === record.id
        })
      };
    });
    return (
      <Table components={{
        body: {
          cell: this.EditableCell
        }
      }}
             bordered columns={mergedColumns} dataSource={this.props.dataArray}/>
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
    if (e.target.name === 'title') {
      this.setState({
        title: e.target.value
      });
    } else {
      this.setState({
        content: e.target.value
      });
    }
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
    this.GetNotice();
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
