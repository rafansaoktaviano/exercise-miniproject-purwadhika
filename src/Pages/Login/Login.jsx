import React from "react";
import Form from "../../Components/FormGroup/Form";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import NavbarWithCTAButton from "../../Components/Nav/Nav";
const Login = (props) => {
  const [data, setData] = useState(null);

  const refEmailLogin = useRef();
  const refPasswordLogin = useRef();
  const getApi = async () => {
    const res = await axios.get("http://localhost:3000/users");
    setData(res.data);
  };
  //   const onSubmitLogin = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/users?email=${refEmailLogin.current.value}&password=${refPasswordLogin.current.value}`
  //       );
  //       console.log(response.data);
  //       if (!response.data.length) {
  //         return toast.error(
  //           "Login Failed, Input Your Credentials or Don't forget to fill the correct email adress"
  //         );
  //       }

  //       toast.success("Login Sucess");
  //     } catch (error) {
  //       console.log();
  //     }
  //   };
  useEffect(() => {
    getApi();
  }, []);

  return (
    <div className="grid">
      <div className="h-screen flex justify-center items-center bg-#4460f0">
        <div className=" xl:px-[200px] sm:px-[75px]  w-1/2">
          <Toaster />
          <h1 className="text-2xl mb-[20px]">Login</h1>
          <Form
            ref={refEmailLogin}
            labelName="Email"
            inputId="email"
            labelFor="email"
            type="email"
            inputcss="w-md"
          />
          <Form
            ref={refPasswordLogin}
            labelName="Password"
            inputId="password"
            labelFor="password"
            type="password"
          />
          <h1>
            Don't have Account?{" "}
            <Link to="/register">
              <a className="text-blue-700 underline">Sign Up</a>
            </Link>
          </h1>

          <Button
            onClick={() =>
              props.handleLoginFromApp(refEmailLogin, refPasswordLogin)
            }
            buttoncss="px-[32px] py-[12px] bg-blue-500 border-none mt-[50px] w-full  rounded-md mb-[20px] text-white"
            buttonName="Login"
          />
        </div>
        <img className="bg-blue-500 w-2/4 h-full " src="https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2030&q=80">
          {/* <div className=" bg-blue-500  shadow-2xl rounded-xl w-full h-full p-[100px]">
            <div>
              <h1 className="text-center text-white text-4xl mb-[50px] mt-[50px] font-bold">
                HELLO!
              </h1>
              <h3 className=" text-white text-3xl leading-[50px] mb-[20px] font-semibold">
                Let's get started with your 14 days promo trial
              </h3>
              <p className=" text-white opacity-80">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </p>
            </div>
          </div> */}
        </img>
      </div>
    </div>
  );
};

export default Login;
