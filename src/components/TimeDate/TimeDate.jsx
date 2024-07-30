import React, { useState, useEffect } from "react";



const TimeDate = ({ bgColor }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 

    return () => clearInterval(intervalId); 
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

  const amPm = fullTime.match(/(AM|PM)$/i);


  return (
    <div className={`relative w-full hidden rounded-md backdrop-blur-sm lg:block p-4 caret-transparent shadow-lg shadow-slate-500 ${bgColor}`} >
      <p className="flex flex-col lg:flex-row items-center rounded-sm justify-center gap-2 text-white" >
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {fullTime.replace(/(AM|PM)$/i, "")}
        </span>
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase font-medium">
          {amPm ? amPm[0] : ""}
        </span>
      </p>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center" >
        {formattedDate}
      </p>
    </div>
  );
}

export default TimeDate;
