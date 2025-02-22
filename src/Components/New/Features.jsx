import { useEffect } from "react";
import Image from "next/image";
import { FaBolt, FaGift, FaShieldAlt, FaShoppingCart, FaUsers, FaWallet } from "react-icons/fa";

const Features = () => {
  useEffect(() => {
    const featuresSection = document.querySelector('.custom-features-above');
    const leftColumn = document.querySelector('.custom-feature-animate-left');
    const topColumn = document.querySelector('.custom-feature-animate-top');
    const rightColumn = document.querySelector('.custom-feature-animate-right');

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (featuresSection) observer.observe(featuresSection);
    if (leftColumn) observer.observe(leftColumn);
    if (topColumn) observer.observe(topColumn);
    if (rightColumn) observer.observe(rightColumn);

    return () => {
      if (featuresSection) observer.unobserve(featuresSection);
      if (leftColumn) observer.unobserve(leftColumn);
      if (topColumn) observer.unobserve(topColumn);
      if (rightColumn) observer.unobserve(rightColumn);
    };
  }, []);

  return (
    <section id="features" className="overview-block-pt iq-great-features2 iq-hide custom-features-above">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="heading-title text-center">
              <h2 className="title">Our Great Features</h2>
              <p>
              Blockchain Energy Token blends physical vitality with digital rewards. Every can powers you up
                and rewards you with Blockchain Energy Tokens (BETs).
              </p>
            </div>
          </div>
        </div>
        <div className="row iq-mt-40">
          <div className="col-lg-4 col-md-6 col-sm-12 right-side custom-feature-animate-left">
            {/* Feature 1: Energy & Innovation */}
            <div className="iq-feature1 iq-pt-60">
              <div className="left brd">
                <i className="brd"><FaBolt /></i>
              </div>
              <div className="right">
                <h5 className="iq-mb-10">Energy & Innovation</h5>
                <p>
                  Boost your energy while earning Blockchain Energy Tokens (BETs), merging physical and
                  digital power.
                </p>
              </div>
            </div>
            {/* Feature 2: Token Redemption */}
            <div className="iq-feature1 iq-pt-60">
              <div className="left brd">
                <i className="brd"><FaShoppingCart /></i>
              </div>
              <div className="right">
                <h5 className="iq-mb-10">Token Redemption</h5>
                <p>
                  Redeem BETs for exclusive rewards, including merchandise and early access to new
                  products.
                </p>
              </div>
            </div>
            {/* Feature 3: Secure & Safe */}
            <div className="iq-feature1 iq-pt-60">
              <div className="left brd">
                <i className="brd"><FaShieldAlt /></i>
              </div>
              <div className="right">
                <h5 className="iq-mb-10">Secure & Safe</h5>
                <p>
                  Your BETs are securely stored in our blockchain, ensuring safe and transparent
                  transactions.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12 col-sm-12 d-mobile-none custom-feature-animate-top">
            <Image
              alt="Feature Image"
              src="/assets/images/file-8dGM2uvZ2kdv87rCTmBQv3__3_-removebg-preview.png"
              width={500} 
              height={500}
              className="img-fluid mx-auto d-block"
            />
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12 custom-feature-animate-right">
            {/* Feature 4: Blockchain Wallet */}
            <div className="iq-feature1 iq-pt-60">
              <div className="left brd">
                <i className="brd"><FaWallet /></i>
              </div>
              <div className="right">
                <h5 className="iq-mb-10">Blockchain Wallet</h5>
                <p>Track and manage your BETs easily with our app for a smooth experience.</p>
              </div>
            </div>
            {/* Feature 5: Community Rewards */}
            <div className="iq-feature1 iq-pt-60">
              <div className="left brd">
                <i className="brd"><FaUsers /></i>
              </div>
              <div className="right">
                <h5 className="iq-mb-10">Community Rewards</h5>
                <p>
                  Engage with the community to earn more BETs. The more you participate, the more
                  rewards you receive.
                </p>
              </div>
            </div>
            {/* Feature 6: Bonus Rewards */}
            <div className="iq-feature1 iq-pt-60">
              <div className="left brd">
                <i className="brd"><FaGift /></i>
              </div>
              <div className="right">
                <h5 className="iq-mb-10">Bonus Rewards</h5>
                <p>Earn extra BETs and perks through early participation or special promotions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
