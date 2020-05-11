import React from 'react';
import { Button, Input} from 'antd';
import { addQuestion } from '@/api/index';
import { Excel } from '@/pages/Admin/Question/UploadXlsx';
import './QustionEditor.less';

class QuestionEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
    this.inputChange = this.inputChange.bind(this);
    this.Finish = this.Finish.bind(this);
  }

  inputChange(e) {
    if (e.target.name === 'title') {
      this.setState({
        title: e.target.value,
      });
    } else {
      this.setState({
        content: e.target.value,
      });
    }
  }

  Finish() {
    console.log('Finish');
    addQuestion(this.state).then(r => {
      console.log(r);
    });
  }

  render() {
    return (
      <div className="question-editor">
        <div>
          <label>题目：</label>
          <Input.TextArea rows={4} name="title" onChange={this.inputChange}/>
        </div>
        <div>
          <label>答案：</label>
          <Input.TextArea rows={4} name="content" onChange={this.inputChange}/>
        </div>
        <Button onClick={this.Finish}>
          <span>添加题目</span>
        </Button>
        <Excel />
      </div>
    );
  }
}

export default function EditQuestion() {
  return <QuestionEditor />;
}
