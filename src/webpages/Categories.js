import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Category=()=>{

    const[categories,setCategories]=useState([]);
    const[id,setId]=useState(0);
    const[selectedRow,setSelectedRow]=useState(null);

    const[name,setName]=useState(null);

    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate('/login');
    }

    const getCategories=async()=>{
        const response=await axios.get("http://localhost:8087/categories");
        setCategories(response.data);
    }
    useEffect(()=>{
         getCategories();
         clearForm();
    },[])

    const handleRowClick=(category)=>{
        setSelectedRow(category);
        setId(category.id);
        setName(category.name);
    }
    const handleFormClearButton=(event)=>{
        event.preventDefault();
        clearForm();
    }
    const clearForm=()=>{
        setId("");
        setName("");
    }
    const handleCategoryInput=(event)=>{
        setName(event.target.value);
    }
    const handleId=(event)=>{
        setId(event.target.value);
    }
    

    const handleAdd=async(event)=>{
        event.preventDefault();
        const data={
            "catId":id,
            "name": name
        }
        const response=await axios.post("http://localhost:8087/categories",data);
        getCategories(response.data);
        clearForm();
    }

    const handleUpdate=async(event)=>{
        event.preventDefault();
        const data={
            "catId":id,
            "name": name
        }
        const response=await axios.put(`http://localhost:8087/categories/${id}`,data);
        getCategories(response.data);
        clearForm();
    }

    const handleDelete=async(event)=>{
        event.preventDefault();
        const response=await axios.delete(`http://localhost:8087/categories/${id}`);
        getCategories(response.data);
        clearForm();
    }

    return(
        <>
         <div>
            <div>
            <nav className=" navbar navbar-expand-lg border border-info bg-body-tertiary shadow-lg p-3 mb-5 position-absolute w-100">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end " id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li id="homeBtn" className="nav-item">
                                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a class="nav-link" href="/items">Items</a>
                                    </li>
                                    <li className="nav-item">
                                        <a class="nav-link" href="/categories">Categories</a>
                                    </li>
                                    <li className="nav-item">
                                        <a class="nav-link" href="/stock">Stock</a>
                                    </li>
                                    <li className="nav-item">
                                        <a class="nav-link" href="/cart">Cart</a>
                                    </li>
                                </ul>
                            </div>
                            <button type="button" class="btn btn-danger" onClick={handleLogout}>Log-Out</button>
                        </div>
                    </nav>
            </div>

            <div className="body">
            <div style={{marginTop:"15px",marginLeft:"50px",marginBottom:"50px"}}>
                <h1>Manage-Category</h1>
            </div>

            <div>
                <div className="col-md-10" style={{marginLeft:"60px"}}> 
                    <table className="table table-stripped table-bordered">
                        <thead className="table-bordered">
                                <th>ID</th>
                                <th>Category</th>
                        </thead>
                        <tbody className="table-success">
                            <tr>
                                <td>
                                    <input type="text" className="form-control" placeholder="ID" value={id} 
                                    onChange={handleId} 
                                    />
                                </td>
                                 <td>
                                    <input type="text" className="form-control" placeholder="Enter Category"
                                       value={name} onChange={handleCategoryInput}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div> 
            <div className="container-fluid" style={{display:"flex",marginLeft:"500px"}}>
                 
                    <button className="btn btn-light" style={{marginLeft:"25px"}} onClick={handleFormClearButton}>Clear Form</button>
                
                 
                    <button className="btn btn-success" type="submit" onClick={handleAdd} style={{marginLeft:"100px"}}>Add Category</button>
                 
                    <button className="btn btn-primary" style={{marginLeft:"25px"}} onClick={handleUpdate}>Update Category</button>
                 
                <button className="btn btn-danger" style={{marginLeft:"25px"}} onClick={handleDelete}>Delete Category</button>
                 
            </div>
            </div>

            <div>
                <div className="container" style={{marginLeft:"50px",marginTop:"70px"}}> 
                    <table className="table table-primary table-hover table-bordered">
                        <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category</th>
                                </tr>
                        </thead>
                        <tbody>
                            {
                                categories&&categories.map((category,index)=>{
                                    return <tr key={index} onDoubleClick={()=>handleRowClick(category)}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            </div>

         </div>
        </>
    )
}
export default Category;