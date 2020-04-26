import React from 'react';
import { Button, Input, message } from 'antd';
import XLSX from 'xlsx';
import { addQuestion } from '@/api/index';

class Excel extends React.Component {
  onImportExcel = file => {
    // 获取上传的文件对象
    const { files } = file.target;
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.onload = event => {
      try {
        const { result } = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary' });
        // 存储获取到的数据
        let data = [];
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            break;
          }
        }
        // 最终获取到并且格式化后的 json 数据

        //此处为Promise处理多个异步任务
        let task=[];
        for (let i = 0; i < data.length; i++) {
          task.push(new Promise(resolve => {
            addQuestion(data[i]).then(r=>{
              console.log(r);
            });
            resolve("Success");
          }));
        }
        Promise.all(task).then(message.success('成功上传'+data.length+'道题目！'));
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        message.error('文件类型不正确！');
      }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
  };

  render() {
    return (
      <div>
        <Button>
          <input type='file' accept='.xlsx, .xls' onChange={this.onImportExcel}/>
          <span>上传文件</span>
        </Button>
        支持 .xlsx、.xls 格式的文件
      </div>
    );
  }
}

class QuestionEditor extends React.Component {
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
          <Input.TextArea name="title" onChange={this.inputChange}/>
        </div>
        <div>
          <label>答案：</label>
          <Input.TextArea name="content" onChange={this.inputChange}/>
        </div>
        <Button onClick={this.Finish}>
          <span>添加题目</span>
        </Button>
        <Excel/>
      </div>
    );
  }
}

export default function EditQuestion() {
  return <QuestionEditor/>;
}
