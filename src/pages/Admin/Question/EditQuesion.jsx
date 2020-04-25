import React from 'react';
import { Button, Input } from 'antd';
import { addQuestion } from '@/api/index';

class QuestionEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
    this.inputChange=this.inputChange.bind(this);
    this.Finish=this.Finish.bind(this);
  }
  inputChange(e){
    if(e.target.name==="title")
    {
      this.setState({
        title:e.target.value
      })
      console.log(this.state.title);
    }else{
      this.setState({
        content:e.target.value
      })
      console.log(this.state.content);
    }
  }
  Finish(){
    console.log("Finish");
    addQuestion(this.state).then(r => {
      console.log(r);
    });
  }
  render() {
    return (
      <div className="question-editor">
        <div>
          <label>题目：</label>
          <Input.TextArea name="title" onChange={this.inputChange}/>
        </div>
        <div>
          <label>答案：</label>
          <Input.TextArea name="content" onChange={this.inputChange}/>
        </div>
        <Button onClick={this.Finish}>
          <span>确定</span>
        </Button>
      </div>
    );
  }
}

export default function EditQuestion() {
  return <QuestionEditor/>;
}
