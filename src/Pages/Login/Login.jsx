import React from "react";
import Form from "../../Components/FormGroup/Form";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../Components/Button/Button";
import { Link,  } from "react-router-dom";
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
    <>

      <div className="h-screen flex justify-center items-center ">
        <div className="border-[2px] px-[100px] py-[50px] border-black rounded-xl">
          <Toaster />
          <h1 className="text-4xl mb-[20px]">Login</h1>
          <Form
            ref={refEmailLogin}
            labelName="Email"
            inputId="email"
            labelFor="email"
            type="email"
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
            onClick={()=> props.handleLoginFromApp(refEmailLogin,refPasswordLogin)}
            buttoncss="px-[32px] py-[12px] border-[2px] mt-[50px] w-full border-black rounded-md mb-[20px]"
            buttonName="Login"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
