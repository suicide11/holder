import React, { Component } from 'react';
import Holder from '../component/molecule/holder'
import {PlusOutlined} from '@ant-design/icons';
import './home.css'
import {GetHolderAPI} from '../service/holder'
class Home extends Component {
    state={
        data:[]
    }
    componentDidMount() {
        this.props.handleLoader(true)
        GetHolderAPI(this.props.token).then((response)=>{
            this.setState({
                data:response.data.holder
            })
            this.props.handleLoader(false)
        })
    }
    updateHolder = (token)=>{
        this.props.handleLoader(true)
        GetHolderAPI(this.props.token).then((response)=>{
            this.setState({
                data:response.data.holder
            })
            this.props.handleLoader(false)
        })
    }
    render() {
        return (
            <div style={{height:"100%"}}>
                <div className="home-body" style={{ width: "100%" }} >
                    {this.state.data.length>0 ? (
                        this.state.data.map(val=>
                            <Holder handleLoader={this.props.handleLoader} updateHolder={this.updateHolder} data={val} token={this.props.token}/>
                            )
                    ):(
                        <b> No Holders yet </b>
                    ) }
                </div>
                <div className="home-footer">
                    <button onClick={()=>this.props.addHolder(true)}>
                        <PlusOutlined></PlusOutlined>
                    </button>
                </div>
            </div>
        )
    }
}

export default Home