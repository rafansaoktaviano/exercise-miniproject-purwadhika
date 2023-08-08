import React from "react";

import { Card } from "flowbite-react";
import Button from "../Button/Button";
export default function Cards(props) {
  return (

      <div
        key={props.key}
        className="w-[280px] mt-[40px] border-[1px] border-black-400 rounded-[10px] cursor-pointer "
        onClick={props.onClick}
      >
        <div className="w-full">
          <img
            className="h-[250px] w-full rounded-tr-[10px] rounded-tl-[10px]"
            src={props.srcImg}
            alt=""
          />
        </div>
        <div className="p-[10px] flex flex-col gap-[10px]">
          <h3 className="text-[16px] font-bold tracking-tight text-gray-900 dark:text-white truncate w-[220px] mt-[10px] mb-[10px]">
            {props.eventName}
          </h3>
          <p className="text-zinc-500">{props.city}</p>
          <p className="text-zinc-500">{props.location}</p>
          <p className="font-normal text-zinc-800 dark:text-gray-400 text-sm">
            {props.descLil}
          </p>
          <Button
            buttoncss="w-full rounded-xl bg-cyan-700 text-white border-none mt-0"
            buttonName="See Details"
          />
        </div>
      </div>

  );
}
