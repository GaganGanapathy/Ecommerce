import React from "react"
import { Link } from "react-router-dom"
import Contact from "./Contact"

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand bg-body-secondary">
        <div className="container-fluid">
          <ul className="navbar-nav d-flex flex-grow-1 flex-wrap justify-content-around">
            <li className="nav-item">
              <Link to="/" className="nav-link color">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link color" to="/allProducts">
                All Products
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle color"
                data-bs-toggle="dropdown"
                role="button"
              >
                Men
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item color" to="/for/men">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item color" to="/in/tshirt">
                    Shirts
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item color" to="/in/pant">
                    Pants
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item color" to="/in/hoodie">
                    Hoodies
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle color"
                data-bs-toggle="dropdown"
                role="button"
              >
                Women
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item color" to="/for/women">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item color" to="/in/dresses">
                    Dresses
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item color" to="/in/jeans">
                    Jeans
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item color" to="/in/skirts">
                    Skirts
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link color" to="/for/kids">
                Kids
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link color" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
