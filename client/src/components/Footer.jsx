import "../styles/Footer.css"

function Footer() {
  return (
    <div>
      <footer className="container-fluid py-4 bg-black">
        <div className="container">
          <div className="row text-center border-bottom border-2 border-secondary pb-4">
            <div className="col-md-3 d-flex flex-column">
              <a href="Men/menProducts.html" className="fs-4">
                Men
              </a>
              <a href="Men/shirt.html">Shirts</a>
              <a href="Men/menPant.html">Pants</a>
              <a href="Men/Hoodie.html">Hoodies</a>
            </div>
            <div className="col-md-3 d-flex flex-column">
              <a href="Women/womenProducts.html" className="fs-4">
                Women
              </a>
              <a href="Women/dress.html">Dresses</a>
              <a href="Women/womenPant.html">Pants</a>
              <a href="Women/skirts.html">Skirts</a>
            </div>
            <div className="col-md-3 d-flex flex-column">
              <a href="kids.html" className="fs-4">
                Kids
              </a>
            </div>
            <div className="col-md-3 d-flex flex-column">
              <a className="fs-4">Links</a>
              <a href="index.html">Home</a>
              <a href="login.html">Login</a>
              <a href="contact.html">Contact</a>
            </div>
          </div>
          <div className="row text-center">
            <div className="col text-white pt-2">&copy;2023</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
