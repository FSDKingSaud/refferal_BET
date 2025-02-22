import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { getPurchaseHistory } from "../Context/index";

const TermAndCondition = () => {
  const [eventHistory, setEventHistory] = useState([]);
  useEffect(() => {
    const fetchEventHistory = async () => {
      try {
        const events = await getPurchaseHistory();
        setEventHistory(events); // Set the event history once fetched
      } catch (error) {
        console.error("Error fetching event history:", error);
      }
    };
    fetchEventHistory();
  }, []);
  return (
    <>
      <Header page={"admin"} />
      <div className="container">

        <div className="col-12">

          <div
            className="deals scrollable-div"
            style={{ overflowX: "scroll", marginTop: "100px" }}
          >
            <div className="container-fluid">
              <div className="row align-items-center mb-3">
                <div className="col-6">
                  <h3>Purchase History</h3>
                </div>
                <div className="col-6 text-end">
                  <a href="/" className="btn btn-sm button">
                    <i className="bi bi-arrow-left"></i> Back
                  </a>
                </div>
              </div>
            </div>
            <table className="deals__table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Transaction Hash</th>
                  <th>User Address</th>
                  <th>Token Amount (BNB)</th>
                  <th>View Address</th>
                </tr>
              </thead>
              <tbody>
                {eventHistory.length > 0 ? (
                  eventHistory.map((event, index) => (
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
                          {event.tokenAmount ? `${event.tokenAmount} BNB` : "N/A"}
                        </div>
                      </td>
                      <td>
                        {event.userAddress ? (
                          <a
                            href={`https://bscscan.com/tx/${event.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#007bff", textDecoration: "none" }}
                          >
                            View Details
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermAndCondition;
