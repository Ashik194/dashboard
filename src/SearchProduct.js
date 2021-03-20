import Header from './Header'
import { useState } from 'react'
import { Table } from 'react-bootstrap'

function SearchProduct() {
    const [data, setData] = useState([]);
    async function search(key) {
        if(key.length>1)
        {
            let result = await fetch("http://127.0.0.1:8000/api/search/" + key)
            result = await result.json();
            console.log(result);
            setData(result);
        }
    }
    return (
        <div>
            <Header />
            <h1>Search Your Product Here </h1>
            <div className="col-sm-6 offset-sm-3">
                <input type="text" onChange={(e) => search(e.target.value)} className="form-control" placeholder="Search you Product" />
                {
                    data.length>0?
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
                                    </tr>)

                            }
                        </tbody>
                    </Table>
                    :<h3>Search Product</h3>
                }
            </div>
        </div>
    )
}

export default SearchProduct