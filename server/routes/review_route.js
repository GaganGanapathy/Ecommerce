const express = require("express")
const router = express.Router()
const protectedRoute = require("../middleware/protectedRoute")
const Review = require("../models/review")

//add review
router.post("/review", protectedRoute, async (req, res) => {
  try {
    const { productId, review, rating } = req.body
    const newReview = await new Review({
      productId,
      review,
      rating,
      author: req.user._id
    })
    await newReview.save()
    res.status(201).json(newReview)
  } catch (err) {
    console.log(err)
  }
})

router.post("/reviews", async (req, res) => {
  try {
    const { productId } = req.body
    const reviews = await Review.find({ productId }).populate("author", "_id")
    res.status(200).json({ reviews: reviews.reverse() })
  } catch (error) {
    console.log(error)
  }
})

//delete review
router.delete("/review/:id", protectedRoute, async (req, res) => {
  try {
    const { id } = req.params
    await Review.findOneAndDelete({ _id: id })
    res.status(200).json({ result: "success" })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
