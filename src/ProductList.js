import Header from './Header'
import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import {Link} from 'react-router-dom'

function ProductList() {
    const [data, setData] = useState('');
    useEffect(() => {
        getData()
    }, [])
    async function deleteOperation(id) {
        let result = await fetch('http://127.0.0.1:8000/api/delete/' + id, {
            method: 'DELETE'
        });
        result = await result.json();
        console.warn(result);
        getData()
    }

    async function getData() {
        let result = await fetch('http://127.0.0.1:8000/api/list');
        result = await result.json();
        setData(result)
    }

    return (
        <div>
            <Header />
            <h1>All Product List</h1>
            <br />
            <div col-sm-8 offset-sm-2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map((item) =>
                            
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td><img style={{ width: 140, height: 100 }} src={"http://127.0.0.1:8000/" + item.file_path} /></td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td><span onClick={() => { deleteOperation(item.id) }} className="delete">Delete</span>
                                    <Link to={"update/"+item.id}><span className="update">Edit</span></Link></td>
                                </tr>)
                                
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default ProductList;