import React from "react"
import "../styles/Home.css"

function HomeCover() {
  return (
    <div>
      <div
        id="section_one"
        className="text-center d-flex flex-column justify-content-center mb-2"
      >
        <p className="text-white">Ecommerce</p>
        <p style={{ fontFamily: "sans-serif" }} className="text-white">
          Clothes that talk on behalf of you. Something for every occassion.
        </p>
      </div>
    </div>
  )
}

export default HomeCover
