import Header from "./Header"
import Footer from "./Footer"
import HomeCover from "./HomeCover"
import Slider from "./Slider"

import React, { useState } from "react"

function Home() {
  const [phrase, setPhrase] = useState("")
  return (
    <>
      <Header phrase={phrase} setPhrase={setPhrase} />
      <HomeCover />
      <Slider phrase={phrase} />
      <Footer />
    </>
  )
}

export default Home
