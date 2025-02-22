import React, { useState, useEffect } from "react";

import InputField from "./RegularComp/InputField";
import ClickButton from "./RegularComp/ClickButton";
import Title from "./RegularComp/Title";
import QrCodeTable from "./RegularComp/QrCodeTable";

const QrCode = ({ setLoader }) => {
  const [numOfQrCodes, setNumOfQrCodes] = useState('');
  const [successMes, setSuccessMes] = useState(false);
  const [errorMes, setErrorMes] = useState(false);

  useEffect(() => {
    if (successMes) {
      const timer = setTimeout(() => {
        setSuccessMes(false); 
        window.location.reload(); 
      }, 3000);
  
      return () => clearTimeout(timer);
    } else if (errorMes) {
      const timer = setTimeout(() => {
        setErrorMes(false); 
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [successMes, errorMes]);


  const generateQRCodes = async () => {
    if (numOfQrCodes && !isNaN(numOfQrCodes)) {
      setLoader(true);
      try {
        const response = await fetch(`/api/qr-code/generate?numOfQrCodes=${encodeURIComponent(numOfQrCodes)}`);

        if (response.status === 200) {
          const data = await response.json();
          console.log(data)
          setSuccessMes(true);
        } else {
          console.error("Error generating QR codes: ", response.status);
          setErrorMes(true)
        }
      } catch (error) {
        console.error("Error generating QR codes:", error);
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <div className="tab-pane fade" id="tab-7" role="tabpanel">
      <div className="row">
        <div className="col-12">
          <div className="profile">
            <ul
              className="nav nav-tabs section__tabs section__tabs--left"
              id="section__qr-tabs"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="tab-static1"
                  data-bs-toggle="tab"
                  data-bs-target="#tab1-content"
                  type="button"
                  role="tab"
                  aria-controls="tab1-content"
                  aria-selected="true"
                >
                  Generator QR Code
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="tab-static2"
                  data-bs-toggle="tab"
                  data-bs-target="#tab2-content"
                  type="button"
                  role="tab"
                  aria-controls="tab2-content"
                  aria-selected="false"
                >
                  QR Codes
                </button>
              </li>
            </ul>

            <div className="tab-content mt-4">
              {/* Generate QR Codes */}
              <div
                className="tab-pane fade show active"
                id="tab1-content"
                role="tabpanel"
                aria-labelledby="tab-static1"
              >
                <div className="row">
                  <Title title={"Generate and Print New QR Codes"} />

                  <InputField
                    size={"12"}
                    type={"number"}
                    title={"No Of QR Codes"}
                    name={"no_qr_codes"}
                    placeholder={`100`}
                    handleChange={(e) =>
                      setNumOfQrCodes(e.target.value)
                    }
                  />

                  {successMes && (
                    <span className="alert alert-success">
                      QR codes generated successfully!
                    </span>
                  )}
                  {errorMes && (
                    <span className="alert alert-danger">
                      Error generating QR codes!
                    </span>
                  )}


                  <ClickButton
                    name={"Generate"}
                    handleClick={() => generateQRCodes()}
                  />
                </div>
              </div>

              {/* All QR Codes Table */}
              <div
                className="tab-pane fade"
                id="tab2-content"
                role="tabpanel"
                aria-labelledby="tab-static2"
              >
                <div className="row">
                  <QrCodeTable setLoader={setLoader} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCode;
