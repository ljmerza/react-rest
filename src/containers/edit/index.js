import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './index.css';
import request from '../../utils/request';
import { baseApiUrl } from '../../utils/const';


export default class Contact extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            body: {},
            success: '',
            error: '',
            id: (props.match && props.match.params && props.match.params.id) || null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
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
        this.setState({ body: { ...this.state.body, [id]: value} });
    }

    handleSubmit(event) {
        event.preventDefault();
        const urlPath = this.state.id ? `update/${this.state.id}` : 'create';
        const method = this.state.id ? `PUT` : 'POST';

        request(`${baseApiUrl}/${urlPath}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.body)
        })
        .then(response => {
            this.handleFormResponse({ success: 'Saved!' });
            !this.state.id && this.resetForm();
        })
        .catch(error => {
            this.handleFormResponse({ error: 'Error!' });
        });
    }

    resetForm() {
        this.setState({ body: {} });
    }

    handleFormResponse({ error = '', success = '' }) {
        this.setState({ success, error, body: {} });
    }

    render(){
        return (
            <header className="App-header">
                {this.state.success ? <Alert variant='success'>{this.state.success}</Alert> : null}
                {this.state.error ? <Alert variant='danger'>{this.state.error}</Alert> : null}

                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={this.state.body.employee_name} onChange={this.handleChange}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control value={this.state.body.employee_age} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="salary">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control value={this.state.body.employee_salary} onChange={this.handleChange}/>
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
