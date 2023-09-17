import { createContext, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    // login request
    const loginUser = async (userData) => {
        try {
            const res = await fetch(`http://localhost:8000/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...userData })
            })
            const result = await res.json()
            if (!result.error) {
                localStorage.setItem("token", result.token)
            } else {

            }

        } catch (error) {
            console.log(error)
        }
    }

    // register request
    const registerUser = async (userData) => {
        try {
            const res = await fetch(`http://localhost:8000/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...userData })
            })

            const result = await res.json()
            if (!result.error) {
                console.log(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return <AuthContext.Provider value={{ loginUser, registerUser }}>{children}</AuthContext.Provider>
}

export default AuthContext