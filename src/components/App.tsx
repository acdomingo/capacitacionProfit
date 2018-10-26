import React from 'react';

export class App extends React.Component <IProps, {}> {
    render() {
        return <h1>{this.props.name} no te ortivé</h1>;
    }
}

interface IProps {
    name: string;
}