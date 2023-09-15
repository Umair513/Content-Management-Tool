import Layout from "./components/Layout"
import { Route } from "react-router-dom"
import { Routes as Switch } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () => {
  return <Layout>
    <Switch>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
    </Switch>
  </Layout>
}

export default App