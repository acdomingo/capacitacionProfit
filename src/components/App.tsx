import React from 'react';
import { Divider, Segment, Container, Button, Form } from 'semantic-ui-react';

export class App extends React.Component<{}, IState> {

    constructor (props: {}) {
        super(props);
        this.state = {
            currentTask: '',
            tasks: []
        }
    }

    handleSubmit(e: any) {
        e.preventDefault();
        this.setState({
            currentTask: '',
            tasks: [
                ...this.state.tasks,
                this.state.currentTask
            ]
        })
    }

    render() {
        console.log(this.state);
        return (
            <div className="wrapper">
                <Segment>
                    <div> <h1>React Typescript Todo List</h1> </div>
                    <Divider section />
                    <Container>
                        <Form onSubmit = {(e) => this.handleSubmit(e)} >
                            <Form.Group inline>
                                <div className="formulario">
                                    <Form.Input width={8}>
                                    <input  placeholder='New task'
                                            value= { this.state.currentTask }
                                            onChange={ (e) => this.setState({ currentTask: e.target.value })} />
                                    </Form.Input>
                                    <Button type='submit' color='pink' size='tiny'>Add task</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Container>
                </Segment>
            </div>
        )
    }
}

interface IState {
    currentTask: string,
    tasks : Array<string>
}