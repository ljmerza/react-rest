import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import BlogTime from 'components/blog-time';

import './index.css';


export default function({ post, deleteData }){
    return (
        <Card className='blog-post'>
            <Card.Body>
                <Card.Title>
                    <div>{post.title}</div>
                    <div><BlogTime timestamp={post.timestamp} /></div>
                </Card.Title>
                <Card.Text>
                    {post.text}
                </Card.Text>

                <ButtonGroup>
                <LinkContainer to={`/edit/${post.id}`}>
                    <Button variant="warning">
                        edit
                    </Button>
                    </LinkContainer>
                    
                    <Button variant="danger" onClick={() => deleteData(post.id)}>delete</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
}