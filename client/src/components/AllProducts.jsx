import React, { useEffect, useState } from "react"
import Product from "./Product"
import Navbar from "./Navbar"
import axios from "axios"

function AllProducts() {
  // state variable
  const [items, setItems] = useState([])

  useEffect(() => {
    const productData = async () => {
      const result = await axios.get("http://localhost:4000/getProduct")
      setItems(result.data.result)
    }
    productData()
  }, [])
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

export default AllProducts
