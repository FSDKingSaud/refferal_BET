import { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("March 1 2025 00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      if (timeLeft <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(timer);
  }, []);

  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.querySelectorAll('.animated-button').forEach(button => {
        if (!button.querySelector('.cursor-hand')) {
          const hand = document.createElement('i');
          hand.classList.add('fas', 'fa-hand-pointer', 'cursor-hand');
          button.appendChild(hand);
        }

        for (let i = 0; i < 3; i++) {
          const wave = document.createElement('div');
          wave.classList.add('wave');
          button.appendChild(wave);
        }
      });
    }
  }, [buttonRef]);

  return (
    <div id="home" className="iq-banner-2">
      <video className="background-video" autoPlay muted loop>
        <source src="/assets/videos/header-bg-compressed-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div id="particles-js" className="body-bg">
        <canvas
          className="particles-js-canvas-el"
          width="1903"
          height="947"
          style={{ width: "100%", height: "100%" }}
        ></canvas>
      </div>
      <div className="banner-info">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-lg-12">
              <div className="banner-text text-center text-white">
                <h1 className="text-white iq-tw-7 iq-mb-20">
                  Powering the Future with <br />
                  <b className="iq-font-yellow">BET</b>
                </h1>
                <p className="iq-font-white iq-mb-20">
                  Blockchain Energy Token combines energy drinks with blockchain rewards. Each can not only
                  boosts your energy but also rewards you with Blockchain Energy Tokens (BET) for
                  every sip, bringing you closer to exciting rewards and a brighter future.
                </p>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <div className="iq-countdown">
                <h5 className="text-white">Launching Soon!</h5>
                <ul id="countdown" className="countdown">
                  <li className="border-white">
                    <span className="days">{countdown.days}</span>
                    <p className="days_text">Days</p>
                  </li>
                  <li className="border-white">
                    <span className="hours">{countdown.hours}</span>
                    <p className="hours_text">Hours</p>
                  </li>
                  <li className="border-white">
                    <span className="minutes">{countdown.minutes}</span>
                    <p className="minutes_text">Minutes</p>
                  </li>
                  <li className="border-white">
                    <span className="seconds">{countdown.seconds}</span>
                    <p className="seconds_text">Seconds</p>
                  </li>
                </ul>

                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a href="javascript:void(0)">
                      <i className="fa-brands fa-cc-visa"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="javascript:void(0)">
                      <i className="fa-brands fa-paypal"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="javascript:void(0)">
                      <i className="fa-brands fa-bitcoin"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="javascript:void(0)">
                      <i className="fa-solid fa-credit-card"></i>
                    </a>
                  </li>
                </ul>
                <a ref={buttonRef} className="button animated-button iq-mt-20 iq-ml-10">
                  Buy Tokens
                </a>
                <a
                  href="/whitepaper/bet-whitepaper-v1.pdf"
                  className="button bt-white iq-mt-20 iq-ml-10"
                  download
                >
                  Download White Paper
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
