import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import './addholder.css'
import {AddHolderAPI} from "../service/holder";
const Cryptr = require('cryptr');
class AddHolder extends Component {
    state = {
        encrypt : false
    }
    onFinish = async values => {
        console.log('Success:', values);
        if(values.encrypt == true) {
            const cryptr = new Cryptr(values.key);
            let data = await cryptr.encrypt(values.body)
            values.body = data
            // alert(this.props.token)
            AddHolderAPI(values, this.props.token).then((response)=>{
                console.log(response)
                this.props.addHolder(false)
            })
        }
        else {
            AddHolderAPI(values, this.props.token).then((response)=>{
                console.log(response)
                this.props.addHolder(false)
            })
        }
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    onChange = data =>{
        if(data.encrypt == true) {
            this.setState({
                encrypt : true
            })
        }
        if(data.encrypt == false) {
            this.setState({
                encrypt : false
            })
        }
    }
    render() {
        return (
            <div className="addholderBody">
                <h6 style={{fontSize:"16px"}}>Add holder</h6>
                <hr/>
                <Form
                    // {...layout}
                    name="basic"
                    initialValues={{ encrypt:false }}
                    onFinish={this.onFinish}
                    onValuesChange={this.onChange}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        // label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter the title' }]}
                    >
                        <Input placeholder="Title" />
                    </Form.Item>

                    <Form.Item
                        // label="Body"
                        name="body"
                        rules={[{ required: true, message: 'Please enter body' }]}
                    >
                        <Input placeholder="Body" />
                    </Form.Item>
                    <b style={{fontSize:"10px", color:"red"}}>
                        For sensitive data we recommend you to save data in encrypted format.
                    </b>
                    <Form.Item  name="encrypt" valuePropName="checked">
                        <Checkbox>Encrypt</Checkbox>
                    </Form.Item>
                    {this.state.encrypt && <Form.Item
                        // label="key"
                        name="key"
                        rules={[{ required: true, message: 'Please enter body' }]}
                    >
                        <Input placeholder="Encryption Key" />
                    </Form.Item>}
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        &nbsp;
                        <Button onClick={()=>this.props.addHolder(false)} type="primary" >
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default AddHolder