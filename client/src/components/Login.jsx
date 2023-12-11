import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../redux/userSlice"

function Login() {
  const dispatch = useDispatch()
  // state variable
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const result = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          email,
          password
        }
      )
      if (result.status === 200) {
        setLoading(false)
        dispatch(
          loginSuccess({
            user: result.data.result.user,
            token: result.data.result.token
          })
        )
        Swal.fire({
          icon: "success",
          title: "Looged in successfully"
        })
        navigate("/")
      }
      setEmail("")
      setPassword("")
    } catch (err) {
      Swal.fire({
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
      <div className="d-flex justify-content-center align-items-center">
        <h1 className="text-center text-black me-2">Login</h1>
        {loading && (
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      <div className="container d-flex justify-content-center align-items-center my-2">
        <div className="row">
          <div className="card" style={{ width: "26vw", padding: "0" }}>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
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
                    autoFocus
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
                <div className="d-grid">
                  <button className="btn btn-warning">Login</button>
                </div>
              </form>
            </div>
            <div className=" d-flex justify-content-center align-items-center">
              <hr className=" text-muted flex-grow-1 mx-2" />
              <h6 className="text-dark">New Customer ?</h6>
              <hr className="text-muted flex-grow-1 mx-2" />
            </div>
            <div className="d-grid mb-2 mx-3">
              <button className="btn btn-warning">
                <Link
                  to="/signup"
                  className="text-dark"
                  style={{ textDecoration: "none" }}
                >
                  Sign Up
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
