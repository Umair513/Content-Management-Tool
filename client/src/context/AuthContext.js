import { createContext, useContext, useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ToastContext from "./ToastContext"
import { useLocation, useNavigate } from "react-router-dom"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const { toast } = useContext(ToastContext)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const location = useLocation()

    useEffect(() => {
        checkUserLoggedIn()
    }, [])

    // check if the user is logged in 
    const checkUserLoggedIn = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/me`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const result = await res.json()
            if (!result.error) {
                setUser(result)
                navigate("/", {replace: true})
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                setUser(result.user)
                toast.success(`Logged in ${result.user.name}`)
                navigate("/", {replace: true})
            } else {
                toast.error(result.error)
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
                toast.success("user registered successfully")
                navigate("/login", {replace: true})
            }
            else {
                toast.error(result.error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}>{children}</AuthContext.Provider>
}

export default AuthContext