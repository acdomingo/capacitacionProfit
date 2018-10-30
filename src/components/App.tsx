import React from 'react';
import { Divider, Segment, Container, Button, Form } from 'semantic-ui-react';
import { string, number } from 'prop-types';

export class App extends React.Component<{}, IState> {

    public constructor (props: {}) {
        super(props);
        this.state = {
            currentTask: '',
            tasks: []
        }
    }

    public handleSubmit(e: React.FormEvent<HTMLElement>) :void {
        e.preventDefault();
        this.setState({
            currentTask: '',
            tasks: [
                ...this.state.tasks,
                this.state.currentTask
            ]
        })
    }

    public renderTasks():JSX.Element[] {
        return (
            this.state.tasks.map((task:string, index:number) => {
                return (
                    <div key={index}> {task}
                        <Divider fitted />
                    </div>
                )
            })
        )
    }

     public render():JSX.Element {
        console.log(this.state);
        return (
            <div>
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
                                    <Button toggle type='submit' color='pink' size='tiny'>Add task</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Container>
                </Segment>
                <Container>
                    <Segment raised>
                        <section>
                            { this.renderTasks() }
                        </section>
                    </Segment>
                </Container>
            </div>
        )
    }
}

interface IState {
    currentTask: string,
    tasks : Array<string>
}