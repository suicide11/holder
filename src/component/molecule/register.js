/*global chrome*/
import React,{Component} from 'react' 
import { Form, Input, Button, Checkbox } from 'antd';
import {RegisterAPI} from '../../service/auth' 
class Register extends Component {
    onFinish = async values => {
        console.log('Success:', values);
        RegisterAPI(values).then((response)=>{
            console.log(response)
            chrome.storage.sync.set({'token': response.data.token}, function() {
                console.log('Settings saved');
            });
            this.props.handleToken(response.data.token)
        })
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    render() {
        return(
            <div style={{textAlign:"center"}} >
                <Form
                    // {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onValuesChange={this.onChange}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        // label="Title"
                        name="name"
                        rules={[{ required: true, message: 'Please enter name' }]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>

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

export default Register