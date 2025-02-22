import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;

import { LOAD_TOKEN_ICO } from "../Context/constants";
import { TiTick } from "./ReactICON/index";
import { TiLink, TiUserAdd } from "react-icons/ti";
import { FaRegCopy } from "react-icons/fa";

const HeroSection = ({ poolDetails, addTokenToMetaMask }) => {
  const { address } = useAccount();
  const [percentage, setPercentage] = useState();
  const [tokenDetails, setTokenDetails] = useState();

  useEffect(() => {
    if (address) {
      const loadToken = async () => {
        const token = await LOAD_TOKEN_ICO();
        setTokenDetails(token);
      };
      loadToken();
    }
  }, [address]);

  useEffect(() => {
    const calculatePercentage = () => {
      const tokenSold = tokenDetails?.soldTokens ?? 0;
      const tokenTotalSupply =
        tokenDetails?.soldTokens + Number(tokenDetails?.tokenBal) * 1 ?? 1;

      const percentageNew = (tokenSold / tokenTotalSupply) * 100;

      if (tokenTotalSupply === 0) {
        console.error(
          "Token sale balance is zero, cannot calculate percentage."
        );
      } else {
        setPercentage(percentageNew);
      }
    };

    const timer = setTimeout(calculatePercentage, 1000);

    return () => clearTimeout(timer);
  }, [tokenDetails]);


  // new coundown
  const getInitialTimeLeft = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight - now) / 1000);
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };


  // copy referral link
  const [copied, setCopied] = useState(false);
  const referralLink = `http://localhost:3000/${address}`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero__video-container">
        {/* background Video */}
        <video
          className="hero__video"
          src="assets/videos/header-bg-compressed-1.mp4"
          type="video/mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero__overlay"></div>
      </div>


      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-7 col-xl-6">
            <div className="hero__content hero__content--first">
              <h1 className="hero__title">
                <strong>Blockchain Energy Token</strong> <br />
                <span style={{ fontSize: "0.6em" }}>Blockchain Powered Energy</span>
              </h1>

              <div className="hero__btns">
                <a
                  data-bs-target="#modal-deposit1"
                  type="button"
                  data-bs-toggle="modal"
                  className="button animated-button m-1"
                >
                  BUY {tokenDetails?.symbol || ""} Token
                </a>
                <a
                  onClick={() => addTokenToMetaMask()}
                  className="button bg-white text-dark"
                >
                  Add Token {tokenDetails?.symbol || ""}
                </a>
              </div>

              <h1 className="hero__title">
                <span style={{ fontSize: "0.6em" }}>
                  Powered By <br />
                  <img src="img/partners/bnb-chain-header-logo.png" className="img-fluid" style={{ maxWidth: '330px', height: 'auto' }} alt="Logo" />
                </span>
              </h1>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-5 col-xl-4 offset-xl-2">
            <div className="hero__content hero__content--second">
              <div className="node node--hero">
                <h3 className="node__title node__title--red">
                  <b>{tokenDetails?.symbol || ""}</b> Token ICO
                </h3>
                <span className="node__date">
                  {tokenDetails?.tokenPrice || ""} {CURRENCY}
                </span>
                <span className="node__price">
                  ICO Left:{" "}
                  <b>
                    {tokenDetails?.tokenBal || ""} {tokenDetails?.symbol || ""}
                  </b>
                </span>
                <span className="node__line">
                  <img src="img/dodgers/dots--line-red.svg" alt="" />
                </span>
                <ul className="node__list">
                  <li>
                    <i className="ti ">
                      <TiTick className="mb-3" />
                    </i>
                    Allow <b>3%</b> per wallet
                  </li>
                  <li>
                    <i className="ti mb-2">
                      <TiTick className="mb-3" />
                    </i>
                    <b>
                      {tokenDetails?.supply || ""} {tokenDetails?.symbol || ""}
                    </b>{" "}
                    total supply
                  </li>
                  <li>
                    <i className="ti mb-2">
                      <TiTick className="mb-3" />
                    </i>
                    <b>
                      {(Number(tokenDetails?.soldTokens || 0) * 0.025).toFixed(2)}{" "}
                    </b>{" "}
                    USDT invested
                  </li>


                  <li
                    onClick={handleCopy}
                    className="text-center mb-3 cursor-pointer"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="ti mb-2">
                      <TiTick className="mb-3" />
                    </i>

                    <div className={copied ? 'text-warning fw-bold' : ''}>
                      {copied ? 'Link Copied!' : 'Your Referral Link'}
                      <b style={{ fontSize: '18px' }} className="ms-2 mb-3">
                        <FaRegCopy />
                      </b>
                    </div>
                  </li>
                </ul>

                <div className="progressbar progressbar--cta">
                  <h3 className="progressbar__title">
                    ICO Sale: {tokenDetails?.soldTokens || ""}{" "}
                    {tokenDetails?.symbol || ""}
                  </h3>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Animated striped"
                    aria-valuenow={75}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      style={{ width: `${percentage || ""}%` }}
                    >
                      <span>{tokenDetails?.soldTokens || ""}</span>
                    </div>
                  </div>
                  <div className="progressbar__values">
                    <span className="progressbar__value progressbar__value--left"></span>
                    <span className="progressbar__value progressbar__value--right">
                      {Number(tokenDetails?.tokenBal || 0) +
                        Number(tokenDetails?.soldTokens || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default HeroSection;
