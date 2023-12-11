import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "./Navbar"
import "../styles/cart.css"
import {
  deleteFromCart,
  decrementQuantity,
  incrementQuantity
} from "../redux/cartSlice"

function Cart() {
  // state variables
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [number, setNumber] = useState("")

  const inCart = useSelector((state) => state.cart.cart)
  const cost = inCart.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  )
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteFromCart(id))
  }

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-8">
            {/* items */}
            <div className="part_one d-flex flex-column border border-secondary-subtle rounded-top">
              <h5 className="bg-body-secondary text-center fs-2 text-black rounded-top">
                Items in cart
              </h5>
              <div>
                {inCart.length !== 0 ? (
                  inCart.map((item) => (
                    <div className="row p-1 gy-2" key={item._id}>
                      <div className="col-sm-6">
                        <img
                          src={item.picture}
                          alt="dress"
                          className="rounded-1"
                          style={{ height: "8rem" }}
                        />
                      </div>
                      <div className="col-sm-3">
                        <h5 className="text-black">{item.name}</h5>
                        <h5 className="text-secondary">
                          ${item.price * item.quantity}
                        </h5>
                        <button
                          className="border border-none bg-white trash"
                          onClick={() => handleDelete(item._id)}
                        >
                          <i
                            className="fa-solid fa-trash bg-dark p-2 rounded-1"
                            style={{ color: "#ccf500" }}
                          ></i>
                        </button>
                      </div>
                      <div className="col-sm-3">
                        <div
                          className="input-group input-group-sm mb-3"
                          style={{ maxWidth: "100px" }}
                        >
                          <button
                            className={`btn btn-outline-secondary bg-dark me-1 rounded-1 ${
                              item.quantity === 1 ? "disabled" : ""
                            }`}
                            type="button"
                            onClick={() =>
                              dispatch(decrementQuantity(item._id))
                            }
                          >
                            <i
                              className="fa-solid fa-minus"
                              style={{ color: "#e0f005" }}
                            ></i>
                          </button>
                          <span className="text-dark fs-5 px-1">
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-outline-secondary bg-dark ms-1 rounded-1"
                            type="button"
                            onClick={() =>
                              dispatch(incrementQuantity(item._id))
                            }
                          >
                            <i
                              className="fa-solid fa-plus"
                              style={{ color: "#c8ff00" }}
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-dark text-center mt-2 fw-medium fs-4">
                    Your cart is Empty
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-2 ">
            {/* Summary */}
            <div className="part_two d-flex flex-column justify-content-evenly border border-secondary-subtle rounded-top mt-3 mt-md-0">
              <h5 className="bg-body-secondary text-center fs-2 text-black rounded-top">
                Contact Info
              </h5>
              <form action="http://localhost:4000/checkout" method="POST">
                <div className="d-flex flex-column align-items-center px-3 gap-2">
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="form-control  text-dark"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    name="address"
                    type="text"
                    placeholder="Address"
                    className=" form-control text-dark"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    name="number"
                    type="text"
                    placeholder="Phone number"
                    className="form-control text-dark"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <input
                  type="hidden"
                  name="cart"
                  value={JSON.stringify(inCart)}
                />
                <div className="p-3">
                  <div className="d-flex justify-content-between mb-1 border-top border-secondary pt-2">
                    <span className="text-black fw-medium">Total</span>
                    <span className="text-black fw-medium">
                      ${cost === 0 ? 0 : cost}
                    </span>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className={`btn btn-warning text-black ${
                        inCart.length !== 0 && name && address && number
                          ? ""
                          : "disabled"
                      }`}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
