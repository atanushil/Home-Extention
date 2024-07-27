import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";

export default function AddShortcuts({onClick, name }) {
  return (
    <div
      className="w-fit h-fit px-3 py-2 hover:backdrop-blur-sm  rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col items-center ">
        <div className="icon mt-4">
          <IoAddCircleOutline size={36} />
        </div>
        <div className="name text-sm my-3">{name}</div>
      </div>
    </div>
  );
}
