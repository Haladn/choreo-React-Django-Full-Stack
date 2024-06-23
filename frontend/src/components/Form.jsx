import { useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import LoadingIndicator from "./LoadingIndicator";
function Form({route,method}){
    const [username,setUsername]= useState("")
    const [password,setPassword]= useState("")
    const [loading,setLoading]= useState(false)
    const navigate = useNavigate()

    const name = method==="login" ? "Login": "Register"

    const handleSubmit = async (e)=>{
        setLoading(true);
        e.preventDefault(); // prevent the page from default reloading
        
        try{
            const res = await api.post(route,{username,password})
    
            if(method==="login"){
                localStorage.setItem(ACCESS_TOKEN,res.data.access);
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh);
                navigate("/")
            }
            else{
                navigate("/login")
            }
        }
        catch(error){
            alert(error)
        }finally{
            setLoading(false)
        }

        }


    return (
    <div className="row justify-content-center">
        <div className="col col-6 mt-5 border rounded bg-light p-4">
        <form onSubmit={handleSubmit} className="form-container">
        <h1 className="text-center mt-2 mb-4">{name}</h1>
        <input
            type="text"
            className="form-control" 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="username"
        />
        
        <input
            type="password"
            className="form-control my-2" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="password"
        />

        <div className="d-grid mb-2">
            {loading && <LoadingIndicator /> }
            <button type="submit" className="btn btn-primary ">
                {name}
            </button>
        </div>
    </form>
        </div>
        
    </div>
    )

}

export default Form;