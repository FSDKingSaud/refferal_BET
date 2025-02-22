import { useEffect, useRef } from "react";

const AprovedBy = () => {
    const leftColumnRef = useRef(null);
    const rightColumnRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (leftColumnRef.current && rightColumnRef.current) {
                        leftColumnRef.current.classList.add('animate');
                        rightColumnRef.current.classList.add('animate');
                    }
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const icoSection = document.getElementById("ico");
        if (icoSection) {
            observer.observe(icoSection);
        }

        return () => {
            if (icoSection) {
                observer.unobserve(icoSection);
            }
        };
    }, []);

    return (
        <section id="ico" className="overview-block-ptb">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 align-self-center mt-4 mt-lg-0 custom-aproved-by-left" ref={leftColumnRef}>
                        <img src="img/fintech_approved.jpg" className="img-fluid p-5" alt="" />
                    </div>
                    <div
                        className="col-lg-6 align-self-center custom-aproved-by-right"
                        ref={rightColumnRef}
                    >
                        <div className="heading-title left">
                            <small className="iq-font-green">Approved By</small>
                            <h2>Fintech Harbor Consulting</h2>
                        </div>
                        <p>Blockchain Energy is a next-generation energy drink infused with blockchain technology approved by Fintech Harbor Consulting. Each can comes with a QR code that rewards users with Blockchain Energy Tokens (BETs), unlocking exclusive benefits.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AprovedBy;
