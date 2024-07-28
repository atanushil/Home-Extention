import React, { useState, useEffect } from "react";
import { FaRegBell } from "react-icons/fa6";

const Alert = ({ heading, color, message, borderColor = "white", duration = 5000 }) => {
  const [showAlert, setShowAlert] = useState(true);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    // Update the countdown timer every second
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(timer);
          setShowAlert(false);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [duration]);

  // Calculate the width of the border based on the remaining time
  const borderWidthPercentage = (timeLeft / duration) * 100;

  return (
    <>
      {showAlert && (
        <div
          className={` top-4 h-fit absolute text-white px-6 py-4 border-0 rounded-t-lg shadow-lg bg-${color}-500 z-50 flex flex-col `}
        >
          <div className="flex items-center">
            <span className="text-xl inline-block mr-5 align-middle">
<FaRegBell/>
            </span>
            <span className="inline-block align-middle mr-8">
              <b className="capitalize">{heading}</b> {message}
            </span>
            <button
              className="bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
              onClick={() => setShowAlert(false)}
            >
              <span>×</span>
            </button>
          </div>
          <div
            className="absolute bottom-0 left-0 w-full h-1"
            style={{
              background: `linear-gradient(to right, ${borderColor} ${borderWidthPercentage}%, transparent ${borderWidthPercentage}%)`,
              transition: 'background 1s linear, height 1s linear', // Smooth transition
              height: '2px'
            }}
          />
        </div>
      )}
    </>
  );
};

export default Alert;
