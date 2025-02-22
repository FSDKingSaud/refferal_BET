"use client";
import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Blockchain Energy Token?",
      answer:
        "Blockchain Energy Token is a unique energy drink that not only revitalizes you physically but also empowers you digitally. By integrating blockchain technology, each can of Blockchain Energy Token is linked to Blockchain Energy Tokens (BETs) Ltd, offering consumers both vitality and a pathway to digital wealth.",
    },
    {
      question: "What are Blockchain Energy Tokens (BET)?",
      answer:
        "Blockchain Energy Tokens (BETs) are the digital tokens tied to every Blockchain Energy drink. These tokens are awarded to consumers who purchase the product, and they can be redeemed for rewards, used in the Blockchain Energy Token ecosystem, or traded on supported platforms.",
    },
    {
      question: "How can I earn BETs?",
      answer:
        "You earn Blockchain Energy Tokens (BETs) by purchasing Blockchain Energy drinks. Each can contains a certain amount of BETs, which can be redeemed for rewards or used within the ecosystem. Stay tuned for upcoming promotions and events where you can earn more BETs.",
    },
    {
      question: "What is the future of Blockchain Energy Token?",
      answer:
        "The future of Blockchain Energy Token involves expanding our product line, increasing the utility of BET tokens, forming new strategic partnerships, and growing the ecosystem. We plan to introduce staking, governance features, and even NFTs tied to special edition drinks in future phases.",
    },
  ];

  useEffect(() => {
    const faqItems = document.querySelectorAll('.custom-animate-faq-left, .custom-animate-faq-right');
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
    faqItems.forEach(item => observer.observe(item));
    return () => {
      faqItems.forEach(item => observer.unobserve(item));
    };
  }, []);

  return (
    <section id="iq-faq" className="iq-anything overview-block-pt light-bg">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="heading-title custom-animate-faq-top">
              <small className="iq-font-green">Ask Anything</small>
              <h2 className="title">Frequently Asked Questions</h2>
              <p>
                Here are the answers to some of the most frequently asked questions about Blockchain Energy Token and
                Blockchain Energy Tokens (BET). If you need more information, feel free to reach out to us!
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 r9-mt-40">
            <div className="iq-accordion">
              {faqData.map((faq, index) => (
                <div key={index} className={`iq-ad-block custom-animate-faq-${index % 2 === 0 ? "left" : "right"}`}>
                  <a
                    href="javascript:void(0)"
                    className="ad-title"
                    onClick={() => toggleAnswer(index)}
                  >
                    {faq.question}
                    <span className="toggle-icon">
                      {activeIndex === index ? <FaMinus /> : <FaPlus />}
                    </span>
                  </a>
                  <div className="ad-details" style={{ display: activeIndex === index ? "block" : "none" }}>
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
