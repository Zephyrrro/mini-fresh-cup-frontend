import React, { Component } from 'react';
import { test } from '@/api/index';

import './index.less';

//  Class Components 的使用
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  //  注意生命周期函数中，async/await 最好只用于 componentDidMount 和 componentDidUpdate
  async componentDidMount() {
    const res = await test();
    this.setState({
      text: res.data,
    });
  }

  render() {
    const { text } = this.state;
    return (
      <div className="home">
        <div className="text">{text}</div>
      </div>
    );
  }
}
