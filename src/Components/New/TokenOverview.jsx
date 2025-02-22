"use client"
import { useEffect, useRef } from "react";

const TokenOverview = () => {
    const columnRef = useRef(null);
    const leftColumnRef = useRef(null);
    const rightColumnRef = useRef(null);
    const tokenSectionRef = useRef(null);
    const chartLeftRef = useRef(null);
    const chartRightRef = useRef(null);

    useEffect(() => {
        const canvas = document.getElementById("myPieChart");
        const ctx = canvas.getContext("2d");

        const labels = [
            "Presale & Token Sale",
            "Liquidity & Development",
            "Community & Ecosystem",
            "Staking",
            "Team & Advisors",
            "Physical Product",
            "Marketing & Promotions"
        ];
        const data = [35, 20, 15, 12, 5, 8, 5];
        const colors = [
            "#FF0F00", "#FF6600", "#FF9E01", "#FCD202",
            "#F8FF01", "#04D215", "#0D8ECF"
        ];

        class PieChart {
            constructor(ctx, labels, data, colors) {
                this.ctx = ctx;
                this.labels = labels;
                this.data = data;
                this.colors = colors;
                this.startAngle = 0;
                this.radius = Math.min(this.ctx.canvas.width, this.ctx.canvas.height) / 2;
                this.drawChart();
            }

            drawChart() {
                const total = this.data.reduce((acc, val) => acc + val, 0);
                let currentAngle = this.startAngle;

                this.data.forEach((slice, index) => {
                    const sliceAngle = (slice / total) * (Math.PI * 2);
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
                    this.ctx.arc(
                        this.ctx.canvas.width / 2,
                        this.ctx.canvas.height / 2,
                        this.radius,
                        currentAngle,
                        currentAngle + sliceAngle
                    );
                    this.ctx.closePath();
                    this.ctx.fillStyle = this.colors[index];
                    this.ctx.fill();
                    currentAngle += sliceAngle;
                });
            }
        }

        new PieChart(ctx, labels, data, colors);

        let legendHtml = '';
        labels.forEach((label, index) => {
            legendHtml += `
                <li class="d-flex align-items-center">
                    <span class="legend-color" style="background-color: ${colors[index]};"></span>
                    <span class="flex-grow-1">${label}</span>
                    <span>${data[index]}%</span>
                </li>
            `;
        });
        document.getElementById("legendList").innerHTML = legendHtml;

        const observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                    observer.unobserve(entry.target);
                }
            });
        };

        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        if (leftColumnRef.current) observer.observe(leftColumnRef.current);
        if (rightColumnRef.current) observer.observe(rightColumnRef.current);
        if (tokenSectionRef.current) observer.observe(tokenSectionRef.current);
        if (chartLeftRef.current) observer.observe(chartLeftRef.current);
        if (chartRightRef.current) observer.observe(chartRightRef.current);
        if (columnRef.current) observer.observe(columnRef.current);

        return () => {
            if (leftColumnRef.current) observer.unobserve(leftColumnRef.current);
            if (rightColumnRef.current) observer.unobserve(rightColumnRef.current);
            if (tokenSectionRef.current) observer.unobserve(tokenSectionRef.current);
            if (chartLeftRef.current) observer.unobserve(chartLeftRef.current);
            if (chartRightRef.current) observer.unobserve(chartRightRef.current);
            if (columnRef.current) observer.unobserve(columnRef.current);
        };
    }, []);

    return (
        <section id="tokenomics" className="iq-Tranding-platform light-bg overview-block-ptb">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 custom-prod-above" ref={columnRef}>
                        <div className="heading-title">
                            <small className="iq-font-green">Token</small>
                            <h2 className="title">Token Overview</h2>
                            <p>
                                Blockchain Energy Token (BETs) are the backbone of our ecosystem,
                                providing users with exclusive rewards, early access, and a deeper
                                connection to the brand. Every can of Blockchain Energy Drink is a step
                                toward earning and redeeming valuable tokens for unique experiences.
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-6 custom-prod-table-left" ref={leftColumnRef}>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>Token Name:</th>
                                        <td>Blockchain Energy Token
                                            (BET)</td>
                                    </tr>
                                    <tr>
                                        <th>Token Platform:</th>
                                        <td>Binance Coin</td>
                                    </tr>
                                    <tr>
                                        <th>Token Standard:</th>
                                        <td>BNB</td>
                                    </tr>
                                    <tr>
                                        <th>Earning Rate:</th>
                                        <td>10 BETs per can</td>
                                    </tr>
                                    <tr>
                                        <th>Total Supply:</th>
                                        <td>2,000,000,000 BET</td>
                                    </tr>
                                    <tr>
                                        <th>35% Allocation</th>
                                        <td>700,000,000 BET for Presale & Token Sale</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-lg-6 custom-prod-table-right" ref={rightColumnRef}>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>20% Allocation</th>
                                        <td>400,000,000 BET Liquidity & Development</td>
                                    </tr>
                                    <tr>
                                        <th>15% Allocation</th>
                                        <td>300,000,000 BET Community & Ecosystem</td>
                                    </tr>
                                    <tr>
                                        <th>12% Allocation</th>
                                        <td>240,000,000 BET for staking</td>
                                    </tr>
                                    <tr>
                                        <th>8% Allocation</th>
                                        <td>160,000,000 BET for physical product</td>
                                    </tr>
                                    <tr>
                                        <th>5% Allocation</th>
                                        <td>100,000,000 BET Team & Advisors</td>
                                    </tr>
                                    <tr>
                                        <th>5% Allocation</th>
                                        <td>100,000,000 BET Marketing & Promotions</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-sm-12 iq-mt-60 custom-animate-token-above" ref={tokenSectionRef}>
                        <div className="heading-title">
                            <h2 className="title">Token Sale Process</h2>
                            <p>
                                The Blockchain Energy Token sale starts with a presale campaign,
                                allowing participants to buy tokens for early access and exclusive
                                rewards. Tokens are earned with every can purchased and can be redeemed
                                by scanning the QR Code on the Can. The sale will unfold in phases,
                                offering various ways to engage and benefit from the ecosystem.
                            </p>
                        </div>
                    </div>

                    <div className="col-sm-12">
                        <div className="row">
                            {/* Chart Section */}
                            <div className="col-md-6 custom-chart-left" ref={chartLeftRef}>
                                <div className="chart-container">
                                    <canvas id="myPieChart"></canvas>
                                </div>
                            </div>
                            <div className="col-md-1"></div>

                            {/* Options Section */}
                            <div className="col-md-4 custom-chart-right" ref={chartRightRef}>
                                <div className="centered-content">
                                    <ul id="legendList" className="legend-list w-100"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TokenOverview;
