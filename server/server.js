const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const protectedRoute = require("./middleware/protectedRoute")
const stripe = require("stripe")(process.env.STRIPE_API_KEY)

//Route
const product_route = require("./routes/product_route")
const review_route = require("./routes/review_route")

// model import
const User = require("./models/user_model")
const Product = require("./models/product")
const Review = require("./models/review")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(product_route)
app.use(review_route)

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected")
  })
  .catch((err) => {
    console.log("Error ", err)
  })

app.get("/", (req, res) => {
  res.send("Continue")
})

app.get("/for/:gender", async (req, res) => {
  try {
    const { gender } = req.params
    const productDetail = await Product.find({ category: gender })
    res.status(200).json({ productDetail })
  } catch (error) {
    console.log(error)
  }
})

app.get("/in/:subCategory", async (req, res) => {
  try {
    const { subCategory } = req.params
    const details = await Product.find({ subCategory })
    res.status(200).json({ details })
  } catch (error) {
    console.log(error)
  }
})

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "One or more mandatory fields are empty" })
    }
    const userInDB = await User.findOne({ email })
    if (!userInDB) {
      return res.status(401).json({ error: "Invalid credentials" })
    }
    const didMatch = await bcrypt.compare(password, userInDB.password)
    if (didMatch) {
      const jwtToken = jwt.sign({ _id: userInDB._id }, process.env.JWT_SECRET)
      const userInfo = {
        email: userInDB.email,
        fullName: userInDB.fullName,
        _id: userInDB._id
      }
      return res
        .status(200)
        .json({ result: { token: jwtToken, user: userInfo } })
    } else {
      return res.send(401).json({ error: "Invalid Credentials" })
    }
  } catch (err) {
    console.log("Login Error", err)
  }
})

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "One or more mandatory fields are empty" })
    }
    const userInDB = await User.findOne({ email })
    if (userInDB) {
      res.status(400).json({ error: "User already exist" })
    }
    const hashedPassword = await bcrypt.hash(password, 16)
    const user = new User({
      name,
      email,
      password: hashedPassword
    })
    await user.save()
    return res.status(201).json({ result: "User Created successfully" })
  } catch (err) {
    console.log(err)
  }
})

// checkout
app.post("/checkout", async (req, res) => {
  try {
    const { name, address, number, cart } = req.body
    const inCart = JSON.parse(cart)
    let line_items = []
    for (let item of inCart) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name
          },
          unit_amount: item.price * 100
        },
        quantity: item.quantity
      })
    }

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: "http://localhost:4242/success",
      cancel_url: "http://localhost:5173/cart"
    })

    res.redirect(303, session.url)
  } catch (error) {
    console.log(error)
  }
})

app.listen(process.env.PORT, () => {
  console.log("Listening on port 4000")
})
