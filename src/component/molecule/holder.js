import React, { Component } from 'react';
import './holder.css'
import { Input, Button } from 'antd';
const Cryptr = require('cryptr');
class Holder extends Component {
    state={
        secret:"",
        unlocked:false,
        error:false
    }
    handleSecret = e => {
        this.setState({
            secret:e.target.value
        })
    }
    handleSubmit = async e =>{
        const cryptr = new Cryptr(this.state.secret);
        let data = await cryptr.decrypt(this.props.data.body)
        if(data) {
            this.setState({
                unlocked:data
            })
        }
        else{
            this.setState({
                error:"bad key"
            })
        }
    }
    render() {
        return (
            <div className="holder">
                <div className="heading-holder" >
                    {this.props.data.title}
                </div>
                <center>
                    {!this.props.data.encrypt && <div className="body-holder">
                        {this.props.data.body}
                    </div>}
                    {this.state.unlocked && <div className="body-holder">
                        {this.state.unlocked}
                    </div>}
                    {this.props.data.encrypt && !this.state.unlocked && 
                        <>
                        <Input onChange={this.handleSecret} style={{width:"60%"}} placeholder="Enter the secret" />
                        <Button onClick={this.handleSubmit} type="primary">submit</Button>
                        <br/>
                        </>
                    }
                    {
                        this.state.error && <b style={{color:"red"}}>{this.state.error}</b>
                    }
                </center>
                <div className="footer-holder">
                    {this.props.data.createdAt}
                </div>
            </div>
        )
    }
}

export default Holder