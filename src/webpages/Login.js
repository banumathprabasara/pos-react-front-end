import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login=()=>{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");

    const navigation=useNavigate();

    const handleUserName=(event)=>{
        setUsername(event.target.value);
    }
    const handlePassword=(event)=>{
        setPassword(event.target.value);
    }

    const handleLogin=async(event)=>{
        event.preventDefault();
        const data={
            "username":username,
            "password":password
        }
        const response=await axios.post("http://localhost:8087/auth/signin",data);
        console.log(response.data);
        if(response.status === 200){
            localStorage.setItem("token",response.data);

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;

            navigation("/");
            
        }else{
            console.log("logging error");
        }
    }
    
    return(
        <>

        <div className="login-box position-absolute top-50 start-50 translate-middle">
      <div className="text-center mb-5">
        <h1 className="reg-topic topic">User Login</h1>
        <p>Hey enter your details</p>
      </div>
      <form onSubmit={handleLogin}>
        <div className="form-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter our username"
            onChange={handleUserName}
            required
          />
        </div>

        <div className="form-group mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={handlePassword}
            required
          />
        </div>

        <button type="submit" className="log-btn auth-btn btn btn-primary mb-4">
          Sign-In
        </button>
        <p className="para">Dont't have a Account? <a className="link-opacity-50 para" href="/register">Sign-Up</a></p>
      </form>
    </div>
        </>
    )
}
export default Login;