import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from 'react-bootstrap/Button';

import './index.css';
import Loading from '../../components/loading';
import Error from '../../components/error';
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

        this.columns = [
            { accessor: 'id', Header: 'ID' },
            { accessor: 'employee_name', Header: 'Name' },
            { accessor: 'employee_salary', Header: 'Salary' },
            { accessor: 'employee_age', Header: 'Age' },
            {
                Header: 'Edit',
                Cell: cellInfo => {
                    return (
                        <LinkContainer to={`/edit/${cellInfo.original.id}`}><Button>Edit</Button></LinkContainer>
                    )
                }
            },
            {
                Header: 'Delete',
                Cell: cellInfo => {
                    return (
                        <Button variant="danger" onClick={() => this.deleteData(cellInfo.original.id)}>
                            Delete
                        </Button>
                    );
                }
            },
        ]

        this.getData = this.getData.bind(this);
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
                    this.state.loading ? <Loading message={'Loading employees'}/> :
                    this.state.error ? <Error error={this.state.error} /> :
                    <ReactTable
                        data={this.state.data}
                        columns={this.columns}
                    />
                }
            </header>
        );
    }
}