import React from "react";

export default function Note() {
  const handleNoteClick = () => {
    alert("Write a note");
  };

  return (
    <div className="w-full">
      <button
        className="flex items-center justify-center w-full gap-3 rounded-md py-2 px-2 bg-red-50 hover:bg-red-100 transition-colors duration-300 sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full"
        onClick={handleNoteClick}
      >
        <p className="text-base font-semibold">Note</p>
        <img
          src="https://img.icons8.com/?size=100&id=aRScxsgx3ozL&format=png&color=000000"
          height={20}
          width={20}
          alt="Note Icon"
        />
      </button>
    </div>
  );
}
