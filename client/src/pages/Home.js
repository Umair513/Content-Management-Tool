import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        !user && navigate("/login", {replace: true})
    }, [])
    return <>
        This is Home page
    </>
}

export default Home