import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from 'react-bootstrap/Button';


export default function ({ deleteData, data }) {
   const columns = [
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
                    <Button variant="danger" onClick={() => deleteData(cellInfo.original.id)}>
                        Delete
                    </Button>
                );
            }
        },
    ]

    return (
        <ReactTable
            data={data}
            columns={columns}
        />
    );
}