import React from "react";

export default function Note() {
  const handleNoteClick=()=>{
    alert("Write a note")
  }
  return (
    <div>
      <button className="flex items-center justify-center bg-red-50 w-full gap-3 rounded-md py-2" onClick={handleNoteClick}>
        <p>Note</p>
        <img
          src="https://img.icons8.com/?size=100&id=aRScxsgx3ozL&format=png&color=000000"
          height={20}
          width={20}
          alt="gif"
        />
      </button>
    </div>
  );
}
