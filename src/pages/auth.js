import React,{Component} from 'react' 
import { Card } from 'antd';
import Register from '../component/molecule/register'
import Login from '../component/molecule/login'
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
  login: <div><Login/></div>,
  register: <Register/>,

};


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