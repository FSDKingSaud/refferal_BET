import React, { useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { IoMdClose, MdAdminPanelSettings } from "./ReactICON";
import { LOAD_TOKEN_ICO, tokenContract } from "../Context/constants";
const notifyError = (msg) => toast.error(msg, { duration: 2000 });
import { BUY_TOKEN, listenToEvents } from "../Context/index";

const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;
const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

const ICOSale = ({ setLoader, referralUserAddress }) => {
  const { address } = useAccount();
  const [tokenDetails, setTokenDetails] = useState();
  const [quentity, setQuentity] = useState(0);
  useEffect(() => {
    if (address) {
      const loadToken = async () => {
        const token = await LOAD_TOKEN_ICO();
        setTokenDetails(token);
        console.log(token);
      };
      loadToken();
    }
  }, [address]);

  // ============================testing code ==============================

  const getTokenBalance = async (address) => {
    try {
      // Get the contract instance
      const contractReader = await tokenContract();

      // Call balanceOf to get the balance for the provided address
      const balance = await contractReader.balanceOf(address);

      // Convert balance from BigNumber to a readable number (usually in the smallest unit)
      const formattedBalance = ethers.utils.formatUnits(balance, 18); // assuming 18 decimals for ERC-20
      console.log(`Balance of address ${address}: ${formattedBalance} tokens`);

      return formattedBalance; // Return the formatted balance
    } catch (error) {
      console.error("Error getting token balance:", error);
      return null; // In case of error, return null
    }
  };

  // ============================testing code ==============================


  const CALLING_FUNCTION_BUY_TOKEN = async (quentity) => {
    setLoader(true);
    console.log(quentity);

    // Get the user's token balance
    const userWalletTokens = await getTokenBalance(address);

    // Total pre-sale supply and 3% of it (30 tokens in this case)
    const preSaleTotalSupply = Number(tokenDetails?.tokenBal || 0) + Number(tokenDetails?.soldTokens || 0);  // Example: total supply of 1000 tokens
    const threePercentOfSupply = preSaleTotalSupply * 0.03; // 3% of total supply (30 tokens)

    console.log('3% of total supply:', threePercentOfSupply);
    console.log('User wallet balance:', userWalletTokens);

    // Convert userWalletTokens to a number (if needed, assuming it's a BigNumber)
    const userTokens = Number(userWalletTokens);
    console.log('userTokens', userTokens);

    // Calculate how many more tokens the user can purchase without exceeding 3% of the total supply
    const remainingTokensAllowed = threePercentOfSupply - userTokens;

    console.log('Remaining tokens user can purchase without exceeding 3%:', remainingTokensAllowed);

    // Check if the user is trying to purchase more than the allowed amount (i.e., more than 3% of total supply)
    if (quentity > remainingTokensAllowed) {
      console.log("User is trying to purchase more than the allowed amount.");
      setLoader(false);  // Stop the loader
      return notifyError(`You can only purchase up to ${remainingTokensAllowed} more tokens to stay below 3% of the total supply.`);
    }


    const receipt = referralUserAddress == null ? await BUY_TOKEN(quentity) : await BUY_TOKEN(quentity, referralUserAddress);
    if (receipt) {
      console.log(receipt);
      setLoader(false);
      window.location.reload();
    } else {
      setLoader(false);
    }


  };


  return (
    <div
      className="modal modal--auto fade"
      id="modal-deposit1"
      tabIndex={-1}
      aria-labelledby="modal-deposit1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal__content">
            <button
              className="modal__close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="ti ti-x">
                <IoMdClose />
              </i>
            </button>
            <h4 className="modal__title mt-3">
              {tokenDetails?.token.symbol} ICO Token
            </h4>
            <p className="modal__text">
              Participate in the <span>Ongoing ICO Token</span> Sale
            </p>

            <div className="modal__form">
              <div className="form__group">
                <label className="form__label">
                  ICO Supply:{" "}
                  {`${tokenDetails?.tokenBal} ${tokenDetails?.token.symbol} `}
                </label>
                <input
                  name="mail"
                  type="text"
                  className="form__input"
                  placeholder={`${tokenDetails?.token.symbol
                    }: ${tokenDetails?.token.balance.toString().slice(0, 12)}`}
                  onChange={(e) => setQuentity(e.target.value)}
                />
              </div>
              <div className="form__group">
                <label className="form__label">Output:</label>
                <input
                  name="mail"
                  type="text"
                  className="form__input"
                  placeholder={`${(Math.round(Number(tokenDetails?.tokenPrice) * quentity * 1000000) / 1000000).toFixed(6)} BNB`}
                  disabled
                />

                {/* <input
                  name="mail"
                  type="text"
                  className="form__input"
                  placeholder={`${
                    Number(tokenDetails?.tokenPrice) * quentity
                  } ${tokenDetails?.token.symbol}`}
                  disabled
                /> */}
              </div>
              <button
                className="form__btn"
                type="button"
                onClick={() => CALLING_FUNCTION_BUY_TOKEN(quentity)}
              >
                Buy BET
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICOSale;
