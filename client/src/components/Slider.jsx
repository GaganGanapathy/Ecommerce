import React, { useEffect, useState } from "react"
import axios from "axios"
import Product from "./Product"
import "../styles/slider.css"

function Slider({ phrase }) {
  // state variable
  const [productsInfo, setProductsInfo] = useState([])

  useEffect(() => {
    const productDetaiils = async () => {
      const products = await axios.get("http://localhost:4000/getProduct")
      setProductsInfo(products.data.result)
    }
    productDetaiils()
  }, [])

  const categoryName = [...new Set(productsInfo.map((p) => p.category))] //['men','women','kids']

  let products
  if (phrase) {
    products = productsInfo.filter((products) =>
      products.name.toLowerCase().includes(phrase)
    )
  } else {
    products = productsInfo
  }

  return (
    <div>
      {categoryName.map((category) => (
        <div key={category}>
          {products.find((product) => product.category === category) && (
            <div>
              <h2 className="text-capitalize">{category}</h2>
              <div className="container-fluid mx-2">
                <div className="d-flex overflow-x-auto" id="scroll">
                  {products
                    .filter((product) => product.category === category)
                    .map((product) => (
                      <div
                        className="col d-flex flex-grow-0 mb-3 mt-2"
                        key={product._id}
                      >
                        <Product {...product} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Slider
