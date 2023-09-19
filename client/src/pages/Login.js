import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AuthContext from "../context/AuthContext"
import ToastContext from "../context/ToastContext"

const Login = () => {

    const {toast} = useContext(ToastContext)
    const { loginUser } = useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
        if (!credentials.email || !credentials.password) {
            toast.error("please enter the all required fields")
            return
        }
        loginUser(credentials)

    }
    return <>
        
        <h3>Login </h3>
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label htmlFor="emailInput" className="form-label mt-4">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="umair@example.com" name="email" value={credentials.email} onChange={handleInputChange} required />
            </div>
            <div class="form-group">
                <label htmlFor="passwordInput" className="form-label mt-4">Password</label>
                <input type="password" class="form-control" id="exampleInputEmail1" placeholder="Enter Password" name="password" value={credentials.password} onChange={handleInputChange} required />
            </div>
            <input type="submit" value="Login" className="btn btn-primary my-3"></input>
            <p>Don't have an account? <Link to="/register">Create One</Link></p>
        </form>
    </>
}

export default Login