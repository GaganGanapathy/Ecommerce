import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Cart from "./components/Cart"
import Signup from "./components/Signup"
import ProductDetail from "./components/ProductDetail"
import Products from "./components/Products"
import CategoryProduct from "./components/CategoryProduct"
import AllProducts from "./components/AllProducts"
import Contact from "./components/Contact"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/signup" Component={Signup} />
        <Route exact path="/cart" Component={Cart} />
        <Route path="/product/:productId" Component={ProductDetail} />
        <Route exact path="/for/:gender" Component={Products} />
        <Route exact path="/in/:subCategory" Component={CategoryProduct} />
        <Route exact path="/allProducts" Component={AllProducts} />
        <Route exact path="/contact" Component={Contact} />
      </Routes>
    </Router>
  )
}

export default App
