import React from "react";

const Footer = () => {
  return (
    <footer id="contact" className="iq-footer">
      <div className="footer-top iq-mtb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4 mb-lg-0">
              <div className="logo">
                <img
                  id="logo_img_2"
                  className="img-fluid"
                  src="/assets/images/footer-logo.png"
                  alt="Blockchain Energy Token"
                />
                <div className="text-white iq-mt-15">Blockchain Energy Token</div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-sm-12 mb-4 mb-lg-0 footer-menu">
              <h5 className="small-title iq-tw-5 text-white">Menu</h5>
              <ul className="iq-pl-0">
                <li><a href="#home">Home</a></li>
                <li><a href="#token">About Us</a></li>
                <li><a href="#features">Services</a></li>
                <li><a href="#roadmap">Faqs</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li>
                  <a href="/whitepaper" target="_blank" rel="noopener noreferrer">
                    Whitepaper
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 iq-contact mb-4 mb-lg-0">
              <h5 className="small-title iq-tw-5 text-white">Contact CoinEx</h5>
              <div className="iq-mb-30">
                <div className="blog">
                  <i className="fas fa-phone-alt"></i>
                  <div className="content">
                    <div className="title">Phone</div>
                    +020 3305 11104
                  </div>
                </div>
              </div>
              <div className="iq-mb-30">
                <div className="blog">
                  <i className="fas fa-envelope"></i>
                  <div className="content">
                    <div className="title">Mail</div>
                    Blockchainenergyltd@outlook.com
                  </div>
                </div>
              </div>
              <div className="blog">
                <i className="fas fa-map-marker-alt"></i>
                <div className="content">
                  <div className="title">Address</div>
                  20 Wenlock Road London N1 7ng
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mb-4 mb-lg-0">
              <div className="call-back">
                <h5 className="small-title iq-tw-5 text-white">Request a Call Back</h5>
                <form>
                  <div className="form-group iq-mb-20">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="form-group iq-mb-20">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPhone"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="form-group iq-mb-20">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputsubject"
                      placeholder="Subject"
                    />
                  </div>
                  <a className="button" href="javascript:void(0)">
                    Submit
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom iq-ptb-20">
        <div className="container">
          <div className="row">
            <div className="col-md-6 align-self-center">
              <div className="iq-copyright text-white">
                © Copyright{" "}
                <script>
                  document.write(new Date().getFullYear());
                </script>{" "}
                <a href="/">BET</a>
              </div>
            </div>
            <div className="col-md-6">
              <ul className="iq-media-blog">
                <li>
                  <a href="https://wa.me/message/R4R67QFCWJLJK1" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </li>
                <li>
                  <a href="https://x.com/BlockchainHello?t=AdVHPtnS5HaOKDyBHRI-cw&s=08" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/blockchainenergyltd/profilecard/?igsh=MWVpZHIwbG1tMWJ3ZA==" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://t.me/+vLcj22SyWvY2ZDg0" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-telegram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/blockchain-energy-drinks/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
