/*global chrome*/
import React,{Component} from 'react' 
import { Form, Input, Button, Checkbox } from 'antd';
import {LoginAPI} from '../../service/auth'
class Login extends Component {
    state ={
        token:"hello"
    }
    onFinish = async values => {
        console.log('Success:', values);
        await LoginAPI(values).then((response)=>{
            console.log(response)
            alert(response)
            chrome.storage.sync.set({'token': response.data.token}, function() {
                console.log('Settings saved');
            });
        })
        chrome.storage.sync.get(['token'], function(items) {
            this.setState({
                token:items.token
            })
          }.bind(this));
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    render() {
        return(
            <div style={{textAlign:"center"}} >
                <b>{this.state.token}</b>
                <Form
                    // {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onValuesChange={this.onChange}
                    onFinishFailed={this.onFinishFailed}
                >
                    

                    <Form.Item
                        // label="Body"
                        name="email"
                        rules={[{ required: true, type:"email", message: 'Please enter emai;l' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        // label="Title"
                        name="password"
                        rules={[{ required: true, message: 'Please enter password' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>                
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Login