import React, { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color";

const calculateContrast = (hex) => {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Return 'black' or 'white' based on luminance
  return luminance > 128 ? '#000000' : '#FFFFFF';
};

export default function TimeDate() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bgColor, setBgColor] = useState("#C3B7B7"); // Default background color
  const [showPicker, setShowPicker] = useState(false); 
  const pickerRef = useRef(null); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);


    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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


  const textColor = calculateContrast(bgColor);

  return (
    <div className="relative w-full hidden rounded-md backdrop-blur-sm lg:block p-4 caret-transparent" style={{ backgroundColor: bgColor }}>
      <p className="flex flex-col lg:flex-row items-center rounded-sm justify-center gap-2" style={{ color: textColor }}>
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {fullTime.replace(/(AM|PM)$/i, "")}
        </span>
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase font-medium">
          {amPm ? amPm[0] : ""}
        </span>
      </p>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center" style={{ color: textColor }}>
        {formattedDate}
      </p>
      <div className="absolute top-0 right-0 mt-2 mr-2">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="h-4 w-6 bg-gray-300 rounded-md border"
          style={{ backgroundColor: bgColor }}
        >
          {/* Button to toggle the color picker */}
        </button>
        {showPicker && (
          <div
            className="absolute top-8 right-0"
            ref={pickerRef} 
          >
            <ChromePicker
              color={bgColor}
              onChangeComplete={(color) => setBgColor(color.hex)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
