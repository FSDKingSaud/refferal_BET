import { useEffect } from 'react';
import Image from 'next/image';

const About = () => {

    useEffect(() => {
        const leftColumn = document.querySelector('.custom-left-col');
        const rightColumn = document.querySelector('.custom-right-col');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    leftColumn.classList.add('animate');
                    rightColumn.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const aboutSection = document.getElementById('iq-about');
        if (aboutSection) {
            observer.observe(aboutSection);
        }

        return () => {
            if (aboutSection) {
                observer.unobserve(aboutSection);
            }
        };
    }, []);

    return (
        <section id="iq-about" className="overview-block-ptb">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 align-self-center custom-left-col">
                        <Image
                            src="/assets/images/about-section-removebg-preview.png"
                            alt="Blockchain Energy Token"
                            width={500} 
                            height={500}
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-1"></div>
                    <div className="col-lg-6 align-self-center mt-4 mt-lg-0 custom-right-col">
                        <div className="heading-title left">
                            <small className="iq-font-green">ABOUT US</small>
                            <h3>Blockchain Energy Tokens - BETs</h3>
                        </div>
                        <p>
                            Blockchain Energy Token is more than an energy drink. It’s a new way to combine energy for your body with rewards for your digital life.
                        </p>
                        <p>
                            Every can boosts your energy with essential nutrients and gives you 10 BETs (Blockchain Energy Token). These tokens can be used for exclusive rewards and introduce you to blockchain technology.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
