import React from 'react';
import { Layout, List, Space, Button, Input, Divider,Tag,Row,Col,message } from 'antd';
import { QuestionCircleOutlined,MessageOutlined,CheckOutlined } from '@ant-design/icons';
import { getQuestion, getQuestionAnswer, answerQuestion,getNotice } from '@/api';
import {getCookie} from '@/pages/Answer/cookie';

const { Content, Sider } = Layout;

class NoticeForm extends React.Component{
  noticeTimer(){
    getNotice().then(res=>{
      this.setState({NoticeArray:res.data.data.notices.reverse()});
    })
  }
  componentDidMount() {
    this.noticeTimer();
    this.timerID = setInterval(
      () => this.noticeTimer(),
      2000
    );
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }
  constructor(props) {
    super(props);
    this.state={NoticeArray:[]}
  }

  render() {
    return (
      <div>
        <List
          bordered
          itemLayout="horizontal"
          /* eslint-disable-next-line react/destructuring-assignment */
          dataSource={this.state.NoticeArray}
          renderItem={item => (
            <List.Item>
              <Space>
                <MessageOutlined style={{ fontSize: '20px' }}/>
                <List.Item.Meta
                  title={item.id+":"+item.title}
                  description={
                    item.content
                  }
                />
              </Space>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

class QuestionList extends React.Component {
  handleClick = id => {
    this.props.SetId(id);
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { QuestionArray } = this.props;
    return (
      <div className="Question">
        <List
          bordered
          itemLayout="horizontal"
          /* eslint-disable-next-line react/destructuring-assignment */
          dataSource={QuestionArray}
          renderItem={item => (
            <List.Item>
              <Space>
                <QuestionCircleOutlined style={{ fontSize: '20px' }}/>
                <List.Item.Meta
                  title={<Button type="link" onClick={e => this.handleClick(item.id, e)}>题目{item.id}</Button>}
                  description={
                    item.question.length > 15
                      ? `${item.question.slice(0, 15)}...`
                      : item.question
                  }
                />
              </Space>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="AnswerForm">
        <Divider orientation="left">题目{+this.props.id}</Divider>
        <p>{this.props.question}</p>
        <Input.TextArea value={this.props.content} onChange={e => this.props.handleChange(e.target.value)}/>
        <Button icon={<CheckOutlined />} onClick={e =>this.props.handleSave()}>提交</Button>
      </div>
    );
  }
}

class AnswerPage extends React.Component {
  handleSave(){
    answerQuestion({ questionId: this.state.AnswerId, content: this.state.Answer }).then(res=>{
      if(res.data.success===true){
        message.success("提交成功！")
      }else
        message.error("出现错误！错误码"+res.data.statusCode);
    })
  }
  handleChange = (value) => {
    this.setState({Answer:value});
    document.cookie="id"+this.state.AnswerId+"="+value+";SameSite=Strict";
    console.log(document.cookie);
  };

  GetAnswer(id) {
    const cookie = getCookie('id' + id);
    if(cookie!='')
      this.setState({ Answer: cookie });
    else
    getQuestionAnswer().then(res => {
      res.data.data.answer.map(obj => {
        if (obj.question.id === id) {
          this.setState({ Answer: obj.content });
        }
      });
    });
  }

  SetAnswerId(id) {
    const { QuestionArray } = this.state;
    QuestionArray.map(que => {
      if (que.id === id) {
        this.setState({ AnswerId: id, Question: que.question });
        //在这里运用cookie获取本地信息
        this.GetAnswer(id);
      }
    });
  }

  QuestionInit() {
    const Array = [];
    getQuestion().then(res => {
      res.data.data.questions.map(que => {
        Array.push({ id: que.id, question: que.title, answer: '' });
      });
      this.setState({ QuestionArray: Array });
    });
  }

  componentDidMount() {
    this.QuestionInit();
  }

  constructor(props) {
    super(props);
    this.state = { QuestionArray: [], AnswerId: -1, Question: '', Answer: '' };
  }

  render() {
    return (
      <Layout>
        <Sider style={{ margin: '0 20px 0' }}>
          <QuestionList QuestionArray={this.state.QuestionArray} SetId={this.SetAnswerId.bind(this)}/>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content>
            <Row>
              <Col span={15}>
                <AnswerForm id={this.state.AnswerId} question={this.state.Question} content={this.state.Answer}
                            handleChange={this.handleChange.bind(this)}
                            handleSave={this.handleSave.bind(this)}
                />
              </Col>
              <Col span={1} />
              <Col span={8}>
                <NoticeForm />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default function Answer() {
  return (
    <div className="answer">
      <AnswerPage/>
    </div>
  );
}
