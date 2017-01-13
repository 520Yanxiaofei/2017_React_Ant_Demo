import React from 'react';
import {
  connect
} from 'dva';
import QueueAnim from 'rc-queue-anim';
import styles from './Index.less';
import Menu from '../components/menu/menu';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import cookie from 'react-cookie';

const IndexMain = React.createClass({
  /*全局钩子cookie是否登录*/
  componentWillReceiveProps() {
    this.props.dispatch({
      type: 'LoginUser/UserIf',
    })
  },
  render() {
    const HeaderData = {
      cookieuser: cookie.load('userdata'),
      logoutchange: () => {
        this.props.dispatch({
          type: 'LoginUser/Userout',
        })
      }
    }
    return (
      <QueueAnim className={styles.heightauto} component="div">
            <QueueAnim type="left"><Menu key="2" localtion={this.props.location.pathname}/></QueueAnim>
            <QueueAnim type="top">
               <div key="1" className={styles.headerTop}>
                 <Header {...HeaderData}/>
               </div>
            </QueueAnim>
            <QueueAnim type="bottom" key="3" className={styles.container} component="div">
               {this.props.children}
               <div className={styles.containerClear}></div>
            </QueueAnim>      
      </QueueAnim>
    )
  }
});

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

/*建立数据关联关系*/
export default connect(mapStateToProps, mapDispatchToProps)(IndexMain);