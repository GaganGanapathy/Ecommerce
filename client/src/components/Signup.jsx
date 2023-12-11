import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import swal from "sweetalert2"

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (password !== confirmPassword) {
        swal.fire({
          icon: "error",
          title: "Password did not match"
        })
        return
      }
      const result = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/signup`,
        {
          name,
          email,
          password
        }
      )
      if (result.status == 201) {
        swal.fire({
          icon: "success",
          title: "User registered succesfully"
        })
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        navigate("/login")
      }
    } catch (err) {
      swal.fire({
        icon: "error",
        title: err.response.data.error
      })
    }
  }
  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{ height: "100vh" }}
    >
      <div>
        <h1 className="text-center text-black">Signup</h1>
      </div>
      <div className="container d-flex justify-content-center align-items-center my-2">
        <div className="row">
          <div className="card" style={{ width: "26vw", padding: "0" }}>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    id="name"
                    name="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm_password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    id="confirm_password"
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button className="btn btn-warning">Register</button>
                </div>
              </form>
            </div>
            <div className=" d-flex justify-content-center align-items-center">
              <hr className=" text-muted flex-grow-1 mx-2" />
              <h6 className="text-dark">Already have an Account ?</h6>
              <hr className="text-muted flex-grow-1 mx-2" />
            </div>
            <div className="d-grid mb-2 mx-3">
              <button className="btn btn-warning">
                <Link
                  to="/login"
                  className="text-dark"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
