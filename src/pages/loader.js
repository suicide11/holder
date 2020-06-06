import React from 'react'
import { Spin } from 'antd'
function Loader() {
    return (
        <div className="loading">
            <Spin tip="Loading...">
            </Spin>
        </div>
    )
}

export default Loader