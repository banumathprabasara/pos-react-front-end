import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Stock=()=>{
    const[stock,setStock]=useState([]);

    const[stockId,setStockId]=useState(0);
    const[itemId,setItemId]=useState(0);
    const[quantityOnHand,setQuantityOnHand]=useState(0);

    const[selectedRow,setSelectedRow]=useState(null);

    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate('/login');
    }

    useEffect (()=>{
        getStock();
        clearForm();
    },[])

    const getStock=async()=>{
        const response=await axios.get("http://localhost:5054/stock");
        setStock(response.data);
    }

    const handleStockId=(event)=>{
        setStockId(event.target.value);
    }
    const handleItemId=(event)=>{
        setItemId(event.target.value);
    }
    const handleQuantityOnHand=(event)=>{
        setQuantityOnHand(event.target.value);
    }

    const handleClick=(stockItem)=>{
        setSelectedRow(stockItem);
        setStockId(stockItem.stockId);
        setItemId(stockItem.item.itemId);
        setQuantityOnHand(stockItem.quantityOnHand);
    }

    const handleFormClearButton=()=>{
        clearForm();
    }
    const clearForm=()=>{
        setStockId("stock id");
        setItemId("item id");
        setQuantityOnHand("enter quantity on hand");
    }


    const handleUpdate=async(event)=>{
        event.preventDefault();
        const data={
            "quantityOnHand":quantityOnHand
        }
        const response=await axios.put(`http://localhost:5054/stock/${stockId}`,data);
        getStock(response.data);
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
                <h1>Manage-Stock</h1>
            </div>

            <div className="col-md-10" style={{marginLeft:"100px"}}> 
                <table className="table table-stripped table-bordered">
                    <thead className="table-bordered">
                            <th>Stock_Id</th>
                            <th>Item_Id</th>
                            <th>Quantity_On_Hand</th>
                             
                    </thead>
                     <tbody className="table-success">
                        <tr>
                            <td>
                                 <input type="text" className="form-control" placeholder="Stock_Id" value={stockId}
                                    onChange={handleStockId}
                                    readOnly
                                 />
                            </td>
                            <td>
                                <input type="text" className="form-control" placeholder="Item_Id" value={itemId}
                                    onChange={handleItemId}
                                    readOnly
                                />
                            </td>
                            <td>
                                <input type="text" className="form-control" placeholder="Quantity on hand"
                                    value={quantityOnHand}
                                    onChange={handleQuantityOnHand}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="container-fluid" style={{display:"flex",marginLeft:"500px"}}>
                <button className="btn btn-light" style={{marginLeft:"70px"}} onClick={handleFormClearButton}>Clear Form</button>
                <button className="btn btn-primary" style={{marginLeft:"400px"}} onClick={handleUpdate}>Update Stock</button>
            </div>

            <div className="container" style={{marginLeft:"100px",marginTop:"50px"}}> 
                <table className="table table-primary table-hover table-bordered">
                    <thead>
                            <tr>
                                 <th>Stock_Id</th>
                                 <th>Item_Id</th>
                                 <th>Quantity_On_Hand</th>
                            </tr>
                    </thead>
                     <tbody>
                        {
                            stock.map((stockItem,index)=>{
                                return <tr key={index} onDoubleClick={()=>handleClick(stockItem)}>
                                    <td>{stockItem.stockId}</td>
                                    <td>{stockItem.item.itemId}</td>
                                    <td>{stockItem.quantityOnHand}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            </div>

        </div>   
        </>
    )
}
export default Stock;