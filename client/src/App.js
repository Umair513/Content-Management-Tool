import Layout from "./components/Layout"
import { Route } from "react-router-dom"
import { Routes as Switch } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { AuthContextProvider } from "./context/AuthContext"

const App = () => {
  return (
    <AuthContextProvider>
    <Layout>
      <Switch>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Switch>
      </Layout>
    </AuthContextProvider>
  )
}

export default App