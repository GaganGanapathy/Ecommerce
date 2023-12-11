import "../styles/Header.css"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import { useDispatch, useSelector } from "react-redux"
import { emptyCart } from "../redux/cartSlice"
import { logout } from "../redux/userSlice"
import Swal from "sweetalert2"

function Header({ phrase, setPhrase }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user)

  const handleLogout = () => {
    try {
      dispatch(emptyCart())
      dispatch(logout())
      Swal.fire({
        icon: "success",
        title: "Logged out sucessfully",
      })
      navigate("/")
    } catch (error) {
      console.log("Header page error", error)
    }
  }
  return (
    <div>
      <nav
        className="navbar navbar-dark bg-dark navbar-expand-md"
        style={{ background: "black" }}
      >
        <div className="container mx-md-auto ms-2">
          <Link to="/" className="navbar-brand mx-3" id="brand">
            Ecommerce
          </Link>
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
            aria-controls="nav"
            aria-label="Expand Navigation"
          >
            <span className="navbar-toggler-icon text-body-secondary"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav">
            <div className="input-group w-50 mb-2 mb-md-0 ms-md-auto">
              <input
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Product name"
                aria-label="Recipient's username"
                aria-describedby="input"
              />
            </div>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item my-auto">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="nav-link btn btn-warning bg-warning d-md-inline-block d-inline p-2 me-4 text-dark fw-medium"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="nav-link btn btn-warning bg-warning d-md-inline-block d-inline p-2 me-4 text-dark fw-medium"
                  >
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <Link
                  to="/cart"
                  className="nav-link"
                  style={{ fontSize: "xx-large" }}
                >
                  <i
                    className="fa-solid fa-cart-shopping"
                    style={{ color: "#ffde05" }}
                  ></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Navbar />
    </div>
  )
}

export default Header
