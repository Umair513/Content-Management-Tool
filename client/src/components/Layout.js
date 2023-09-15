import Navbar from "./Navbar"

const Layout = ({ navbar = true, children }) => {
    return <>
        {navbar && <Navbar></Navbar>} 
        <div className="container mt-3">
            {children}
        </div>
    </>
}

export default Layout