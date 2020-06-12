import React from 'react';
import { Layout, List, Space, Button, Input, Divider, Tag, Row, Col, message, Result } from 'antd';
import { QuestionCircleOutlined, MessageOutlined, SmileOutlined } from '@ant-design/icons';
import { getQuestion, getQuestionAnswer, answerQuestion, getNotice } from '@/api';
import { deleteCookie, getCookie } from '@/pages/Answer/cookie';
import './index.less';

const { Content, Sider } = Layout;

class NoticeForm extends React.Component {
  noticeTimer() {
    getNotice().then(res => {
      this.setState({ NoticeArray: res.data.data.notices.reverse() });
    });
  }

  componentDidMount() {
    this.noticeTimer();
    this.timerID = setInterval(
      () => this.noticeTimer(),
      2000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  constructor(props) {
    super(props);
    this.state = { NoticeArray: [] };
  }

  render() {
    return (
      <div>
        <Divider orientation="left">公告区</Divider>
        <List
          className="notice-form"
          bordered
          itemLayout="horizontal"
          /* eslint-disable-next-line react/destructuring-assignment */
          dataSource={this.state.NoticeArray}
          renderItem={item => (
            <List.Item>
              <Space>
                <MessageOutlined style={{ fontSize: '20px' }}/>
                <List.Item.Meta
                  title={item.id + ':' + item.title}
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
      <div className="question-list">
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
  Tag() {
    const {StatusCode}=this.props;
    var Color,Message;
    switch (StatusCode) {
      case -1:
        Color="default";
        Message="未答";
        break;
      case 0:
        Color="success";
        Message="已提交";
        break;
      case 1:
        Color="warning";
        Message="未提交";
        break;
    }
    return (<Tag className="answer-tag" color={Color}>
      {Message}
    </Tag>);
  }

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.id === -1) {
      return (
        <Result
          icon={<SmileOutlined />}
          title="现在开始愉快地答题吧!"
          subTitle="温馨提示：请关注右侧的公告栏以便及时获取信息"
          extra={[]}
        />
      );
    }
    return (
      <div className="answer-form">
        <Divider orientation="left">题目{+this.props.id}</Divider>
        <p>{this.props.question}</p>
        <Input.TextArea
          className="answer-input"
          value={this.props.content} onChange={e => this.props.handleChange(e.target.value)}/>
        <Button onClick={e => this.props.handleSave()}>提交</Button>
        {this.Tag()}
      </div>
    );
  }
}

class AnswerPage extends React.Component {
  handleSave() {
    answerQuestion({ questionId: this.state.AnswerId, content: this.state.Answer }).then(res => {
      if (res.data.success === true) {
        message.success('提交成功！');
        this.setState({ StatusCode: 0 });
        deleteCookie('id' + this.state.AnswerId);
        console.log(document.cookie);
      } else
        message.error('出现错误！错误码' + res.data.statusCode);
    });
  }

  handleChange = (value) => {
    this.setState({ Answer: value });
    this.setState({ StatusCode: 1 });
    document.cookie = 'id' + this.state.AnswerId + '=' + encodeURIComponent(value) + ';SameSite=Strict';
    console.log(document.cookie);
  };

  GetAnswer(id) {
    const cookie = getCookie('id' + id);
    var answer = '';
    getQuestionAnswer().then(res => {
      //console.log(res.data.data.answer)
      res.data.data.answer.map(obj => {
        if (obj.question.id === id) {
          answer = obj.content;
        }
      });
      message.info(`cookie:${cookie} answer:${answer}`);
      if (cookie === '' && answer === '') {
        message.info('还没开始做');
        this.setState({ Answer: answer, StatusCode: -1 });
        return;
      }
      if (cookie === '' && answer != '') {
        message.info('服务器有答案');
        this.setState({ Answer: answer, StatusCode: 0 });
        return;
      }
      if (cookie === answer) {
        message.success('cookie和服务器答案一致');
        this.setState({ Answer: answer, StatusCode: 0 });
        return;
      } else {
        message.info('cookie和服务器答案不一致');
        this.setState({ Answer: cookie, StatusCode: 1 });
      }
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
    this.state = { QuestionArray: [], AnswerId: -1, Question: '', Answer: '', StatusCode: -1 };
  }

  render() {
    return (
      <Layout>
        <Sider className="answer-sider">
          <QuestionList QuestionArray={this.state.QuestionArray} SetId={this.SetAnswerId.bind(this)}/>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content>
            <Row>
              <Col span={15}>
                <AnswerForm id={this.state.AnswerId} question={this.state.Question} content={this.state.Answer}
                            StatusCode={this.state.StatusCode}
                            handleChange={this.handleChange.bind(this)}
                            handleSave={this.handleSave.bind(this)}
                />
              </Col>
              <Col span={1}/>
              <Col span={8}>
                <NoticeForm/>
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
    <div>
      <AnswerPage/>
    </div>
  );
}
