import Header from './Header'
import {withRouter} from 'react-router-dom'
import {useEffect, useState} from 'react'
function UpdateProduct(props){
    const [name, setName]=useState('');
    const [file, setFile]=useState('');
    const [price, setPrice]=useState('');
    const [description, setDescription]=useState('');
    
    const [data, setData] = useState([]);
    useEffect( async () => {
        let result =await fetch('http://127.0.0.1:8000/api/product/'+props.match.params.id);
        result = await result.json();
        setData(result);
        setName(result.name)
        setPrice(result.price)
        setDescription(result.description)
        setFile(result.file)
    },[])
    async function editProduct(id)
    {
        const formData = new FormData();
        formData.append('file',file);
        formData.append('name',name);
        formData.append('price',price);
        formData.append('description',description);

        let result = await fetch('http://127.0.0.1:8000/api/updateproduct/'+id+'?_method=PUT',{
            method:'POST',
            body:formData
        });
        alert('Your Data has been Updated')
    }
    return(
        <div>
            <Header />
            <div className="col-sm-8 offset-sm-2">
                <h1>Update Product Page</h1>
                <input type="text" onChange={(e)=>setName(e.target.value)} className="formControl" defaultValue={data.name} /><br /><br />
                <input type="text" onChange={(e)=>setPrice(e.target.value)} className="formControl" defaultValue={data.price} /><br /><br />
                <input type="text" onChange={(e)=>setDescription(e.target.value)} className="formControl" defaultValue={data.description} /><br /><br />
                <input type="file" onChange={(e)=>setFile(e.target.files[0])} className="formControl" defaultValue={data.file_path} /><br /><br />
                <img src={"http://127.0.0.1:8000/"+data.file_path} style={{width:50}} /> <br /><br />

                <button onClick={()=>editProduct(data.id)} className="btn btn-success">Update</button>

            </div>
        </div>
    )
}

export default withRouter(UpdateProduct)