import React, { Component } from 'react';
import 'react-table/react-table.css';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import './index.css';
import DataTable from '../../components/datatable';
import request from '../../utils/request';
import { baseApiUrl } from '../../utils/const';


export default class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            loading: true,
            error: '',
        };

        this.getData = this.getData.bind(this);
        this.deleteData = this.deleteData.bind(this);
    }

    componentDidMount(){
        this.setState({ loading: true }, this.getData);
    }

    getData(){
        request(`${baseApiUrl}/employees`)
            .then(data => this.setState({ data, loading: false }))
            .catch(error => this.setState({ error, loading: false }));
    }

    deleteData(id){
        request(`${baseApiUrl}/delete/${id}`, {
            method: 'DELETE'
        })
        .then(() => this.getData())
        .catch(error => this.setState({ error }));
    }

    render(){
        return (
            <header className='home-container'>
                {
                    this.state.loading ? <Spinner animation="border" variant='primary'/> :
                    this.state.error ? <Alert variant='danger'>{this.state.error}</Alert> :
                    <DataTable
                        data={this.state.data}
                        deleteData={this.deleteData}
                    />
                }
            </header>
        );
    }
}