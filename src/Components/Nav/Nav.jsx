"use client";
import React from "react";
import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export default function NavbarWithCTAButton(props) {
  useEffect(() => {});
  return (
    <div className="px-[100px] ">
      <Navbar fluid rounded>
        <Navbar.Brand>
          <Link to="/">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              EVENTS
            </span>
          </Link>
        </Navbar.Brand>

        <div className="flex md:order-2 gap-[30px] items-center">
          <Link to="/create">
            <Button>Create Event</Button>
          </Link>
          <Navbar.Toggle />

          {props.orang ? (
            <Link to="/dashboard">
              <div>
                <h1>{props.orang}</h1>
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        <Navbar.Toggle />
        <Navbar.Collapse>
          
          <Navbar.Link active href="#">
            <Link to="/">
              <p>Home</p>
            </Link>
          </Navbar.Link>
          {props.orang ? (
            <div>
              <h1 onClick={props.onClicks} className="cursor-pointer">
                Logout
              </h1>
            </div>
          ) : (
            <Link to="/login"></Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
