import React from 'react';
import {
  connect
} from 'dva';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox
} from 'antd';
import styles from './login.less';
const FormItem = Form.Item;

const UpDataPass = Form.create()(React.createClass({
  getInitialState() {
    return {
      passwordDirty: false,
    };
  },
  handleSubmit(event) {
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      /*请求修改*/
      this.props.dispatch({
        type: 'LoginUser/PasswordUte',
        payload: {
          change_pwd: values.passwordTwo,
          password: values.password,
        }
      })
    })
  },
  handlePasswordBlur(e) {
    const value = e.target.value;
    console.log(value)
    this.setState({
      passwordDirty: this.state.passwordDirty || !!value
    });
  },
  onChangeOne(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['passwordTwo'], {
        force: true
      });
    }
    callback();
  },
  onChangeTwo(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('passwordOne')) {
      callback('密码不一致!');
    } else {
      callback();
    }
  },

  render: function() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 14
      },
    };
    const {
      getFieldDecorator
    } = this.props.form;
    const {
      UpdateLoading
    } = this.props.LoginUser
    return (
      <div >
      <Form onSubmit={this.handleSubmit} >
        <FormItem {...formItemLayout} label="旧密码" hasFeedback>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入旧密码!' }],
          })(
            <Input type="password" addonBefore={<Icon type="lock" />} placeholder="输入旧密码" autoComplete="off"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="新密码" hasFeedback>
          {getFieldDecorator('passwordOne', {
            rules: [
            { required: true, message: '请输入新密码!' },
             {validator: this.onChangeOne,}
            ],
          })(
            <Input type="password"  onBlur={this.handlePasswordBlur} addonBefore={<Icon type="lock" />} placeholder="输入新密码" autoComplete="off" />
          )}
        </FormItem>
        <FormItem  {...formItemLayout} label="确认密码" hasFeedback>
          {getFieldDecorator('passwordTwo', {
            rules: [
            { required: true, message: '请输入第二次密码!' },
            {validator: this.onChangeTwo,}
            ],
          })(
            <Input type="password" addonBefore={<Icon type="lock" />} type="password" placeholder="输入新密码" autoComplete="off"/>
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 14, offset: 5 }}>
          <Button type="primary" loading={UpdateLoading} htmlType="submit" className="login-form-button">
            确认修改
          </Button>
        </FormItem>
        </Form>
      </div>
    )
  }
}))

function mapStateToProps(LoginUser) {
  return {
    ...LoginUser,
  };
}

/*建立数据关联关系*/
export default connect(mapStateToProps)(UpDataPass);