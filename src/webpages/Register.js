import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register=()=>{
    const[username,setUserName]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");

    const handleUserName=(event)=>{
        setUserName(event.target.value);
    }
    const handlePassword=(event)=>{
        setPassword(event.target.value);
    }
    const handleEmail=(event)=>{
        setEmail(event.target.value);
    }

    const clearForm=()=>{
        setUserName("username");
        setPassword("password")
        setEmail("email");
    }

    const handleRegister=async(event)=>{
        event.preventDefault();
        const data={
            "username":username,
            "email":email,
            "password":password
        }
        const response=await axios.post("http://localhost:8087/auth/signup",data);
        if(response.status===200){
            console.log("user registered");
            clearForm();
        }else{
            console.log("error");
        }
    }

    return(
        <>
        <div className="login-box position-absolute top-50 start-50 translate-middle">
      <div className="text-center mb-5">
        <h1 className="reg-topic topic">Sign-Up</h1>
        <p>Hey enter your details for create new account</p>
      </div>
      <form onSubmit={handleRegister}>
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
            type="email"
            className="form-control"
            placeholder="Enter your email address"
            onChange={handleEmail}
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

        <button type="submit" className="log-btn auth-btn btn btn-primary">
          Sign-Up
        </button>
      </form>
    </div>
        </>
    )
}

export default Register;