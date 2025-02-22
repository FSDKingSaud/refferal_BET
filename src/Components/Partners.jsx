import React from "react";

const Partners = () => {
  const partners = [
    {
      name: "BNB Smart Chain",
      image: "img/partners/binance-smart-chain-logo.png",
      url: "https://bscscan.com/address/0x336DA67b2FE62432Bc9d79EC06EA0B4515B1d85b",
    },
    {
      name: "Pancake Swap",
      image: "img/partners/pancake-swap.png",
      url: "",
    },
    {
      name: "Coin Market Cap",
      image: "img/partners/coin-market.png",
      url: "",
    },
    {
      name: "Fintech Harbor",
      image: "img/partners/fintech.png",
      url: "https://www.fintecharbor.com/",
    },
  ];
  return (
    <section id="partners" className="section">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-8 offset-xl-2">
            <div className="section__title">
              <h2>Our partners</h2>
              <p>
                We take pride in collaborating with our partners who help us
                provide the best services to our clients. If you'd like to
                become our partner, please 
                <a href="#ask"> contact us.</a>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {partners.map((partner, index) => (
            <div key={index} className="col-6 col-lg-3">
              <a href={partner.url} target="_blank" className="partner">
                <img src={partner.image} alt="" className="px-3" />
                <p>{partner.name}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
