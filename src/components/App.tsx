import React from 'react';
import { Divider, Segment, Container, Button, Form } from 'semantic-ui-react';

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
                {
                    id: this._timeInMilliseconds(),
                    value: this.state.currentTask,
                    completed: false
                }
            ]
        })
    }

    public deleteTask(id:number):void {
        const filteredTasks: Array<ITask> = this.state.tasks.filter((task: ITask) => task.id !== id);
        this.setState ({
            tasks: filteredTasks
        })
    }

    public toggleCompleted(i:number){
        let task: ITask[] = this.state.tasks.splice(i, 1);
        task[0].completed = !task[0].completed;
        const tasks:ITask[] = [...this.state.tasks, ...task];
        this.setState({tasks}) 
    }

    public renderTasks():JSX.Element[] {
        return (
            this.state.tasks.map((task:ITask, index:number) => {
                return (
                    <div key={task.id}>
                    <span> {task.value} </span>
                    <Button compact circular toggle size='tiny' color='violet' onClick={() => this.deleteTask(task.id) }>Delete</Button>
                    <Button compact circular toggle size='tiny' color='blue' onClick={() => this.toggleCompleted(index) }>Done</Button>
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

    private _timeInMilliseconds():number {
        const date:Date = new Date();
        return date.getTime()
    }
}

interface IState {
    currentTask: string,
    tasks : Array<ITask>
}

interface ITask {
    id: number,
    value: string,
    completed: boolean
}