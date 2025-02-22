import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Header } from "../../Components/index";
import InputField from "../../Components/Admin/RegularComp/InputField";
import ClickButton from "../../Components/Admin/RegularComp/ClickButton";
import { REDEEM_TOKENS } from "../../Context/index";

const QRCodePage = () => {
    const router = useRouter();
    const { qr_code_id } = router.query;
    const [qrCodeData, setQrCodeData] = useState(null);
    const [tokenKey, setTokenKey] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMes, setSuccessMes] = useState(false);
    const [errorMes, setErrorMes] = useState(false);

    useEffect(() => {
        const fetchQRCodeData = async () => {
            if (!qr_code_id) return;

            setLoading(true);
            try {
                const response = await fetch(`/api/qr-code/redeem/${qr_code_id}`, {
                    method: 'GET',
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch QR code');
                }

                if (data.success == false) {
                    setError(data.message);
                }
                setQrCodeData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQRCodeData();


        const fetchTokenKey = async () => {
            try {
                const response = await fetch('/api/token-key/get');
                const data = await response.json();

                if (response.ok) {
                    console.log('TokenKey retrieved:', data.data.TokenKey);
                    setTokenKey(data.data.TokenKey);
                } else {
                    console.error('Error retrieving TokenKey:', data.message);
                }
            } catch (error) {
                console.error('Error fetching TokenKey:', error);
            }
        };

        fetchTokenKey();

    }, [qr_code_id]);

    useEffect(() => {
        if (successMes) {
            const timer = setTimeout(() => {
                setSuccessMes(false);
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setErrorMes(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMes, errorMes]);

    const CALLING_FUNCTION_UPDATE_TOKEN = async (updateToken) => {
        // setLoader(true);
        console.log(walletAddress);
        console.log(qr_code_id);

        // const receipt = await UPDATE_TOKEN(updateToken);
        const receipt = await REDEEM_TOKENS(walletAddress, tokenKey, qr_code_id);

        if (receipt) {
            // window.location.reload();
            try {
                const response = await fetch(`/api/qr-code/redeemed/${qr_code_id}`, {
                    method: 'GET',
                });

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message);
                }

                if (data.success == false) {
                    setError(data.message);
                }
                if (data.success == true) {
                    setSuccessMes(data.message);
                }
                setQrCodeData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <>
            <Header page={"admin"} />

            <section id="home" className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="hero__content hero__content--first">
                                <h1 className="hero__title">
                                    <strong>Redeem Token</strong> <br />
                                </h1>
                                <p>QR Code ID: {qr_code_id}</p>

                                {loading && <p>Loading QR code details...</p>}
                                {error && (
                                    <div className='alert alert-danger w-100 text-center'>
                                        <strong>{error}</strong>
                                    </div>
                                )}

                                <br />
                                <InputField
                                    size={"12"}
                                    type={"text"}
                                    title={"Enter your wallet address"}
                                    name={"qrcodeid"}
                                    placeholder={`Enter your BNB wallet address`}
                                    handleChange={(e) =>
                                        setWalletAddress(e.target.value)
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
                                    name={"Redeem Tokens"}
                                    handleClick={() => CALLING_FUNCTION_UPDATE_TOKEN(walletAddress)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default QRCodePage;
