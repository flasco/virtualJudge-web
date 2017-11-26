import React from 'react';
import { Modal, Tabs, message } from 'antd';

import LoginFormWapper from './components/Login';
import RegisterFormWapper from './components/Register';

import { userLoginCheck, userRegisterCheck } from '../../../../services/user';


class LoginWindow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
    };
    this.registerSubmit = this.registerSubmit.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  closeLoginWindow = () => {
    this.props.isLogin || this.props.setUserLoginBoard({
      isloginBoard: false,
    });
  }
  setError = (type) => {
    this.setState({
      isError: type,
    })
  }

  async loginSubmit(values) {
    // console.log(values);
    let flag = await userLoginCheck(values);
    if (flag) {
      this.closeLoginWindow();
      this.props.userLogin(values);
    } else {
      this.setError(true);
      message.error('Login Error.');
    }
  }

  async registerSubmit(values) {
    // console.log(values);
    let flag = await userRegisterCheck(values);
    if (flag) {
      this.closeLoginWindow();
      message.success('Register Success!');
      this.props.userLogin({
        userName:values.userName,
        password:values.password,
      });
      //接下来最好直接登录账号，调用redux的方法，注册完之后直接上号。下面的代码待续吧~
    } else {
      this.setError(true);
      message.error('Register Error, please change your userName');
    }
  }

  render() {
    return (
      <Modal
        width={300}
        visible={this.props.isloginBoard}
        onCancel={this.closeLoginWindow}
        footer={null}>
        <Tabs defaultActiveKey={`${this.props.windowType}`} animated={false} >
          <Tabs.TabPane tab="Login" key="1">
            <LoginFormWapper submit={this.loginSubmit} isError={this.state.isError} setError={this.setError} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Register" key="2">
            <RegisterFormWapper submit={this.registerSubmit} isError={this.state.isError} setError={this.setError} />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default LoginWindow;