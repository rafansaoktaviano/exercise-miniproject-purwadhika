import React from "react";

import { Card } from "flowbite-react";
import Button from "../Button/Button";
export default function Cards(props) {
  return (
    <div
      key={props.key}
      className="w-[280px] mt-[40px] border-[1px] border-black-400 rounded-[10px] cursor-pointer flex flex-col justify-between"
      onClick={props.onClick}
    >
      <div className="w-full">
        <img
          className="h-[200px] w-full rounded-tr-[10px] rounded-tl-[10px]"
          src={props.srcImg}
          alt=""
        />
      </div>
      <div className="p-[10px] flex flex-col gap-[10px]">
        <h3 className="text-[16px] font-bold tracking-tight text-gray-900 dark:text-white truncate w-[220px] mt-[10px] ">
          {props.eventName}
        </h3>
        <div className="flex justify-between">
        <p className="text-zinc-500">{props.city}</p>
        <p className="text-zinc-500">{props.date}</p>
        </div>
        <p className="text-zinc-500">{props.location}</p>
       
        <button className="px-[32px] py-[12px]  w-full rounded-xl bg-blue-500 text-white border-none mt-[10px]">See Details</button>
       
      </div>
    </div>
  );
}
