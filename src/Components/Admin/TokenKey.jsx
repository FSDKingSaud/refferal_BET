import React, { useState, useEffect } from "react";

import InputField from "./RegularComp/InputField";
import ClickButton from "./RegularComp/ClickButton";
import Title from "./RegularComp/Title";

const TokenKey = ({ setLoader }) => {
    const [tokenKey, setTokenKey] = useState('');
    const [successMes, setSuccessMes] = useState(false);
    const [errorMes, setErrorMes] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        if (successMes) {
            const timer = setTimeout(() => {
                setSuccessMes(false);
            }, 3000);

            return () => clearTimeout(timer);
        } else if (errorMes) {
            const timer = setTimeout(() => {
                setErrorMes(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMes, errorMes]);

    const updateTokenKey = async () => {
        if (tokenKey && !isProcessing) {
            setIsProcessing(true);
            setLoader(true);
            try {
                const response = await fetch(`/api/token-key/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        TokenKey: tokenKey.toString(),
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('TokenKey updated successfully:', data);
                    setSuccessMes(true);
                } else {
                    console.error('Failed to update TokenKey:', data.message);
                    setErrorMes(true);
                }
            } catch (error) {
                console.error('Error calling API:', error);
                setErrorMes(true);
            } finally {
                setIsProcessing(false);
                setLoader(false);
                setIsModalOpen(false);
            }
        } else {
            console.error('Invalid TokenKey value');
        }
    };


    return (
        <div className="tab-pane fade" id="tab-8" role="tabpanel">
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
                                    Token Key
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
                                    <Title title={"Create & Update Token Key"} />

                                    <InputField
                                        size={"12"}
                                        type={"text"}
                                        title={"Token Key"}
                                        name={"token_key"}
                                        value={tokenKey}
                                        handleChange={(e) => {
                                            const sanitizedValue = e.target.value.replace(/\s+/g, "");
                                            setTokenKey(sanitizedValue);
                                        }}
                                    />

                                    {successMes && (
                                        <span className="alert alert-success">
                                            Token Key updated successfully!
                                        </span>
                                    )}
                                    {errorMes && (
                                        <span className="alert alert-danger">
                                            Error! Something Went Wrong!
                                        </span>
                                    )}

                                    <ClickButton
                                        name={"Update"}
                                        handleClick={() => setIsModalOpen(true)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Custom Modal */}
            {isModalOpen && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmation!</h5>
                            </div>
                            <div className="modal-body" style={{
                                maxHeight: '450px',
                                overflowY: 'auto',
                            }}>
                                Are you sure you want to update this Private key
                            </div>
                            <div className="modal-footer">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    type="button"
                                    className="button text-dark"
                                    style={{ backgroundColor: '#FFFFFF' }}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={updateTokenKey}
                                    type="button"
                                    className="button"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TokenKey;
