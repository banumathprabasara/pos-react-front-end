
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [itemsByCategory, setItemsByCategory] = useState([]);

    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [orderItems, setOrderItems] = useState([]);


    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    const getItems = async () => {
        const response = await axios.get('http://localhost:8087/items');
        setItems(response.data);
    }
    const getCategories = async () => {
        const response = await axios.get('http://localhost:8087/categories');
        setCategories(response.data);
    }

    useState(() => {
        getItems();
        getCategories();
    }, [])

    const handleLoadCategoryItems = async (category) => {
        setSelectedCategory(category);
        const response = await axios.get(`http://localhost:8087/category/${category.id}/items`);
        setItemsByCategory(response.data);
    }

    const handleOrder = () => {

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
            <div className="container-fluid" style={{ marginTop: "20px" }}>
                <h1>Add To Cart</h1>
                <div className="row" style={{ border: "5px" }}>

                    <div className="col-md-6">

                        <div style={{ marginTop: "20px", marginBottom: "10px" }}>
                            <h2>Select items by category</h2>
                        </div>

                        <div >
                            {
                                categories && categories.map((category) => (
                                    <button className={`btn ${selectedCategory === category ? 'btn-danger' : 'btn-primary'}`} onClick={() => handleLoadCategoryItems(category)} style={{ marginRight: "10px" }}>{category.name}</button>
                                ))
                            }
                        </div>

                        <div style={{ marginTop: "20px", marginBottom: "10px" }}>
                            <h2>Items</h2>
                        </div>
                        <div>
                            <ol>
                                {itemsByCategory && itemsByCategory.map((item) => (
                                    <div className="item-box px-2 py-2">
                                        {item.itemName}-   {item.unitPrice}
                                        <button className="btn btn-sm btn-primary" style={{ marginLeft: "20px" }} onClick={() => {
                                            setOrderItems([...orderItems, item]);

                                        }}> Add to cart</button>
                                    </div>
                                ))}
                            </ol>
                        </div>



                    </div>

                    <div className="col-md-6">
                        <div>
                            <h2>Order</h2>
                        </div>

                        <div>
                            <table className="table table-stripped">
                                <thead>
                                    <th>Item ID</th>
                                    <th>Item Name</th>
                                    <th>Price</th>
                                </thead>
                                <tbody>
                                    {
                                        orderItems && orderItems.map((item) => (
                                            <tr>
                                                <td>{item.itemId}</td>
                                                <td>{item.itemName}</td>
                                                <td>{item.unitPrice}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <thead>
                                    <tr>
                                        <th colSpan={2}>
                                            Total
                                        </th>
                                        <th>
                                            {total}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th colSpan={2}>
                                            Tax
                                        </th>
                                        <th>
                                            {tax}
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                            <button className="btn btn-primary" onClick={handleOrder}>Complete Order</button>
                        </div>
                    </div>

                </div>
            </div>
            </div>
        </div>
            
        </>
    )

}
export default Cart;