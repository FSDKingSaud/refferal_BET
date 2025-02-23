import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { MdGeneratingTokens } from "../Components/ReactICON/index";

const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

const Header = ({ page, referralAddressHeader }) => {
  const [tokenBalComp, setTokenBalComp] = useState();
 
  const deeplinkMetamask = referralAddressHeader == null
    ? 'http://metamask.app.link/dapp/refferal-bet.vercel.app/'
    : `http://metamask.app.link/dapp/refferal-bet.vercel.app/${referralAddressHeader}`;

  const navigation = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "Tokenomics",
      link: "#tokenomics",
    },
    {
      name: "Roadmap",
      link: "#roadmap",
    },
    {
      name: "Purchase History",
      link: "/purchase-history",
    },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="header__content">
              <button
                className="header__btn"
                type="button"
                aria-label="header__nav"
              >
                <span />
                <span />
                <span />
              </button>

              <a href="/" className="header__logo">
                <img src="assets/images/logo.png" alt="img" />
              </a>

              <span className="header__tagline">Blockchain Energy</span>

              <ul className="header__nav" id="header__nav">
                {navigation.map((item, index) => (
                  <li key={index}>
                    <a
                      href={page == "admin" ? "/" : `${item.link}`}
                      target={item.name === "Whitepaper" ? "_blank" : "_self"}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              {typeof window !== "undefined" && window.ethereum ? (
                <ConnectButton />
              ) : (
                <a href={deeplinkMetamask} className="btn btn-primary">
                  Connect Wallet
                </a>
              )}

              <a href="https://blockchain-energy.dowhf.com/white-paper"
                style={{
                  marginLeft: "10px",
                }}
                class="button p-3"
                target="_blank"
              >
                <i class="ti ti-user-circle">
                  <MdGeneratingTokens />
                </i>
                <span>Whitepaper</span>
              </a>

              {/* <a
                style={{
                  marginLeft: "10px",
                }}
                data-bs-target="#modal-deposit1"
                type="button"
                data-bs-toggle="modal"
                class="button p-3"
              >
                <i class="ti ti-user-circle">
                  <MdGeneratingTokens />
                </i>
                <span>Token ICO</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
