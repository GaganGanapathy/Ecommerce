import { Link } from "react-router-dom"
import "../styles/picture.css"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, deleteFromCart } from "../redux/cartSlice"
import { useEffect, useState } from "react"

export default function Product({ _id, name, description, price, picture }) {
  const cart = useSelector((state) => state.cart.cart)
  // state variables
  const [added, setAdded] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    inCartAlready()
  }, [])

  const handleCart = () => {
    if (added) {
      dispatch(deleteFromCart(_id))
      setAdded(false)
    } else {
      dispatch(addToCart({ _id, picture, name, price, quantity: 1 }))
      setAdded(true)
    }
  }

  const inCartAlready = () => {
    const inCart = cart.filter((item) => item._id === _id)
    if (inCart.length !== 0) {
      setAdded(true)
    } else {
      setAdded(false)
    }
  }
  return (
    <div className="card ms-md-1 me-md-3" style={{ width: "18rem" }}>
      <Link to={`/product/${_id}`}>
        <img
          src={picture}
          alt={name}
          className="card-img-top img-fluid picture object-fit-cover"
        />
      </Link>
      <div className="card-body d-flex flex-column justify-content-around">
        <h5 className="card-title text-center text-dark">{name}</h5>
        <p className="card-text text-dark">{description}</p>
        <div className="d-flex ">
          <p className="card-text fw-semibold mb-1 text-dark fs-4 flex-grow-1">
            ${price}
          </p>

          <button
            className="btn btn-warning me-2 text-dark rounded-circle"
            onClick={handleCart}
          >
            {added ? (
              <i className="fa-solid fa-minus" style={{ color: "#0a0a0a" }}></i>
            ) : (
              <i className="fa-solid fa-plus" style={{ color: "#050505" }}></i>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
