import React, { Component } from 'react';
import './holder.css'
import { Input, Button } from 'antd';
import {DeleteHolderAPI} from '../../service/holder'
import { DeleteFilled  } from '@ant-design/icons';
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
        this.props.handleLoader(true)
        const cryptr = new Cryptr(this.state.secret);
        let data = await cryptr.decrypt(this.props.data.body)
        if(data) {
            this.setState({
                unlocked:data
            })
            this.props.handleLoader(false)
        }
        else{
            this.setState({
                error:"bad key"
            })
        }
    }
    handleDelete =() =>{
        this.props.handleLoader(true)
        DeleteHolderAPI(this.props.data._id,this.props.token).then(function(response){
            this.props.updateHolder(this.props.token)
            this.props.handleLoader(false)
        }.bind(this))
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
                    <br></br>
                    {(this.state.unlocked || !this.props.data.encrypt ) && 
                    <DeleteFilled onClick={()=>this.handleDelete()} style={{color:"red", cursor:"pointer"}} />}
                </center>
                <div className="footer-holder">
                    {this.props.data.createdAt}
                </div>
            </div>
        )
    }
}

export default Holder