import React, { Component, Fragment } from 'react';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import './index.css';
import request from 'utils/request';
import { baseApiUrl } from 'utils/const';


class Edit extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            post: { ...this.props.post },
            success: '',
            error: '',
            loading: false,
            id: (props.match && props.match.params && props.match.params.id) || null,
        };

        this.getData = this.getData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormResponse = this.handleFormResponse.bind(this);
    }

    componentDidMount() {

        // if given a post id then fetch psot for edit else is a new post
        if(this.state.id !== null){
            this.setState({ loading: true }, this.getData);
        }
    }

    getData() {
        this.setState({ loading: true }, () => {
            request(`${baseApiUrl}/${this.state.id}`)
                .then(post => {
                    this.setState({ post, loading: false })
                })
                .catch(error => {
                    this.setState({ error, loading: false })
                });
        });
    }

    handleChange(event) {
        event.preventDefault();
        const { id, value } = event.target;
        
        const post = { ...this.state.post, [id]: value };
        this.setState({ post });
    }

    handleSubmit(event) {
        event.preventDefault();
        const postBody = { ...this.state.post };
        postBody.timestamp = postBody.timestamp || new Date();

        this.setState({ loading: true }, () => {

            request(`${baseApiUrl}/${this.state.id || ''}`, {
                method: this.state.id ? `PUT` : 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postBody)
            })
                .then(success => {
                    this.handleFormResponse({ success });
                })
                .catch(error => {
                    this.handleFormResponse({ error });
                });
        });
    }

    handleFormResponse({ error = '', success = '' }) {
        const posts = this.state.id ? this.state.post : this.props.post;
        this.setState({ success, error, post: { ...posts }, loading: false });
    }

    render(){
        return (
            <header className="edit-container">
                {this.state.loading ? <Spinner animation="border" variant='primary' /> : 
                    <Fragment>
                        {this.state.success ? <Alert variant='success'>{this.state.success}</Alert> : null}
                        {this.state.error ? <Alert variant='danger'>{this.state.error}</Alert> : null}

                        <h1>{ this.state.id ? 'Edit Post' : 'New Post'}</h1>

                        <Form onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Row} controlId="title">
                                    <Form.Label column sm="4">Title</Form.Label>
                                    <Col sm="8">
                                        <Form.Control type='text' value={this.state.post.title} onChange={this.handleChange}/>
                                    </Col>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Row} controlId="text">
                                    <Form.Label column sm="4">Text</Form.Label>
                                    <Col sm="8">
                                        <Form.Control as="textarea" rows="10" value={this.state.post.text} onChange={this.handleChange}/>
                                    </Col>
                                </Form.Group>
                            </Form.Row>

                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                    </Fragment>
                }
            </header>
        )
    }
}


Edit.defaultProps = {
    post: {
        title: '',
        text: '',
    }
}

export default Edit;