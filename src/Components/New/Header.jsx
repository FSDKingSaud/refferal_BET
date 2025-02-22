"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 70) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={isSticky ? "menu-sticky" : ""}>
            <div className="container-fluid custom-header-class">
                <div className="row">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <Link href="/" className="navbar-brand">
                                <img src="/assets/images/logo.png" className="img-fluid" alt="Logo" />
                            </Link>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <i className="fas fa-bars"></i>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto w-100 justify-content-end">
                                    <li className="nav-item">
                                        <Link href="#home" className="nav-link active">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="#token" className="nav-link">
                                            Token
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="#features" className="nav-link">
                                            Features
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="#roadmap" className="nav-link">
                                            Road Map
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="#contact" className="nav-link">
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <ul className="nav justify-content-end align-items-center">
                                <li className="nav-item">
                                    <Link href="/whitepaper" className="nav-link" target="_blank">
                                        Whitepaper
                                    </Link>
                                </li>
                                <li className="nav-item iq-mlr-0">
                                    <Link href="/presale" className="button">
                                        Presale
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
