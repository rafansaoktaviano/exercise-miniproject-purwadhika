"use client";
import React from "react";
import { Dropdown, Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export default function NavbarWithCTAButton(props) {
  useEffect(() => {});
  return (

      <Navbar fluid rounded className="  absolute top-0 w-full z-50">
        <Navbar.Brand >
          <Link to="/">
            <span className="ml-[100px]  self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              EVENTS
            </span>
          </Link>
        </Navbar.Brand>

        <div className=" mr-[100px] flex md:order-2 gap-[30px] items-center">
          

          {props.orang ? (
            <Link to="/dashboard">
              <div className="w-[50px] h-[50px] flex justify-center items-center bg-gray-400 rounded-full">
                <h1 className="invisible">{props.orang}</h1>
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <Button className="font-bold">Login</Button>
            </Link>
          )}
          {props.orang ? (
            <div>
              <h1 onClick={props.onClicks} className="cursor-pointer">
                Logout
              </h1>
            </div>
          ) : (
            <Link to="/login"></Link>
          )}
          <Link to="/create">
            <Button className="font-bold">Create Event</Button>
          </Link>
        </div>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link active href="#">
            <Link to="/">
              <p className="pl-[100px] font-bold">Home</p>
            </Link>
          </Navbar.Link>
          {/* {props.orang ? (
            <div>
              <h1 onClick={props.onClicks} className="cursor-pointer">
                Logout
              </h1>
            </div>
          ) : (
            <Link to="/login"></Link>
          )} */}
        </Navbar.Collapse>
      </Navbar>

  );
}
