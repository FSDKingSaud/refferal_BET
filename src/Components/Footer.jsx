import React from "react";

import { IoCloudDownload } from "react-icons/io5";

import {
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialLinkedin,
} from "./ReactICON/index";

import { FaInstagram, FaWhatsapp, FaTelegram, FaTimes, FaDiscord } from "react-icons/fa";

const Footer = () => {
  const social = [
    {
      link: "https://wa.me/message/R4R67QFCWJLJK1",
      icon: <FaWhatsapp />,
    },
    {
      link: "https://t.me/+vLcj22SyWvY2ZDg0",
      icon: <FaTelegram />,
    },
    {
      link: "https://www.instagram.com/blockchainenergyltd/profilecard/?igsh=MWVpZHIwbG1tMWJ3ZA==",
      icon: <FaInstagram />,
    },
    {
      link: "https://x.com/BlockchainHello?t=Mdf65kcqcHnj5sfdT3Fvvw&s=09",
      icon: <FaTimes />,
    },
    {
      link: "https://www.linkedin.com/company/blockchain-energy-drinks/",
      icon: <TiSocialLinkedin />,
    },
    {
      link: "https://discord.gg/vzkGp8z5",
      icon: <FaDiscord />,
    },
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 mt-4">
            <div className="footer__logo">
              <img src="assets/images/logo.png" alt="" />
            </div>

            <div class="footer__tagline">
              <div class="contact-info">
                <strong>Email :</strong> <a href="mailto:Blockchainenergyltd@outlook.com">Blockchainenergyltd@outlook.com</a> <br />

                <strong>Contact: </strong>
                <a href="tel:+4420330511104"> 0203 305 11104</a> <br />

                <strong>Address: </strong>
                <span>20 Wenlock road London N1 7GU4</span>

              </div>
            </div>
          </div>

          <div className="col-12 col-md-8 mt-4">
            <div className="footer__widget text-center text-lg-end">
              <div className="row justify-content-center justify-content-lg-end">
                {/* White Paper Link */}
                <div className="col-12 col-md-4 mb-3">
                  <a
                    href="assets/whitepaper.pdf"
                    className="footer__document-item d-flex flex-column align-items-center justify-content-center p-3 bg-dark border border-dark rounded-3 text-decoration-none"
                    download="whitepaper.pdf"
                  >
                    <div className="icon mb-2">
                      <img src="icon/pdf.svg" alt="PDF Icon" />
                    </div>
                    <span className="title text-warning d-flex align-items-center gap-2">
                      <IoCloudDownload />
                      White Paper
                    </span>
                  </a>
                </div>

                {/* Privacy Policy Link */}
                <div className="col-12 col-md-4 mb-3">
                  <a
                    href="/privacy-policy"
                    className="footer__document-item d-flex flex-column align-items-center justify-content-center p-3 bg-dark border border-dark rounded-3 text-decoration-none"
                  >
                    <div className="icon mb-2">
                      <img src="icon/pdf.svg" alt="PDF Icon" />
                    </div>
                    <span className="title text-warning d-flex align-items-center gap-2">
                      <IoCloudDownload />
                      Privacy Policy
                    </span>
                  </a>
                </div>

                {/* Terms of Sale Link */}
                <div className="col-12 col-md-4 mb-3">
                  <a
                    href="/terms-&-conditions"
                    className="footer__document-item d-flex flex-column align-items-center justify-content-center p-3 bg-dark border border-dark rounded-3 text-decoration-none"
                  >
                    <div className="icon mb-2">
                      <img src="icon/pdf.svg" alt="PDF Icon" />
                    </div>
                    <span className="title text-warning d-flex align-items-center gap-2">
                      <IoCloudDownload />
                      Terms & Conditions
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="footer__content">
              <div className="footer__social">
                {social.map((social, index) => (
                  <a key={index} href={social.link} target="_blank">
                    <i className="ti ti-brand-facebook">{social.icon}</i>
                  </a>
                ))}
              </div>

              <small className="footer__copyright">
                © Centure, 2024.&nbsp;
                <a
                  href=""
                >
                  Blockchain Energy Token
                </a>
                .
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
