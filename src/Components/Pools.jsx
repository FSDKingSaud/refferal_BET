import React, { useState, useEffect } from "react";
import { MdOutlineAttachMoney, FaRegCopy } from "./ReactICON/index";
import { getPurchaseEvents } from "../Context/index";
import { MdHeight } from "react-icons/md";

const Pools = ({
  setPoolID,
  poolDetails,
  setSelectedPool,
  setSelectedToken,
  name,
}) => {
  const poolArray = poolDetails?.poolInfoArray ?? [];
  const [EventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const events = await getPurchaseEvents();
        setEventData(events); // Set the event data once fetched
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEventData();
  }, []);

  // Assign ranks based on totalTokenAmount thresholds
  const rankedEventData = EventData.map((event) => {
    let rank = '';
    if (event.totalTokenAmount >= 10) {
      rank = "Whale 🐋";
    } else if (event.totalTokenAmount >= 6) {
      rank = "Shark 🦈";
    } else if (event.totalTokenAmount >= 3) {
      rank = "Salmon 🐟";
    } else if (event.totalTokenAmount >= 1) {
      rank = "Crab 🦀";
    } else if (event.totalTokenAmount >= 0.25) {
      rank = "Shrimp 🦐";
    } else {
      rank = "Shrimp 🦐";
    }
    return { ...event, rank };
  });

  // Sort rankedEventData by rank priority and then by totalTokenAmount
  const rankPriority = {
    "Whale 🐋": 1,
    "Shark 🦈": 2,
    "Salmon 🐟": 3,
    "Crab 🦀": 4,
    "Shrimp 🦐": 5,
  };

  const sortedByRank = rankedEventData.sort((a, b) => {
    if (rankPriority[a.rank] === rankPriority[b.rank]) {
      // If ranks are the same, sort by totalTokenAmount in descending order
      return b.totalTokenAmount - a.totalTokenAmount;
    } else {
      // Sort by rank priority
      return rankPriority[a.rank] - rankPriority[b.rank];
    }
  });

  return (
    <div id="staking" className="section mt-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12 col-md-7 mt-md-3">
                <div className="section__title">
                  <h2>Top Token Purchasers</h2>
                  <p>
                    A real-time list of users who have purchased the most tokens, with details on their transactions and token amounts.
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-4 offset-1">
                <div className="stats my-auto" style={{ height: "200px" }}>
                  <div className="stats__items">
                    <div className="stats__item">
                      <span className="stats__emoji">🐋</span>
                      <span className="stats__rank">Whale</span>
                      <span className="stats__rank"> : 10 BNB</span>
                    </div>
                    <div className="stats__item">
                      <span className="stats__emoji">🦈</span>
                      <span className="stats__rank">Shark</span>
                      <span className="stats__rank"> : 6 BNB</span>
                    </div>
                    <div className="stats__item">
                      <span className="stats__emoji">🐟</span>
                      <span className="stats__rank">Salmon</span>
                      <span className="stats__rank"> : 3 BNB</span>
                    </div>
                    <div className="stats__item">
                      <span className="stats__emoji">🦀</span>
                      <span className="stats__rank">Crab</span>
                      <span className="stats__rank"> : 1 BNB</span>
                    </div>
                    <div className="stats__item">
                      <span className="stats__emoji">🦐</span>
                      <span className="stats__rank">Shrimp</span>
                      <span className="stats__rank"> : 0.25 BNB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="deals scrollable-div" style={{ overflowX: "scroll" }}>
              <table className="deals__table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Transaction Hash</th>
                    <th>User Address</th>
                    <th>Total Token Amount (BNB)</th>
                    <th>Rank</th>
                    <th>View Address</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedByRank.length > 0 ? (
                    sortedByRank.map((event, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="deals__text">
                            {event.transactionHash ? (
                              <a
                                href={`https://bscscan.com/tx/${event.transactionHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {event.transactionHash.slice(0, 10)}...
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="deals__text">
                            {event.userAddress
                              ? `${event.userAddress.slice(0, 15)}...${event.userAddress.slice(-15)}`
                              : "N/A"}
                          </div>
                        </td>
                        <td>
                          <div className="deals__text deals__text--green">
                            {event.totalTokenAmount
                              ? `${event.totalTokenAmount.toFixed(5)} BNB`
                              : "N/A"}
                          </div>
                        </td>
                        <td>{event.rank}</td>
                        <td>
                          {event.userAddress ? (
                            <a
                              href={`https://bscscan.com/token/0x8d484D42118b1fEC1BDD965a7EEB4EE7eB8c9810?a=${event.userAddress}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#007bff", textDecoration: "none" }}
                            >
                              View Address
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No events available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="col-12">
              <div className="section__btns">
                <a href="/purchase-history" className="button">
                  View all activities
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Pool Cards */}
        <div className="row">
          {poolArray.map((pool, index) => (
            <div
              className={`col-12 ${index === 0 || index === 1 ? "col-md-6" : ""} col-lg-4`}
              key={index}
            >
              <div className="apool">
                <h3 className="apool__title">
                  {index === 0 ? "Maximum" : index === 1 ? "Standard" : index === 2 ? "Lite" : "Advance"}
                </h3>

                <ul
                  className={`nav nav-tabs apool__tabs apool__tabs--${index === 0 ? "orange" : index === 1 ? "green" : index === 2 ? "blue" : "orange"}`}
                  id={index === 0 ? "apool__tabs1" : index === 1 ? "apool__tabs2" : "apool__tabs3"}
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="active"
                      data-bs-toggle="tab"
                      data-bs-target={`#atab-${index + 1}`}
                      type="button"
                      role="tab"
                      aria-controls={`atab-${index + 1}`}
                      aria-selected="true"
                    >
                      {pool.lockDays} Days
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      data-bs-toggle="tab"
                      data-bs-target={`#atab-${index + 2}`}
                      type="button"
                      role="tab"
                      aria-controls={`atab-${index + 2}`}
                      aria-selected="false"
                    >
                      Details
                    </button>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane fade show active" id={`atab-${index + 1}`} role="tabpanel">
                    <div className="apool__content">
                      <span className="apool__value">
                        Deposited: {pool?.amount} {pool?.depositToken.symbol}
                      </span>
                      <span className="apool__profit">
                        Reward: <b>{pool?.userReward}</b> {pool?.rewardToken.symbol}
                      </span>
                    </div>
                  </div>
                  <div className="tab-pane fade" id={`atab-${index + 2}`} role="tabpanel">
                    <div className="apool__content">
                      <span className="apool__value">
                        <b>{pool?.depositToken.symbol}&nbsp; &nbsp; </b>: {pool?.depositToken.address.slice(0, 15)}... <FaRegCopy />
                      </span>
                      <span className="apool__value">
                        <b>{pool?.rewardToken.symbol}&nbsp; &nbsp; </b>: {pool?.rewardToken.address.slice(0, 15)}...
                        <FaRegCopy />
                      </span>
                      <span className="apool__value">
                        <b>Current APY:&nbsp; &nbsp; </b>: {pool.apy} %
                      </span>
                    </div>
                  </div>
                </div>

                <div className="apool__group">
                  <label htmlFor="pool1" className="apool__label">Total Deposited amount</label>
                  <input
                    style={{ backgroundColor: "transparent" }}
                    className="apool__input"
                    placeholder={`${pool?.depositedAmount} ${pool?.depositToken.symbol}`}
                    disabled
                  />
                </div>

                <button
                  className="apool__btn"
                  data-bs-target="#modal-apool"
                  type="button"
                  data-bs-toggle="modal"
                  onClick={() => (
                    setPoolID(index === 0 ? 0 : index === 1 ? 1 : index === 2 ? 2 : ""),
                    setSelectedPool(pool),
                    setSelectedToken(pool)
                  )}
                >
                  Stake
                </button>

                <span
                  className={`block-icon block-icon--${index === 0 ? "orange" : index === 1 ? "green" : index === 2 ? "blue" : "orange"}`}
                >
                  <MdOutlineAttachMoney style={{ color: "white", fontSize: "1.5rem" }} />
                </span>
                <span className="screw screw--lines-tr" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pools;