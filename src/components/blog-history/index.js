import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './index.css';

import BlogTime from 'components/blog-time';


export default function ({ posts }) {
    return (
        <div className='blog-history'>
            <h1>Past Posts</h1>

            <ListGroup>
                {posts.map((post, index) => {
                    return (
                        <ListGroup.Item key={post.id}>
                            <BlogTime timestamp={post.timestamp}/> - post {index+1}
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>

            <LinkContainer to="/new"><Button>Create New Post</Button></LinkContainer>
        </div>
    );
}