import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Product from "./Product"
import Navbar from "./Navbar"
import axios from "axios"

function CategoryProduct() {
  const { subCategory } = useParams()
  // state variable
  const [items, setItems] = useState([])

  useEffect(() => {
    const productData = async () => {
      const result = await axios.get(`http://localhost:4000/in/${subCategory}`)
      console.log(subCategory)
      setItems(result.data.details)
    }
    productData()
  }, [subCategory])
  return (
    <div>
      <Navbar />
      <div className=" mt-3">
        <div className="row row-gap-4  ">
          {items.map((item) => {
            return (
              <div
                key={item._id}
                className=" d-flex justify-content-center col col-md-4 col-sm-6"
              >
                <Product {...item} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
