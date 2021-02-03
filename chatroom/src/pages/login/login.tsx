import React, { Component } from 'react'
import { Input , Button} from 'antd';
import './login.less'

export default class login extends Component {
    render() {
        return (
            <main className='wrap'>
                <div className='login'>
                    <h1>ChatRoom</h1>
                    <Input className='input' placeholder="Name" />
                    <Button>Enter</Button>
                </div>
            </main>
        )
    }
}
