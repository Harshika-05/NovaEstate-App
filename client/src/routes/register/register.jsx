import "./register.scss";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import apiRequest from "../../lib/apiRequest";


function Register() {


const [error , setError] = useState("");

const [isLoading , setisLoading] = useState(false);

const navigate = useNavigate();

//using react 18 that's why using onSubmit
const handleSubmit = async (e) =>{

  e.preventDefault();

  setisLoading(true);
  setError("");
  const formData = new FormData(e.target);
  const username = formData.get("username")
  const email = formData.get("email")
  const password = formData.get("password")

  // Client-side validation
  if(!username || !email || !password) {
    setError("All fields are required");
    setisLoading(false);
    return;
  }

  if(password.length < 6) {
    setError("Password must be at least 6 characters");
    setisLoading(false);
    return;
  }

  try {
    const res = await apiRequest.post("/auth/register" , {
      username , email , password
    })

    navigate("/login")
  } catch(err) {
    setError(err.response?.data?.message || "Something went wrong. Please try again.");
  } finally {
    setisLoading(false);
  }
};


  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input 
            name="username" 
            type="text" 
            placeholder="Username" 
            required
            minLength={3}
            maxLength={26}
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            required
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            required
            minLength={6}
          />
          <button disabled = {isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
          {error && <span className="error">{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;