import React from 'react';
import { message} from 'antd';
import { addQuestion } from '@/api/index';
import XLSX from 'xlsx';
import './QustionEditor.less';

export class Excel extends React.Component {
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
        // eslint-disable-next-line
        const task = data.map(question => {
          return new Promise((resolve, reject) => {
            addQuestion(question).then(res => {
            message.success('上传成功！');
              resolve(res)
            }).catch(err => {
              reject(err)
            });
          })
        })
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
          <input className="upload-button" type='file' accept='.xlsx, .xls' onChange={this.onImportExcel}/>
    );
  }
}

