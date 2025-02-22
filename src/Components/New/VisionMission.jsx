import { useEffect, useRef } from "react";
import Image from "next/image";

const VisionMission = () => {
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
                    <div
                        className="col-lg-6 align-self-center custom-left"
                        ref={leftColumnRef}
                    >
                        <div className="heading-title left">
                            <small className="iq-font-green">Our Vision & Mission</small>
                            <h2>Vision</h2>
                        </div>
                        <p>
                            Our vision is to revolutionize energy consumption by integrating blockchain
                            technology into everyday life, empowering individuals with both energy and digital rewards.
                        </p>

                        <div className="heading-title left">
                            <h3>Mission</h3>
                        </div>
                        <p>
                            We aim to inspire innovation and connection by offering unique energy drinks
                            that combine essential nutrients with the power of blockchain, driving a new era
                            of digital engagement.
                        </p>
                        <p>
                            With Blockchain Energy Token, we empower individuals and drive the future of
                            decentralized technology.
                        </p>
                    </div>

                    <div className="col-lg-6 align-self-center mt-4 mt-lg-0 custom-right" ref={rightColumnRef} >
                        <video className="img-fluid" fill autoPlay muted loop playsInline>
                            <source src="assets/videos/header_bg_compressed_2.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionMission;
