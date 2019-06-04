import React, { PureComponent } from 'react';
import 'react-table/react-table.css';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import './index.css';
import BlogPost from 'components/blog-post';
import BlogHistory from 'components/blog-history';
import request from 'utils/request';
import { baseApiUrl } from 'utils/const';


export default class Home extends PureComponent {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            loading: true,
            success: '',
            error: '',
        };

        this.getData = this.getData.bind(this);
        this.deleteData = this.deleteData.bind(this);
    }

    componentDidMount(){
        this.setState({ loading: true }, this.getData);
    }

    getData(){
        request(`${baseApiUrl}`)
            .then(data => {
                this.setState({ data, loading: false });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }

    deleteData(id){
        this.setState({ loading: true }, () => {
            request(`${baseApiUrl}/${id}`, {
                method: 'DELETE'
            })
                .then(success => {
                    this.setState({ success }, this.getData);
                     this.getData();
                })
                .catch(error => {
                    this.setState({ error });
                });
        });
    }

    render(){
        return (
            <header className='home-page'>
                {this.state.error ? <Alert variant='danger'>{this.state.error}</Alert> : null}
                {this.state.success ? <Alert variant='primary'>{this.state.success}</Alert> : null}
            
                {this.state.loading ? <Spinner animation="border" variant='primary' /> :
                    <div className='home-content'>
                        <BlogHistory posts={this.state.data} />
                        <div className='blog-posts'>
                            {this.state.data.map(post => <BlogPost post={post} deleteData={this.deleteData} key={post.id} />)}
                        </div>
                    </div>
                    
                }
            </header>
        );
    }
}