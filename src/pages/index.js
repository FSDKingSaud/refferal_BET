import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

//INTERNAL IMPORT
import {
  Header,
  HeroSection,
  Footer,
  Pools,
  PoolsModel,
  WithdrawModal,
  Withdraw,
  Partners,
  Statistics,
  Token,
  Loader,
  Notification,
  ICOSale,
  Contact,
  Ask,
} from "../Components/index";

import {
  CONTRACT_DATA,
  deposit,
  withdraw,
  claimReward,
  addTokenToMetaMask,
} from "../Context/index";

import { LOAD_TOKEN_ICO } from "../Context/constants";
import About from "../Components/New/About";
import VisionMission from "../Components/New/VisionMission";
import TokenOverview from "../Components/New/TokenOverview";
import Features from "../Components/New/Features";
import Roadmap from "../Components/New/Roadmap";
import FAQ from "../Components/New/FAQ";
import OnLoadModal from "../Components/OnLoadModal";
import AprovedBy from "../Components/New/AprovedBy";
import Countdown from "../Components/Countdown";

const index = () => {
  const { address } = useAccount();
  const [loader, setLoader] = useState(false);
  const [contactUs, setContactUs] = useState(false);
  const [poolID, setPoolID] = useState();
  const [withdrawPoolID, setWithdrawPoolID] = useState();

  const [poolDetails, setPoolDetails] = useState();
  const [selectedPool, setSelectedPool] = useState();
  const [selectedToken, setSelectedToken] = useState();

  const LOAD_DATA = async () => {
    if (address) {
      console.log(address);
      setLoader(true);
      const data = await CONTRACT_DATA(address);
      setPoolDetails(data);
      setLoader(false);
    }
  };

  useEffect(() => {
    LOAD_DATA();
  }, [address]);


  
  return (
    <>
      <OnLoadModal />
      <Header referralAddressHeader={null} />
      <HeroSection
        poolDetails={poolDetails}
        addTokenToMetaMask={addTokenToMetaMask}
      />

      {/* <Countdown /> */}
      <Statistics poolDetails={poolDetails} />
      <Pools
        setPoolID={setPoolID}
        poolDetails={poolDetails}
        setSelectedPool={setSelectedPool}
        setSelectedToken={setSelectedToken}

      />
      <Token poolDetails={poolDetails} />

      {/* don't remove, add latter */}
      {/* <Withdraw
        setWithdrawPoolID={setWithdrawPoolID}
        poolDetails={poolDetails}
      /> */}

      {/* <Notification poolDetails={poolDetails} /> */}

      <div className="main-contain">
        <About />
        <VisionMission />
        <AprovedBy />
        <TokenOverview />
        <Features />
        <Roadmap />
        <Partners />
        <FAQ />
      </div>
      <Ask setContactUs={setContactUs} />
      <Footer />

      <PoolsModel
        deposit={deposit}
        poolID={poolID}
        address={address}
        selectedPool={selectedPool}
        selectedToken={selectedToken}
        setLoader={setLoader}
      />
      <WithdrawModal
        withdraw={withdraw}
        withdrawPoolID={withdrawPoolID}
        address={address}
        setLoader={setLoader}
        claimReward={claimReward}
      />
      <ICOSale setLoader={setLoader} referralUserAddress={null} />
      {contactUs && <Contact setContactUs={setContactUs} />}

      {loader && <Loader />}
    </>
  );
};

export default index;
