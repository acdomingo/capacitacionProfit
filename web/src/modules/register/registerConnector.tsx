import React from 'react';
import {RegisterView} from './ui/RegisterView';


export class RegisterConnector extends React.PureComponent {

    dummySubmit = (values: any) => {
        console.log(values);
    }

    render () {
        return (
            <RegisterView submit={} />
        );
    } 
}