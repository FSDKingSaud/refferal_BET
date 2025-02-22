import { BigNumber, ethers } from "ethers";
import toast from "react-hot-toast";
import {
  contract as icoContract,
  tokenContract,
  ERC20,
  toEth,
  TOKEN_ICO_CONTRACT,
} from "./constants";
import { values } from "lodash";
import TokenICO from "./TokenICO.json";

const STAKING_DAPP_ADDRESS = process.env.NEXT_PUBLIC_STAKING_DAPP;
const DEPOSIT_TOKEN = process.env.NEXT_PUBLIC_DEPOSIT_TOKEN;
const REWARD_TOKEN = process.env.NEXT_PUBLIC_REWARD_TOKEN;
const TOKEN_LOGO = process.env.NEXT_PUBLIC_TOKEN_LOGO;

const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
const notifyError = (msg) => toast.error(msg, { duration: 2000 });

function CONVERT_TIMESTAMP_TO_READABLE(timeStamp) {
  const date = new Date(timeStamp * 1000);

  const readableTime = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return readableTime;
}

function toWei(amount) {
  const toWei = ethers.utils.parseUnits(amount.toString());
  return toWei.toString();
}

function parseErrorMsg(e) {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message;
}

export const SHORTEN_ADDRESS = (address) =>
  `${address?.slice(0, 8)}...${address?.slice(address.length - 4)}`;

export const copyAddress = (text) => {
  navigator.clipboard.writeText(text);
  notifySuccess(" Copied successfully");
};


// ==================== purchase token event ======================
// Replace with your RPC URL
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/bsc");
const contractAddress = "0xEdd149afff9c17855feA12a4a1c553e5DE6bE56d";
const contract = new ethers.Contract(contractAddress, TokenICO.abi, provider);

export async function getPurchaseHistory() {
  const filter = contract.filters.Purchase();
  const events = await contract.queryFilter(filter, 0, "latest");

  // Format events with necessary details
  const eventData = events.map((event) => {
    const userAddress = event.args[0]; // Assuming userAddress is the first argument
    const tokenAmount = ethers.utils.formatUnits(event.args[1], 4); // Assuming tokenAmount is the second argument
    const transactionHash = event.transactionHash;
    const blockTimestamp = event.blockNumber;

    return {
      userAddress,
      tokenAmount: parseFloat(tokenAmount),
      transactionHash,
      blockTimestamp,
    };
  });

  // Return detailed event data
  return eventData;
}


export async function getPurchaseEvents() {
  const filter = contract.filters.Purchase();
  const events = await contract.queryFilter(filter, 0, "latest");

  // Group and aggregate events by userAddress
  const userTokenMap = {};

  events.forEach((event) => {
    const userAddress = event.args[0];  // Assuming userAddress is the first argument in the event
    const tokenAmount = ethers.utils.formatUnits(event.args[1], 4); // Assuming tokenAmount is the second argument
    const transactionHash = event.transactionHash;

    if (userTokenMap[userAddress]) {
      // Aggregate the token amount and keep the latest transaction details
      userTokenMap[userAddress].totalTokenAmount += parseFloat(tokenAmount);
      userTokenMap[userAddress].transactionHash = transactionHash;
    } else {
      // Initialize a new entry for a new userAddress
      userTokenMap[userAddress] = {
        totalTokenAmount: parseFloat(tokenAmount),
        transactionHash: transactionHash
      };
    }
  });

  // Convert the object to an array and sort by total tokenAmount in descending order
  const sortedUserData = Object.keys(userTokenMap)
    .map((userAddress) => {
      const user = userTokenMap[userAddress];
      return {
        userAddress,
        totalTokenAmount: user.totalTokenAmount,
        transactionHash: user.transactionHash
      };
    })
    .sort((a, b) => b.totalTokenAmount - a.totalTokenAmount);  // Sort descending by tokenAmount

  return sortedUserData;
}



// ==================== purchase token event ======================





export async function CONTRACT_DATA(address) {
  try {
    const contractObj = await icoContract();
    const stakingTokenObj = await tokenContract();

    if (address) {
      const contractOwner = await contractObj.owner();
      const contractAddress = await contractObj.address;

      //NOTIFICATION
      const notifications = await contractObj.getNotifications();

      const _notificationsArray = await Promise.all(
        notifications.map(
          async ({ poolID, amount, user, typeOf, timestamp }) => {
            return {
              poolID: poolID.toNumber(),
              amount: toEth(amount),
              user: user,
              typeOf: typeOf,
              timestamp: CONVERT_TIMESTAMP_TO_READABLE(timestamp),
            };
          }
        )
      );

      let poolInfoArray = [];
      const poolLenght = await contractObj.poolCount();
      const length = poolLenght.toNumber();

      for (let i = 0; i < length; i++) {
        const poolInfo = await contractObj.poolInfo(i);

        const userInfo = await contractObj.userInfo(i, address);
        const userReward = await contractObj.pendingReward(i, address);
        const tokenPoolInfoA = await ERC20(poolInfo.depositToken, address);
        const tokenPoolInfoB = await ERC20(poolInfo.rewardToken, address);

        const pool = {
          depositTokenAddress: poolInfo.depositToken,
          rewardTokenAddress: poolInfo.rewardToken,
          depositToken: tokenPoolInfoA,
          rewardToken: tokenPoolInfoB,
          depositedAmount: toEth(poolInfo.depositedAmount.toString()),
          apy: poolInfo.apy.toString(),
          lockDays: poolInfo.lockDays.toString(),
          //USER
          amount: toEth(userInfo.amount.toString()),
          userReward: toEth(userReward),
          lockUntil: CONVERT_TIMESTAMP_TO_READABLE(
            userInfo.lockUntil.toNumber()
          ),
          lastRewardAt: toEth(userInfo.lastRewardAt.toString()),
        };

        poolInfoArray.push(pool);
      }

      const totalDepositAmount = poolInfoArray.reduce((total, pool) => {
        return total + parseFloat(pool.depositedAmount);
      }, 0);

      const rewardToken = await ERC20(REWARD_TOKEN, address);
      const depositToken = await ERC20(DEPOSIT_TOKEN, address);

      const data = {
        contractOwner: contractOwner,
        contractAddress: contractAddress,
        notifications: _notificationsArray.reverse(),
        rewardToken: rewardToken,
        depositToken: depositToken,
        poolInfoArray: poolInfoArray,
        totalDepositAmount: totalDepositAmount,
        contractTokenBalance:
          depositToken.contractTokenBalance - totalDepositAmount,
      };

      return data;
    }
  } catch (e) {
    console.log(e);
    console.log(parseErrorMsg(e));
    return parseErrorMsg(e);
  }
}

export async function deposit(poolID, amount, address) {
  try {
    notifySuccess("calling contract...");
    const contractObj = await icoContract();
    const stakingTokenObj = await tokenContract();
    console.log(poolID, amount);
    // Convert amount to Wei (assuming 18 decimal places, adjust if needed)
    const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);

    // Check current allowance
    const currentAllowance = await stakingTokenObj.allowance(
      address,
      contractObj.address
    );

    console.log(`Current Allowance: ${currentAllowance.toString()}`);

    // If the current allowance is less than the amount to be staked, prompt the user to approve
    if (currentAllowance.lt(amountInWei)) {
      notifySuccess("Approving token...");
      const approveTx = await stakingTokenObj.approve(
        contractObj.address,
        amountInWei
      );
      await approveTx.wait();
      console.log(`Approved ${amountInWei.toString()} tokens for staking`);
    }
    const gasEstimation = await contractObj.estimateGas.deposit(
      Number(poolID),
      amountInWei
    );

    // Proceed with staking
    notifySuccess("Staking token..");
    const stakeTx = await contractObj.deposit(poolID, amountInWei, {
      gasLimit: gasEstimation,
    });
    console.log(stakeTx);

    const receipt = await stakeTx.wait();
    notifySuccess("Token stake successfully");
    return receipt;
  } catch (e) {
    console.log(e);
    const errorMsg = parseErrorMsg(e);
    notifyError(errorMsg);
  }
}

export async function transferToken(amount, transferAddress) {
  try {
    notifySuccess("calling contract token...");

    const stakingTokenObj = await tokenContract();
    console.log(stakingTokenObj);

    const transferAmount = ethers.utils.parseEther(amount);

    const approveTx = await stakingTokenObj.transfer(
      transferAddress,
      transferAmount
    );
    await approveTx.wait();
    notifySuccess("Token stake successfully");
    return approveTx;
  } catch (e) {
    console.log(e);
    const errorMsg = parseErrorMsg(e);
    notifyError(errorMsg);
  }
}

export async function withdraw(poolID, amount) {
  console.log(poolID, amount);
  try {
    notifySuccess("calling contract...");
    // Convert amount to Wei (assuming 18 decimal places, adjust if needed)
    const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);

    const contractObj = await icoContract();

    const gasEstimation = await contractObj.estimateGas.withdraw(
      Number(poolID),
      amountInWei
    );
    const data = await contractObj.withdraw(Number(poolID), amountInWei, {
      gasLimit: gasEstimation,
    });

    const receipt = await data.wait();
    notifySuccess("transaction successfully completed");
    return receipt;
  } catch (e) {
    console.log(e);
    console.log(parseErrorMsg(e));
    const errorMsg = parseErrorMsg(e);
    notifyError(errorMsg);
  }
}

export async function claimReward(poolID) {
  try {
    notifySuccess("calling contract...");
    const contractObj = await icoContract();

    const gasEstimation = await contractObj.estimateGas.claimReward(
      Number(poolID)
    );
    const data = await contractObj.claimReward(Number(poolID), {
      gasLimit: gasEstimation,
    });

    const receipt = await data.wait();
    notifySuccess("Reward claim successfully received");
    return receipt;
  } catch (e) {
    console.log(e);
    console.log(parseErrorMsg(e));
    const errorMsg = parseErrorMsg(e);
    notifyError(errorMsg);
  }
}

export async function createPool(pool) {
  try {
    const { _depositToken, _rewardToken, _apy, _lockDays } = pool;
    if (!_depositToken || !_rewardToken || !_apy || !_lockDays)
      return notifyError("Provide all details");

    notifySuccess("calling contract...");
    const contractObj = await icoContract();

    const gasEstimation = await contractObj.estimateGas.addPool(
      _depositToken,
      _rewardToken,
      Number(_apy),
      Number(_lockDays)
    );

    const stakeTx = await contractObj.addPool(
      _depositToken,
      _rewardToken,
      Number(_apy),
      Number(_lockDays),
      {
        gasLimit: gasEstimation,
      }
    );
    console.log(stakeTx);

    const receipt = await stakeTx.wait();
    notifySuccess("Token stake successfully");
    return receipt;
  } catch (e) {
    console.log(e);
    const errorMsg = parseErrorMsg(e);
    notifyError(errorMsg);
  }
}

export async function modifyPool(poolID, amount) {
  console.log(poolID, amount);
  try {
    notifySuccess("calling contract...");

    const contractObj = await icoContract();

    const gasEstimation = await contractObj.estimateGas.modifyPool(
      Number(poolID),
      Number(amount)
    );
    const data = await contractObj.modifyPool(Number(poolID), Number(amount), {
      gasLimit: gasEstimation,
    });

    const receipt = await data.wait();
    notifySuccess("transaction successfully completed");
    return receipt;
  } catch (e) {
    console.log(e);
    console.log(parseErrorMsg(e));
    const errorMsg = parseErrorMsg(e);
    notifyError(errorMsg);
  }
}

export async function sweep(tokenData) {
  try {
    const { token, amount } = tokenData;
    if (!token || !amount) return notifyError("Date is missing");
    notifySuccess("calling contract...");

    const contractObj = await icoContract();
    const transferAmount = ethers.utils.parseEther(amount);

    const gasEstimation = await contractObj.estimateGas.sweep(
      token,
      transferAmount
    );
    const data = await contractObj.sweep(token, transferAmount, {
      gasLimit: gasEstimation,
    });

    const receipt = await data.wait();
    notifySuccess("transaction successfully completed");
    return receipt;
  } catch (e) {
    console.log(e);
    console.log(parseErrorMsg(e));
    const errorMsg = parseErrorMsg(e);
    notifyError(errorMsg);
  }
}

//ADD TOKEN METAMASK
export const addTokenToMetaMask = async (token) => {
  if (window.ethereum) {
    const contract = await tokenContract();
    console.log(contract);
    const tokenDecimals = await contract.decimals();
    const tokenAddress = await contract.address;
    const tokenSymbol = await contract.symbol();
    const tokenImage = TOKEN_LOGO;

    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        notifySuccess("Token added!");
      } else {
        notifyError("Token not added");
      }
    } catch (error) {
      notifyError("Failed to add");
    }
  } else {
    const metamaskDeepLink = 'http://metamask.app.link/dapp/blockchainenergy.co.uk/';
    window.open(metamaskDeepLink);
    notifyError("MetaMask is not installed");
  }
};


export const BUY_TOKEN = async (amount, referral_address=ethers?.constants?.AddressZero) => {
  try {
    if (ethereum) {
      const contractICOs = await TOKEN_ICO_CONTRACT();
      const toeknDetails = await contractICOs.getTokenDetails();
      const avalableToken = ethers.utils.formatEther(
        toeknDetails.balance.toString()
      );

      if (avalableToken > 1) {
        const price = parseFloat((ethers.utils.formatEther(toeknDetails.tokenPrice.toString()) * Number(amount)).toFixed(6));
        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

        // const transaction = await contractICOs.buyToken(Number(amount), ethers.constants.AddressZero, {
        //   value: payAmount.toString()
        // });

        console.log('referral_address', referral_address);
        

        // with referrer
        const transaction = await contractICOs.buyToken(Number(amount), referral_address, {
          value: payAmount.toString(),
          gasLimit: ethers.utils.hexlify(300000),
        });

        const receipt = await transaction.wait();
        console.log('receipt', receipt);
        notifySuccess("Transaction successfully")
        return receipt;
      } else {
        notifyError("Token balance is lower than expected");
        return "receipt";
      }
    } else {
      const metamaskDeepLink = 'http://metamask.app.link/dapp/blockchainenergy.co.uk/';
      window.open(metamaskDeepLink);
      notifyError("MetaMask is not installed");
    }
  } catch (error) {
    console.log(error);
    const errorMsg = parseErrorMsg(error);
    notifyError(errorMsg);
  }
};






export const listenToEvents = () => {


  // console.log('eventData outside', eventData);

  // return eventData;
};


//OWNER TOKEN WITHDRAW
export const TOKEN_WITHDRAW = async () => {
  try {
    notifySuccess("Transaction proccessing...");
    const contract = await TOKEN_ICO_CONTRACT();

    const toeknDetails = await contract.getTokenDetails();
    const avalableToken = ethers.utils.formatEther(
      toeknDetails.balance.toString()
    );

    if (avalableToken > 1) {
      const transaction = await contract.withdrawAllTokens();

      const receipt = await transaction.wait();
      console.log(transaction);
      notifySuccess("Transaction successfully");
      return receipt;
    } else {
      notifyError("Token balance is lower than expected");
      return "receipt";
    }
  } catch (error) {
    console.log(error);
    const errorMsg = parseErrorMsg(error);
    notifyError(errorMsg);
  }
};

//OWNER UPDATE TOKEN
export const UPDATE_TOKEN = async (_address) => {
  try {
    if (!_address) return notifyError("Data is missing");
    notifySuccess("Transaction proccessing...");
    const contract = await TOKEN_ICO_CONTRACT();

    const gasEstimation = await contract.estimateGas.updateToken(_address);
    const transaction = await contract.updateToken(_address, {
      gasLimit: gasEstimation,
    });

    const receipt = await transaction.wait();
    console.log(transaction);
    notifySuccess("Transaction successfully");
    return receipt;
  } catch (error) {
    console.log(error);
    const errorMsg = parseErrorMsg(error);
    notifyError(errorMsg);
  }
};

// REDEEM TOKENS
export const REDEEM_TOKENS = async (userAddress, providedKey, qrCodeData) => {
  try {
    if (!userAddress || !providedKey || !qrCodeData) {
      return notifyError("Missing required data");
    }

    notifySuccess("Transaction processing...");

    const contract = await tokenContract(); // Assuming this function fetches the contract instance

    // Estimate gas for the redeemTokens function
    const gasEstimation = await contract.estimateGas.redeemTokens(userAddress, providedKey, qrCodeData);

    // Call redeemTokens function with the required arguments
    const transaction = await contract.redeemTokens(userAddress, providedKey, qrCodeData, {
      gasLimit: gasEstimation,
    });

    // Wait for the transaction to be mined
    const receipt = await transaction.wait();

    console.log(receipt);
    notifySuccess("Tokens successfully redeemed");

    return receipt;
  } catch (error) {
    console.log(error);
    const errorMsg = parseErrorMsg(error); // Assuming you have a function to parse the error message
    notifyError(errorMsg);
  }
};


//OWNER PRICE TOKEN
export const UPDATE_TOKEN_PRICE = async (price) => {
  try {
    if (!price) return notifyError("Data is missing");
    notifySuccess("Transaction proccessing...");
    const contract = await TOKEN_ICO_CONTRACT();
    const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

    const gasEstimation = await contract.estimateGas.updateTokenSalePrice(
      payAmount
    );

    const transaction = await contract.updateTokenSalePrice(payAmount, {
      gasLimit: gasEstimation,
    });

    const receipt = await transaction.wait();
    console.log(transaction);
    notifySuccess("Transaction successfully");
    return receipt;
  } catch (error) {
    console.log(error);
    const errorMsg = parseErrorMsg(error);
    notifyError(errorMsg);
  }
};
