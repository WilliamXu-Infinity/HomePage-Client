import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onHandleSubmit = (e) => {
        e.preventDefault();
        
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-prime mt-5">
            <form onSubmit={(e) => onHandleSubmit(e)}>
                <div className="mb-2">
                    <label htmlFor="email"></label>
                    <input 
                        type="email" 
                        placeholder="Enter your email"
                        onChange={e => setEmail(e.target.value)}    
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="password"></label>
                    <input type="password" placeholder="Enter your password" />
                </div>
                <button type="button" className="w-100 btn btn-success">Login</button>
            </form>

            
        </div>
    )
}

export default Login