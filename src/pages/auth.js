import React,{Component} from 'react' 
import { Card } from 'antd';
import Register from '../component/molecule/register'
import Login from '../component/molecule/login'


class Auth extends React.Component {
    state = {
      key: 'login',
      noTitleKey: 'login',
    };
  
    onTabChange = (key, type) => {
      console.log(key, type);
      this.setState({ [type]: key });
    };
  
    render() {
      const tabListNoTitle = [
        {
          key: 'login',
          tab: 'Login',
        },
        {
          key: 'register',
          tab: 'Register',
        },
      ];
      
      const contentListNoTitle = {
        login: <div><Login handleToken={this.props.handleToken} /></div>,
        register: <Register handleToken={this.props.handleToken}/>,
      
      };
      
      return (
        <div>
          <Card
            style={{ width: '100%' }}
            tabList={tabListNoTitle}
            activeTabKey={this.state.noTitleKey}
            onTabChange={key => {
              this.onTabChange(key, 'noTitleKey');
            }}
          >
            {contentListNoTitle[this.state.noTitleKey]}
          </Card>
        </div>
      );
    }
  }

export default Auth