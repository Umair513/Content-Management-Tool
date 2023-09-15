import { useState } from "react"
import { Link } from "react-router-dom"

const Register = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setCredentials({...credentials, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }
    return <>
        <h3>Create Your Account</h3>
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="emailInput" class="form-label mt-4">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="umair@example.com" name="email" value={credentials.email} required onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label for="passwordInput" class="form-label mt-4">Password</label>
                <input type="password" class="form-control" id="exampleInputEmail1" placeholder="Enter Password" name="password"  value={credentials.password} required onChange={handleInputChange}/>
            </div>
            <div class="form-group">
                <label for="confirmPassword" class="form-label mt-4">Confirm Password</label>
                <input type="password" class="form-control" id="exampleInputEmail1" placeholder="Enter Password" name="confirmPassword" value={credentials.confirmPassword} required onChange={handleInputChange}/>
            </div>
            <input type="submit" value="Register" className="btn btn-primary my-3"></input>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
    </>
}

export default Register