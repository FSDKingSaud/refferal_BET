import { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone } from "react-icons/fa";

const OnLoadModal = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // const isModalDismissed = localStorage.getItem('modalDismissed') === 'true';
        // if (!isModalDismissed) {
            setShow(true);
        // }
    }, []);

    const handleClose = () => {
        window.location.href = "http://google.com/";
    };

    const handleContinue = () => {
        setShow(false);
    };

    return (
        <>
            {show && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Website Disclaimer</h5>
                            </div>
                            <div className="modal-body" style={{
                                maxHeight: '450px',
                                overflowY: 'auto',
                            }}>
                                <p>
                                    The content on this website (“Site”) is provided by Blockchain Energy Ltd (“Company”) for general informational and educational purposes only. By accessing or using this Site, you agree to the following terms and conditions:
                                </p>
                                <ol>
                                    <li>
                                        <h5>No Financial or Investment Advice</h5>
                                        The information provided on this Site does not constitute financial, investment, legal, or professional advice. All materials are provided “as is” without any guarantees or warranties, express or implied. Any reliance you place on such information is strictly at your own risk. We strongly recommend consulting with qualified professionals before making any financial decisions.
                                    </li>
                                    <li className='mt-4'>
                                        <h5>Accuracy of Information</h5>
                                        While we strive to ensure the information on this Site is accurate and up-to-date, Blockchain Energy Ltd makes no representations or warranties, express or implied, about the accuracy, reliability, completeness, suitability, or availability of the content. The Company reserves the right to amend or update any information without prior notice.
                                    </li>
                                    <li className='mt-4'>
                                        <h5>No Guarantees or Representations</h5>
                                        Participation in any token sale or related activity carries inherent risks, including the potential for financial loss. Blockchain Energy Ltd does not guarantee any returns, financial benefits, or the appreciation of tokens. Purchasing tokens is entirely voluntary and at your own discretion.
                                    </li>
                                    <li className='mt-4'>
                                        <h5>Liability Limitation</h5>
                                        To the fullest extent permitted by UK law, Blockchain Energy Ltd and its officers, employees, or affiliates accept no liability for any loss or damage, whether direct, indirect, consequential, or otherwise, arising from or in connection with the use of this Site or participation in any of the Company’s activities.
                                    </li>
                                    <li className='mt-4'>
                                        <h5>Third-Party Links</h5>
                                        This Site may contain links to third-party websites. These links are provided for convenience only, and Blockchain Energy Ltd is not responsible for the content, security, or practices of these external sites. Accessing third-party websites is at your own risk.
                                    </li>
                                    <li className='mt-4'>
                                        <h5>Risk of Blockchain and Cryptocurrency Transactions</h5>
                                        Blockchain and cryptocurrency technologies are complex, subject to change, and involve significant risks. Blockchain Energy Ltd does not assume any liability for the performance of blockchain networks, potential cyber threats, or regulatory changes that may impact operations or the value of tokens.
                                    </li>
                                    <li className='mt-4'>
                                        <h5>Legal Jurisdiction</h5>
                                        This Site is intended for use by individuals in jurisdictions where cryptocurrency activities are legal. It is your responsibility to ensure that accessing this Site and participating in any token sales comply with local laws and regulations. Blockchain Energy Ltd will not be held liable for unlawful access or participation.
                                    </li>
                                    <li className='mt-4'>
                                        <h5>Contact Us</h5>
                                        If you have questions or concerns, please contact us:
                                        <br />
                                        <FaEnvelope /> Phone: 02030511104
                                        <br />
                                        <FaPhone /> Email: Blockchainenergyltd@outlook.com
                                    </li>
                                    <p className='mt-4'>By using this Site, you confirm that you have read, understood, and agreed to this disclaimer. If you do not agree to these terms, please refrain from using the Site.</p>
                                </ol>
                                <p className='mb-2 text-center'>Blockchain Energy Ltd, Registered in England and Wales.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="button text-dark"
                                    style={{ backgroundColor: '#FFFFFF' }}
                                    onClick={handleClose}
                                >
                                    Close the Site
                                </button>
                                <button
                                    type="button"
                                    className="button "
                                    onClick={handleContinue}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OnLoadModal;
