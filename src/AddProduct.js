import Header from './Header'
import {useState} from 'react'

function AddProduct(){
    const [name, setName]=useState('');
    const [file, setFile]=useState('');
    const [price, setPrice]=useState('');
    const [description, setDescription]=useState('');

    async function addProduct()
    {
        console.warn(name,file,price,description);
        const formData = new FormData();
        formData.append('file',file);
        formData.append('name',name);
        formData.append('price',price);
        formData.append('description',description);

        let result = await fetch('http://127.0.0.1:8000/api/addproduct',{
            method:'POST',
            body:formData
        });
        alert('Your Data is Saved')

    }
    return(
        <div>
            <Header />
            <h1>Add Your Product Here </h1>
            <div className="col-sm-6 offset-sm-3">
                <input type="text" className="form-control" placeholder="Enter mobile Name" onChange={(e)=>setName(e.target.value)}/><br />
                <input type="file" className="form-control" placeholder="File" onChange={(e)=>setFile(e.target.files[0])}/><br />
                <input type="text" className="form-control" placeholder="Enter mobile Price" onChange={(e)=>setPrice(e.target.value)}/><br />
                <input type="text" className="form-control" placeholder="Enter mobile Description" onChange={(e)=>setDescription(e.target.value)}/><br />
                <button onClick={addProduct} className="btn btn-primary">Add Product</button>
            </div>
        </div>
    )
}

export default AddProduct