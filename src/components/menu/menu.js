import React, {
  PropTypes
} from 'react';
import {
  Link
} from 'react-router';
import {
  Menu,
  Icon,
  Switch,
  BackTop
} from 'antd';
import styles from './menu.less';

const SubMenu = Menu.SubMenu;

const Menulist = React.createClass({
  getInitialState() {

    return {
      theme: 'dark',
      current: '2',
      collapse: true
    };
  },
  handleClick(e) {

    this.setState({
      current: e.key,
    });
  },
  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    })
  },
  componentDidMount: function() {
    switch (this.props.localtion) {
      case '/situation':
        return this.setState({
          current: '1'
        })
      case '/management':
        return this.setState({
          current: '2'
        });
      case '/alarm':
        return this.setState({
          current: '3'
        })
      case '/system':
        return this.setState({
          current: '4'
        })
    }
  },
  componentWillReceiveProps: function(nextProps) {
    let localPath = nextProps.localtion;
    let localtext = localPath.substring(0, 12)
    if (localtext === '/managedetai') {
      this.setState({
        current: '2'
      });
    }
    //     switch (nextProps.localtion){
    //				case '/situation':return this.setState({current:'1'})
    //				case '/management':return this.setState({current:'2'});
    //				case '/alarm':return this.setState({current:'3'})
    //				case '/system':return this.setState({current:'4'})
    //      }
  },
  render() {
    const collapse = this.state.collapse;

    return (
      <div className={collapse ? styles.menuauto : styles.menuAuto}>
          <div className={styles.headerLogo}>
             <h2>守卫者管理系统</h2>
             <h4>SHOU&nbsp;&nbsp;WEI&nbsp;&nbsp;ZHE</h4>
             <span>L3&nbsp;Beta</span>
          </div>
        <Menu 
          className={styles.menuleft} 
          theme={this.state.theme}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="inline">
             <Menu.Item key="1"><Link to="/situation" ><Icon type="cloud" />安全态势</Link></Menu.Item>
             <Menu.Item key="2"><Link to="/management"><Icon type="scan" />安全管理</Link></Menu.Item>
             <Menu.Item key="3"><Link to="/alarm"><Icon type="folder-open" />安全告警</Link></Menu.Item>
             <Menu.Item key="4"><Link to="/system"><Icon type="pay-circle-o" />系统管理</Link></Menu.Item>
        </Menu>
         {/* <div className="ant-aside-action" onClick={this.onCollapseChange}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>*/}
			 <BackTop />
        </div>
    )
  }
});



Menulist.propTypes = {
  // routes: PropTypes.array.isRequired,
};

export default Menulist;