import React from 'react';
import {
  connect
} from 'dva';
import {
  Spin,
  Icon,
  message,
  Form,
  Input,
  Button
} from 'antd';
import styles from './login.less';
const FormItem = Form.Item;

/*登陆*/
const Login = React.createClass({
  getInitialState() {
    return {
      error: false,
      loading: false
    }
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      /*请求登录*/
      this.props.dispatch({
        type: 'LoginUser/Userlogin',
        payload: {
          ...values,
        }
      })
    });
  },

  render() {
    const {
      loading
    } = this.props.LoginUser
    const formItemLayout = {
      labelCol: {
        span: 8
      },
      // wrapperCol: {
      //   span: 20
      // },
    };
    const {
      getFieldDecorator
    } = this.props.form;
    return (
      <div className ={styles.loginCaioner}>
      <Spin spinning={loading} >
        <Form onSubmit={this.handleSubmit} className={styles.loginFrom}>
         <h1 className={styles.loginword}>【守卫者】后台系统</h1> 
        <FormItem {...formItemLayout} hasFeedback>
          {getFieldDecorator('user_name', {
            rules: [{ required: true, message: '用户名不能为空!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="请输入用户名" autoComplete="off" />
          )}
        </FormItem>
        <FormItem  {...formItemLayout} hasFeedback>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码不能为空!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="请输入密码" autoComplete="off"/>
          )}
        </FormItem>
        <FormItem>
           <Button type="primary" loading={loading} htmlType="submit" className="login-form-button">
            登录
           </Button>
        </FormItem>
      </Form>
      </Spin>
     </div>
    )
  }
})


function mapStateToProps(ManageDetai) {
  return {
    ...ManageDetai,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const LoginUser = Form.create()(Login)
  /*建立数据关联关系*/
export default connect(mapStateToProps, mapDispatchToProps)(LoginUser);