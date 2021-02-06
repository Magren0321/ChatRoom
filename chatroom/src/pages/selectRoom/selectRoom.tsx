import React, { Component } from 'react'
import { DefaultRootState } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import api from '../../api/index';
import './selectRoom.less'

interface IProps extends RouteComponentProps{
    state: DefaultRootState;
}
export default class selectRoom extends Component<IProps> {

    render() {
        return (
            <main className='selectWrap'>
               <div className='selectRoom'>

               </div>
               <div>

               </div>
            </main>
        )
    }
}
