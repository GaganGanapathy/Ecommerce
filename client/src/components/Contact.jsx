import React from "react"
import Navbar from "./Navbar"

function Contact() {
  return (
    <div>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center my-3">
        <div className="row">
          <div className="card" style={{ width: "26vw", padding: "0" }}>
            <img
              src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbnRhY3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="card-img-top img-fluid  object-fit-cover"
              style={{ height: "300px" }}
            />
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    id="name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    E-mail
                  </label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="form-control"
                    id="email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="3"
                  ></textarea>
                </div>
                <div className="d-grid">
                  <button className="btn btn-warning">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
