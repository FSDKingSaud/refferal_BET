import React, { useEffect, useState } from "react";

const Countdown = () => {
  // New countdown
  const getInitialTimeLeft = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(midnight.getHours() + 24, 0, 0, 0);
    return Math.floor((midnight - now) / 1000);
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="container text-center" style={{ backgroundColor: "rgba(42, 20, 102, 0.9)", padding: "2rem", borderRadius: "10px" }}>
      <h2 style={{ color: "#F9B707", fontSize: "3rem", marginBottom: "1rem" }}>Presale Start</h2>
      <h1
        style={{
          fontSize: "5rem",
          color: "#F9B707",
          fontWeight: "bold",
          lineHeight: "1.2",
          textAlign: "center",
        }}
      >
        {formatTime(timeLeft)}
      </h1>
      <style jsx>{`
        @media (min-width: 768px) {
          h1 {
            font-size: 10rem;
          }
        }
        @media (min-width: 1024px) {
          h1 {
            font-size: 15rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Countdown;
