const express = require("express")
const router = express.Router()
const Product = require("../models/product")

// get all product details
router.get("/getProduct", async (req, res) => {
  try {
    const result = await Product.find({})
    res.status(200).json({ result })
  } catch (err) {
    console.log(err)
  }
})

//add product
router.post("/addProduct", async (req, res) => {
  try {
    const { name, description, price, category, subCategory, picture } =
      req.body
    const product = await new Product({
      name,
      description,
      price,
      category,
      subCategory,
      picture
    })
    await product.save()
    res.status(201).json({ result: "product Added successfully" })
  } catch (err) {
    console.log(err)
  }
})

//product Details
router.post("/productDetails", async (req, res) => {
  try {
    const { id } = req.body
    const product = await Product.findOne({ _id: id })
    res.status(200).json({ product })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
