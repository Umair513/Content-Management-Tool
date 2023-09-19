import { createContext } from "react";
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"

const ToastContext = createContext()

export const ToastContextProvider = ({ children }) => {
    return (
        <ToastContext.Provider value={{ toast }}>
            <ToastContainer autoClose={2000}></ToastContainer>
            {children}
        </ToastContext.Provider>
    )
}

export default ToastContext