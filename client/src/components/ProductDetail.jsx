import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "../styles/productDetail.css"
import ReactStars from "react-rating-stars-component"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, deleteFromCart } from "../redux/cartSlice"
import Swal from "sweetalert2"

function ProductDetail() {
  const token = useSelector((state) => state.user.token)
  const cart = useSelector((state) => state.cart.cart)

  const currentUser = useSelector((state) => state.user.user?._id)

  const dispatch = useDispatch()
  // state variables
  const [product, setProduct] = useState({})
  const [added, setAdded] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [reviews, setReviews] = useState([])

  const { productId } = useParams()

  useEffect(() => {
    try {
      productDetails()
      getReviews()
      inCartAlready()
    } catch (err) {
      console.log(err)
    }
  }, [])

  async function productDetails() {
    const result = await axios.post("http://localhost:4000/productDetails", {
      id: productId,
    })
    setProduct(result.data.product)
  }

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:4000/review/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      if (result.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Post deleted successfully",
        })
        getReviews()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getReviews = async () => {
    try {
      const reviews = await axios.post("http://localhost:4000/reviews", {
        productId,
      })
      setReviews(reviews.data.reviews)
    } catch (err) {
      console.log(err)
    }
  }

  const handleRating = async (e) => {
    try {
      e.preventDefault()
      if (!currentUser) {
        Swal.fire({
          icon: "error",
          title: "Please log in",
        })
        return
      }
      const newReview = axios.post(
        "http://localhost:4000/review",
        {
          productId,
          review,
          rating,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      if (newReview) {
        Swal.fire({
          icon: "success",
          title: "Rating added successfully",
        })
        getReviews()
        setReview("")
        setRating(0)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleCart = () => {
    const _id = productId
    if (added) {
      dispatch(deleteFromCart(_id))
      setAdded(false)
    } else {
      const { picture, name, price } = product
      dispatch(addToCart({ _id, picture, name, price, quantity: 1 }))
      setAdded(true)
    }
  }

  const inCartAlready = () => {
    const inCart = cart.filter((item) => item._id === productId)
    console.log(inCart)
    if (inCart.length !== 0) {
      setAdded(true)
    } else {
      setAdded(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <div className="row ">
          {/* image */}
          <div className="col-6 ">
            <img
              src={product.picture}
              alt={product.name}
              className="img-fluid image object-fit-cover shadow-lg"
            />
          </div>
          {/* details */}
          <div className="col-6">
            <h4 className="text-dark">{product.name}</h4>
            <p className="fw-medium fs-3">${product.price}</p>
            <hr />
            <p>{product.description}</p>
            <hr />
            <button className="btn btn-warning" onClick={handleCart}>
              {added ? "Remove from cart" : "Add to cart"}
            </button>
          </div>
        </div>
        <hr className="mt-5" />
        {/* description */}
        <div>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Write a Review
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse "
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <form className="d-flex " onSubmit={handleRating}>
                    <textarea
                      name="review"
                      id=""
                      cols="30"
                      rows="3"
                      placeholder="Review"
                      className="me-5 text-dark"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                    <ReactStars
                      count={5}
                      onChange={(newRating) => setRating(newRating)}
                      size={40}
                      isHalf={true}
                      emptyIcon={<i className="fa-regular fa-star"></i>}
                      halfIcon={
                        <i className="fa-solid fa-star-half-stroke"></i>
                      }
                      fullIcon={<i className="fa-solid fa-star"></i>}
                      activeColor="#ffd700"
                    />
                    <button className="btn btn-warning my-auto ms-auto px-4 fs-5 text-dark">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-3" />
        <div>
          {reviews.map((review) => (
            <div className="d-flex align-items-center" key={review._id}>
              <div className="d-flex flex-column justify-content-center me-auto">
                <ReactStars
                  count={5}
                  size={25}
                  edit={false}
                  isHalf={true}
                  value={review.rating}
                  activeColor="#ffd700"
                />
                <p className="text-dark mb-0 fs-5 fw-normal">{review.review}</p>
              </div>
              {currentUser === review.author._id ? (
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(review._id)}
                >
                  Delete
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetail
