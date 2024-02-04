import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Items = () => {
    const [items, setItems] = useState([]);
    const [reocrd, setRecord] = useState([]);
    const [categories, setCategories] = useState(null);



    const [id, setId] = useState(0);
    const [name, setName] = useState(null);
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState(0);

    const [selectedItem, setSelectedItem] = useState(null);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    const getItems = async () => {
        const response = await axios.get("http://localhost:8087/items");
        setItems(response.data);
    }
    const getCategories = async () => {
        const response = await axios.get("http://localhost:8087/categories");
        setCategories(response.data);
        clearForms();
    }

    useEffect(() => {
        // getItems();
        getCategories();
        clearForms();
    }, [])


    const handleQty = (event) => {
        setQty(event.target.value);
    }
    const handlePrice = (event) => {
        setPrice(event.target.value);
    }
    const handleCategory = (event) => {
        setCategoryId(event.target.value);
    }
    const handleId = (event) => {
        setId(event.target.value);
    }
    const handleFormClearButton = () => {
        clearForms();
    }


    const clearForms = () => {
        setId("")
        setName("");
        setQty("");
        setPrice("");
        setCategoryId(0);
    }

    const handleClick = (item) => {
        setSelectedItem(item);
        setId(item.itemId);
        setName(item.itemName);
        setQty(item.hqty);
        setPrice(item.unitPrice);
        setCategoryId(item.itemCategory.id);
    }

    const handleAdd = async (event) => {
        event.preventDefault();
        const data = {
            // "id":id,
            "name": name,
            "qtyOnHand": qty,
            "unitPrice": price,
            "cat_id": categoryId
        }
        const response = await axios.post("http://localhost:8087/items", data);
        getItems(response.data);
        clearForms();
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        const data = {
            "id":id,
            "name": name,
            "qtyOnHand": qty,
            "unitPrice": price,
            "cat_id": categoryId
        }
        const response = await axios.put(`http://localhost:8087/items/${id}`, data);
        getItems(response.data);
        clearForms();
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        const response = await axios.delete(`http://localhost:8087/items/${id}`);
        getItems(response.data);
        clearForms();
    }


    return (
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

                    <div style={{ marginTop: "15px", marginLeft: "50px", marginBottom: "50px" }}>
                        <h1>Manage-Item</h1>
                    </div>

                    <div className="col-md-10" style={{ marginLeft: "100px" }}>
                        <table className="table table-stripped table-bordered">
                            <thead className="table-bordered">
                                <th>ID</th>
                                <th>ItemName</th>
                                <th>Hand On Qty</th>
                                <th>UnitPrice(Rs)</th>
                                <th>CategoryID</th>
                            </thead>
                            <tbody className="table-success">
                                <tr>
                                    <td>
                                        <input type="text" className="form-control" placeholder="ID" value={id}
                                            onChange={handleId}
                                        />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" placeholder="Item name" value={name}
                                            onChange={(event) => {
                                                setName(event.target.value);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" placeholder="Details per unit"
                                            value={qty}
                                            onChange={handleQty}
                                        />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" placeholder="Price per unit"
                                            value={price}
                                            onChange={handlePrice}
                                        />
                                    </td>
                                    <td>
                                        <select required onChange={handleCategory} value={categoryId}>
                                            <option>Select category</option>
                                            {categories && categories.map((category) => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}

                                        </select>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="container-fluid" style={{ display: "flex", marginLeft: "500px" }}>

                        <button className="btn btn-light" style={{ marginLeft: "25px" }} onClick={handleFormClearButton}>Clear Form</button>

                        <button className="btn btn-success" type="submit" onClick={handleAdd} style={{ marginLeft: "200px" }}>Add Item</button>

                        <button className="btn btn-primary" style={{ marginLeft: "25px" }} onClick={handleUpdate}>Update Item</button>

                        <button className="btn btn-danger" style={{ marginLeft: "25px" }} onClick={handleDelete}>Delete Item</button>

                    </div>

                    <div className="container" style={{ marginLeft: "100px", marginTop: "50px" }}>
                        <table className="table table-primary table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ItemName</th>
                                    <th>Qty</th>
                                    <th>UnitPrice(Rs)</th>
                                    <th>CategoryID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item, index) => {
                                        return <tr key={index} onDoubleClick={() => handleClick(item)}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.qtyOnHand}</td>
                                            <td>{item.unitPrice}</td>
                                            <td>{item.itemCategory.id}</td>
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
export default Items;