import React, { useEffect, useRef } from "react";

const Roadmap = () => {
  const roadmapTopRef = useRef(null);
  const roadmapItemsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    };

    const observerTop = new IntersectionObserver(observerCallback, observerOptions);
    if (roadmapTopRef.current) {
      observerTop.observe(roadmapTopRef.current);
    }

    const observerItems = new IntersectionObserver(observerCallback, observerOptions);
    roadmapItemsRef.current.forEach((item) => observerItems.observe(item));

    return () => {
      if (roadmapTopRef.current) {
        observerTop.unobserve(roadmapTopRef.current);
      }
      roadmapItemsRef.current.forEach((item) => observerItems.unobserve(item));
    };
  }, []);

  return (
    <section id="roadmap" className="iq-timeline-1 overview-block-ptb text-white iq-bg-fixed">
      <div className="container">
        <div className="row">
          <div className="col-sm-12" ref={roadmapTopRef}>
            <div className="heading-title">
              <small className="iq-font-green">PROCESS</small>
              <h2 className="title">Blockchain Energy Token Roadmap</h2>
              <p>
                Our roadmap outlines the key milestones in the development of Blockchain Energy Token and the
                Blockchain Energy Token (BET). Join us on our journey as we bridge the gap between
                physical energy and digital wealth.
              </p>
            </div>
          </div>

          <div className="col-md-12">
            <div className="timeline-1">
              {/* Phase 1 */}
              <div className="timeline-t custom-roadmap-animate-left" ref={(el) => (roadmapItemsRef.current[0] = el)}>
                <span className="timeline-icon"></span>
                <span className="year">Completed</span>
                <div className="timeline-content">
                  <h5 className="text-white iq-tw-5">Phase 1</h5>
                  <span className="iq-font-yellow">Concept & Foundation</span>
                  <p className="iq-mt-10">
                    In Phase 1, Our roadmap includes building our brand and logo, developing initial flavors,
                    setting up blockchain infrastructure, securing partnerships, and finalizing legal preparations
                    for the token launch.
                  </p>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="timeline-t custom-roadmap-animate-right" ref={(el) => (roadmapItemsRef.current[1] = el)}>
                <span className="timeline-icon"></span>
                <span className="year" style={{color:"#F9B707"}}>Ongoing</span>
                <div className="timeline-content">
                  <h5 className="text-white iq-tw-5">Phase 2</h5>
                  <span className="iq-font-yellow">Presale & Token Launch</span>
                  <p className="iq-mt-10">
                    Phase 2 focuses on raising $20M USDT through a presale to fund production, liquidity, and
                    marketing. Key efforts include engaging the community, initiating exclusive token sales for early
                    investors, launching marketing and influencer campaigns, forming strategic blockchain partnerships,
                    and onboarding presale investors.
                  </p>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="timeline-t custom-roadmap-animate-left" ref={(el) => (roadmapItemsRef.current[2] = el)}>
                <span className="timeline-icon"></span>
                <span className="year">Up coming</span>
                <div className="timeline-content">
                  <h5 className="text-white iq-tw-5">Phase 3</h5>
                  <span className="iq-font-yellow">Product Manufacturing & Global Distribution</span>
                  <p className="iq-mt-10">
                    Phase 3 focuses on mass-producing Blockchain Energy drinks, distributing them globally through
                    online stores and retail outlets, and securing efficient logistics channels. Strategic retail
                    partnerships will ensure widespread availability and visibility.
                  </p>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="timeline-t custom-roadmap-animate-right" ref={(el) => (roadmapItemsRef.current[3] = el)}>
                <span className="timeline-icon"></span>
                <span className="year">After Launch</span>
                <div className="timeline-content">
                  <h5 className="text-white iq-tw-5">Phase 4</h5>
                  <span className="iq-font-yellow">Blockchain Energy Token Ecosystem Development</span>
                  <p className="iq-mt-10">
                    The Blockchain Energy Token Ecosystem includes a mobile app for token management, reward claiming, and
                    staking. New flavors, updated blockchain-integrated packaging, and community engagement through
                    giveaways will drive growth and customer loyalty.
                  </p>
                </div>
              </div>

              {/* Phase 5 */}
              <div className="timeline-t custom-roadmap-animate-left" ref={(el) => (roadmapItemsRef.current[4] = el)}>
                <span className="timeline-icon"></span>
                <span className="year">Future</span>
                <div className="timeline-content">
                  <h5 className="text-white iq-tw-5">Phase 5</h5>
                  <span className="iq-font-yellow">Staking & Token Growth</span>
                  <p className="iq-mt-10">
                    Phase 5 focuses on introducing staking features, allowing users to lock BET tokens for increased
                    rewards and passive income. Staking pools with varying terms will encourage long-term holding,
                    boosting token value, circulation, and ecosystem participation while offering additional rewards
                    through energy drinks.
                  </p>
                </div>
              </div>

              {/* Phase 6 */}
              <div className="timeline-t custom-roadmap-animate-right" ref={(el) => (roadmapItemsRef.current[5] = el)}>
                <span className="timeline-icon"></span>
                <span className="year">Future</span>
                <div className="timeline-content">
                  <h5 className="text-white iq-tw-5">Phase 6</h5>
                  <span className="iq-font-yellow">NFT Integration & Exclusive Digital Assets</span>
                  <p className="iq-mt-10">
                    Phase 6 introduces an NFT marketplace within the Blockchain Energy Token ecosystem, offering
                    limited-edition digital collectibles and rewards. NFTs will provide exclusive benefits like early
                    product access, special offers, and VIP membership, enhancing user experience, engagement, and
                    loyalty.
                  </p>
                </div>
              </div>

              {/* Phase 7 */}
              <div className="timeline-t custom-roadmap-animate-left" ref={(el) => (roadmapItemsRef.current[6] = el)}>
                <span className="timeline-icon"></span>
                <span className="year">Post-Presale</span>
                <div className="timeline-content">
                  <h5 className="text-white iq-tw-5">Phase 7</h5>
                  <span className="iq-font-yellow">Product Manufacturing & Global Distribution</span>
                  <p className="iq-mt-10">
                    The final phase expands Blockchain Energy Token’s global reach, with localized products and marketing,
                    alongside community events to engage users. This will solidify the brand’s global presence and foster
                    a decentralized community driving ongoing success and innovation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
