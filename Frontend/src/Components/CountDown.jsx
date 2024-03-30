import React, { useState, useEffect } from "react";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(60); // Initial time left in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      // Decrease timeLeft by 1 every second
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Restart the countdown when timeLeft reaches 0
  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(60); // Reset timeLeft to 120 seconds
    }
  }, [timeLeft]);

  // Format the timeLeft into minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Format the countdown timer nicely
  const formattedTimeLeft = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;

  return (
    <div className=" flex flex-col">
      <h4 className=" font-bold text-sm text-gray-400">Next Update In:</h4>
      <div className=" text-white text-3xl font-bold">{formattedTimeLeft}</div>
    </div>
  );
};

export default Countdown;
