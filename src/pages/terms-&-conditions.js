import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const TermAndCondition = () => {
  return (
    <>
      <Header page={"admin"} />
      <div className="container py-5 my-5">
        <h1>Terms and Conditions</h1>

        <section className="my-3">
          <h4>1. Act to Deliver Good Outcomes for Customers</h4>
          <ul>
            <li>
              <strong>Health Benefits:</strong> Blockchain Energy drinks include essential B vitamins, designed to provide genuine energy-boosting benefits, ensuring the product delivers value to consumers.
            </li>
            <li>
              <strong>Reward System:</strong> The integration of Blockchain Energy Tokens (BETs) provides added value, allowing customers to earn tokens with every purchase, promoting customer engagement and loyalty.
            </li>
          </ul>
        </section>

        <section className="my-3">
          <h4>2. Avoid Causing Foreseeable Harm</h4>
          <ul>
            <li>
              <strong>Transparent Marketing:</strong> Clear communication about the drink’s ingredients, benefits, and the token rewards program avoids misleading claims. Nutritional labeling ensures customers understand what they are consuming.
            </li>
            <li>
              <strong>Non-Speculative Rewards:</strong> BETs are marketed as utility tokens tied to rewards, not speculative financial instruments, avoiding financial risks or confusion for customers.
            </li>
          </ul>
        </section>

        <section className="my-3">
          <h4>3. Enable Customers to Pursue Their Financial Objectives</h4>
          <ul>
            <li>
              <strong>Token Redemption Opportunities:</strong> By offering tokens that can be used for rewards, customers can see tangible benefits from their purchases, helping them achieve their loyalty goals.
            </li>
            <li>
              <strong>Accessible Information:</strong> Providing clear details on how BET tokens are earned, redeemed, and utilized ensures customers can make informed decisions.
            </li>
          </ul>
        </section>

        <section className="my-3">
          <h4>4. Provide Products and Services That Are Fit for Purpose</h4>
          <ul>
            <li>
              <strong>High-Quality Ingredients:</strong> The drink is designed to provide a functional energy boost, backed by scientifically proven benefits of B vitamins and other energy-enhancing ingredients.
            </li>
            <li>
              <strong>Reward Ecosystem:</strong> The token reward system is designed for ease of use and practicality, enhancing the overall value of the product without creating confusion or barriers.
            </li>
          </ul>
        </section>

        <section className="my-3">
          <h4>5. Monitor and Review Consumer Outcomes</h4>
          <ul>
            <li>
              <strong>Customer Feedback:</strong> Systems to collect feedback about taste, effectiveness, and the token system will ensure the product meets customer expectations and satisfaction.
            </li>
            <li>
              <strong>Regular Updates:</strong> The token system and reward program will be reviewed periodically to maintain alignment with customer needs and ensure fair value.
            </li>
          </ul>
        </section>

        <section className="my-3">
          <h4>Next Steps for Compliance with Consumer Duty</h4>
          <ul>
            <li>
              <strong>Transparency:</strong> Ensure all marketing and labeling clearly communicate product benefits and token rewards to avoid customer misunderstanding.
            </li>
            <li>
              <strong>Accessible Support:</strong> Provide customer service channels to answer questions about the drink, its ingredients, and the token system.
            </li>
            <li>
              <strong>Periodic Reviews:</strong> Continuously assess whether the product and token system deliver fair value and good outcomes for customers.
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TermAndCondition;
