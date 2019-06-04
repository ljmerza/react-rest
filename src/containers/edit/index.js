import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './index.css';
import request from 'utils';
import { baseApiUrl } from 'utils/const';


export default class Contact extends Component {
    constructor(props) {
        super(props);

        this.defaultFormState = {
            employee_name: '',
            employee_age: '',
            employee_salary: ''
        }
        
        this.state = {
            body: { ...this.defaultFormState },
            success: '',
            error: '',
            id: (props.match && props.match.params && props.match.params.id) || null,
        };

        this.getData = this.getData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormResponse = this.handleFormResponse.bind(this);
    }

    componentDidMount() {
        if(this.state.id !== null){
            this.setState({ loading: true }, this.getData);
        }
    }

    getData() {
        request(`${baseApiUrl}/employee/${this.state.id}`)
            .then(body => this.setState({ body, loading: false }))
            .catch(error => this.setState({ error, loading: false }));
    }

    handleChange(event) {
        event.preventDefault();
        const { id, value } = event.target;
        
        const body = { ...this.state.body, [id]: value };
        this.setState({ body });
    }

    handleSubmit(event) {
        event.preventDefault();
        const urlPath = this.state.id ? `update/${this.state.id}` : 'create';
        const method = this.state.id ? `PUT` : 'POST';

        const postBody = Object.keys(this.state.body).reduce((acc, curr) => {
            acc[ curr.split('_')[1] ] = this.state.body[curr];
            return acc;
        }, {});

        request(`${baseApiUrl}/${urlPath}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postBody)
        })
            .then(response => {
                this.handleFormResponse({ success: 'Saved!' });
            })
            .catch(error => {
                this.handleFormResponse({ error: 'Error!' });
            });
    }

    handleFormResponse({ error = '', success = '' }) {
        this.setState({ success, error, body: { ...this.defaultFormState } });
    }

    render(){
        return (
            <header className="App-header">
                {this.state.success ? <Alert variant='success'>{this.state.success}</Alert> : null}
                {this.state.error ? <Alert variant='danger'>{this.state.error}</Alert> : null}

                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="employee_name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' value={this.state.body.employee_name} onChange={this.handleChange}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="employee_age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type='text' value={this.state.body.employee_age} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="employee_salary">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type='text' value={this.state.body.employee_salary} onChange={this.handleChange}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </header>
        )
    }
}
