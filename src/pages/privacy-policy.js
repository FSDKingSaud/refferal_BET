import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <>
      <Header page={"admin"} />
      <div className="container py-5 my-5">
        <h1>Privacy AND Policy</h1>
        <h4 className="mt-2">Effective Date:  20<sup>th</sup> Jan 2025</h4>

        <p className="mt-2">
          Blockchain Energy Ltd (“Company,” “we,” “us,” or “our”) is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our website, services, and participate in our blockchain ecosystem.
        </p>

        <section className="my-3">
          <h4>1. Information We Collect</h4>
          <p>We collect the following types of personal information when you interact with our website or services:</p>
          <ol className="ms-4">
            <li>
              <strong>Information You Provide to Us</strong>
              <p>Name, email address, phone number, and other contact details when you register or contact us.</p>
              <p>Payment details if you participate in our token presale or other transactions.</p>
              <p>Wallet addresses and blockchain transaction data for token-related activities.</p>
            </li>
            <li>
              <strong>Automatically Collected Information</strong>
              <p>IP address, browser type, and device information when accessing our website.</p>
              <p>Usage data such as pages visited and time spent on our site.</p>
              <p>Cookies and tracking technologies to enhance your browsing experience.</p>
            </li>
            <li>
              <strong>Third-Party Data</strong>
              <p>Data from external platforms if you interact with our social media, payment gateways, or blockchain networks.</p>
            </li>
          </ol>
        </section>

        <section className="my-3">
          <h4>2. How We Use Your Information</h4>
          <p>We use your data for the following purposes:</p>
          <ol className="ms-4">
            <li>To provide and improve our blockchain-based services.</li>
            <li>To process transactions, including token purchases and staking rewards.</li>
            <li>To ensure regulatory compliance and conduct due diligence.</li>
            <li>To send updates, marketing communications, and important service-related information.</li>
            <li>To enhance website security and prevent fraud.</li>
          </ol>
        </section>

        <section className="my-3">
          <h4>3. Sharing and Disclosure of Information</h4>
          <p>We do not sell your personal data. However, we may share your information in the following cases:</p>
          <ol className="ms-4">
            <li>
              <strong>Legal Compliance:</strong> If required by law, court order, or regulatory authorities.
            </li>
            <li>
              <strong>Business Partners:</strong> With trusted third parties who assist in providing our services (e.g., payment processors, blockchain networks).
            </li>
            <li>
              <strong>Security Measures:</strong> To detect and prevent fraud or unauthorized activities.
            </li>
          </ol>
        </section>

        <section className="my-3">
          <h4>4. Data Security</h4>
          <p>We implement industry-standard security measures to protect your data, including:</p>
          <ol className="ms-4">
            <li>
              <strong>Encryption:</strong> Securing blockchain transactions and sensitive data.
            </li>
            <li>
              <strong>Access Controls:</strong> Restricting access to personal data to authorized personnel only.
            </li>
            <li>
              <strong>Regular Audits:</strong> Monitoring for security vulnerabilities and compliance risks.
            </li>
          </ol>
        </section>


        <section className="my-3">
          <h4>5. Your Rights and Choices</h4>
          <p>As a user, you have the following rights under UK and EU data protection laws:</p>
          <ol className="ms-4">
            <li>
              <strong>Access & Correction:</strong> Request a copy of your personal data or correct inaccuracies.
            </li>
            <li>
              <strong>Deletion:</strong> Request the removal of your data, subject to legal and operational limitations.
            </li>
            <li>
              <strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time.
            </li>
            <li>
              <strong>Data Portability:</strong> Receive your personal data in a structured format.
            </li>
          </ol>
        </section>

        <section className="my-3">
          <h4>6. Cookies & Tracking Technologies</h4>
          <p>We use cookies and similar tracking technologies to improve your browsing experience. You can manage your cookie preferences through your browser settings.</p>
        </section>

        <section className="my-3">
          <h4>7. Data Retention</h4>
          <p>We retain your personal data only as long as necessary for the purposes outlined in this policy or as required by law.</p>
        </section>

        <section className="my-3">
          <h4>8. Third-Party Links</h4>
          <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their policies.</p>
        </section>

        <section className="my-3">
          <h4>9. Updates to This Policy</h4>
          <p>We may update this Privacy Policy periodically. Changes will be posted on this page, and significant updates may be communicated via email.</p>
        </section>

        <section className="my-3">
          <h4>10. Contact Us</h4>
          <p>If you have any questions or concerns regarding this Privacy Policy, please contact us:</p>
          <p>
            <FaPhone className="inline-block mr-2" /> 02030511104
          </p>
          <p>
            <a href="mailto:Blockchainenergyltd@outlook.com" className="text-blue-500 hover:underline">
              <FaEnvelope className="inline-block mr-2" /> Blockchainenergyltd@outlook.com
            </a>
          </p>
          <p>
            <FaMapMarkerAlt className="inline-block mr-2" /> 20 Wenlock Road, N1 7GU
          </p>        </section>

      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
