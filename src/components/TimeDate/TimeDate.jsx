import React, { useState, useEffect } from "react";

export default function TimeDate() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const dateOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formattedDate = currentTime.toLocaleDateString(undefined, dateOptions);
  const fullTime = currentTime.toLocaleTimeString(undefined, timeOptions);

  // Extract AM/PM part
  const amPm = fullTime.match(/(AM|PM)$/i);

  return (
    <div className="w-full hidden lg:block bg-white/30 backdrop-blur-lg rounded-md ">
      <p className="flex w-full items-center  justify-center gap-2 text-white">
        <span className="text-[3.6vw] md:text-[3.2vw] w-8/12">{fullTime.replace(/(AM|PM)$/i, "")}</span>
        <span className="text-[2.5vw] mb-2 md:mb-1 uppercase font-medium ">{amPm ? amPm[0] : ""}</span>
      </p>
      <p className="text-[2.4vw] flex items-center justify-center text-white">{formattedDate}</p>
    </div>
  );
}
