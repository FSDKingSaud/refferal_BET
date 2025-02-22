import React, { useState, useEffect } from "react";
import jsPDF from 'jspdf';


const QrCodeTable = ({ setLoader }) => {
    const [qrCodes, setQrCodes] = useState([]);
    const [successMes, setSuccessMes] = useState(false);
    const [errorMes, setErrorMes] = useState(false);

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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        const fetchQrCodes = async () => {
            setLoader(true);
            try {
                const response = await fetch('/api/qr-code/all');
                const data = await response.json();
                setQrCodes(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching QR codes:', error);
            } finally {
                setLoader(false);
            }
        };

        fetchQrCodes();
    }, []);

    const downloadNewQRCodes = async () => {
        try {
            const response = await fetch('/api/qr-code/download-new', {
                method: 'GET',
            });

            const data = await response.json();

            if (response.ok) {
                if (data?.data?.length > 0) {
                    console.log("QR Codes downloaded:", data.data);

                    // Generate PDF
                    const pdf = new jsPDF();
                    let yPosition = 10;

                    data.data.forEach((item) => {
                        pdf.addImage(
                            item.qrCodeDataUrl,
                            'JPEG',
                            10,
                            yPosition,
                            50,
                            50
                        );

                        yPosition += 60;

                        if (yPosition > 280) {
                            pdf.addPage();
                            yPosition = 10;
                        }
                    });

                    pdf.save('qr-codes.pdf');
                    setSuccessMes(true);
                } else {
                    setErrorMes(true);
                }
            } else {
                console.error("Error downloading QR codes:", data.message || "Unknown error");
                setErrorMes(true);
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMes(true);
        }
    };



    const totalPages = Math.ceil(qrCodes.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    // const currentData = qrCodes.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const generatePageNumbers = () => {
        const visiblePages = [];
        const maxVisiblePages = 6;
        let left = Math.max(1, currentPage - 2);
        let right = Math.min(totalPages, currentPage + 2);

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                visiblePages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                right = Math.min(maxVisiblePages, totalPages);
                for (let i = 1; i <= right; i++) {
                    visiblePages.push(i);
                }
                visiblePages.push("...");
            } else if (currentPage >= totalPages - 2) {
                visiblePages.push(1);
                visiblePages.push("...");
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    visiblePages.push(i);
                }
            } else {
                visiblePages.push(1);
                visiblePages.push("...");
                for (let i = left; i <= right; i++) {
                    visiblePages.push(i);
                }
                visiblePages.push("...");
                visiblePages.push(totalPages);
            }
        }

        return visiblePages;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div className="container">
            <div className="row d-flex justify-content-between">
                <div className="col-6">
                    <h3 className="profile__title">List of Generated QR Codes</h3>
                </div>
                <div className="col-6 d-flex justify-content-end">
                    <button
                        type="button"
                        className="form__btn form__btn--small"
                        onClick={() => downloadNewQRCodes()}
                    >
                        Download New QR Codes
                    </button>
                </div>
                {successMes && (
                    <span className="alert alert-success my-3">
                        QR codes saved successfully!
                    </span>
                )}
                {errorMes && (
                    <span className="alert alert-danger my-3">
                        No new QR code founded!
                    </span>
                )}
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>QR Code</th>
                                    <th>QR Code ID</th>
                                    <th>Redeem</th>
                                    <th>Printed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {currentData.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>
                                            <img src={item.qrCodeDataUrl} alt={`QR Code ${index + 1}`} width="100" />
                                        </td>
                                        <td>{item.qrUrl}</td>
                                        <td>{item.redeemed ? 'Yes' : 'No'}</td>
                                        <td>{item.printed ? 'Yes' : 'No'}</td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="pagination-container">
                        <nav>
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        aria-label="Previous"
                                    >
                                        &laquo;
                                    </button>
                                </li>
                                {pageNumbers.map((page, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${page === currentPage ? "active" : ""} ${page === "..." ? "disabled" : ""}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => page !== "..." && handlePageChange(page)}
                                        >
                                            {page}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        aria-label="Next"
                                    >
                                        &raquo;
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QrCodeTable;
