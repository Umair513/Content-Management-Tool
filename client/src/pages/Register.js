import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AuthContext from "../context/AuthContext"

const Register = () => {
    const { registerUser } = useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!credentials.email || !credentials.password || !credentials.confirmPassword) {
            toast.error("please enter the all required fields")
            return
        }
        if (credentials.password != credentials.confirmPassword) {
            toast.error("password do not match")
            return
        }
        const userData = {...credentials, confirmPassword: undefined}
        registerUser(userData)
    }
    return <>

        <ToastContainer autoClose={2000}></ToastContainer>
        <h3>Create Your Account</h3>
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="nameInput" class="form-label mt-4">Your Name</label>
                <input type="text" class="form-control" id="exampleInputEmail1"  placeholder="Umair" name="name" value={credentials.name} required onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label for="emailInput" class="form-label mt-4">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="umair@example.com" name="email" value={credentials.email} required onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label for="passwordInput" class="form-label mt-4">Password</label>
                <input type="password" class="form-control" id="exampleInputEmail1" placeholder="Enter Password" name="password" value={credentials.password} required onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label for="confirmPassword" class="form-label mt-4">Confirm Password</label>
                <input type="password" class="form-control" id="exampleInputEmail1" placeholder="Enter Password" name="confirmPassword" value={credentials.confirmPassword} required onChange={handleInputChange} />
            </div>
            <input type="submit" value="Register" className="btn btn-primary my-3"></input>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
    </>
}

export default Register