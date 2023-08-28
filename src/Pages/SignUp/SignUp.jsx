import Form from "../../Components/FormGroup/Form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import NavbarWithCTAButton from "../../Components/Nav/Nav";
const SignUp = () => {
  const [data, setData] = useState(null);

  const refFullName = useRef();
  const refEmail = useRef();
  const refPassword = useRef();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitBtn = async () => {
    if (
      refFullName.current.value &&
      refEmail.current.value &&
      refPassword.current.value
    ) {
      try {
        const dataToSend = {
          nama_lengkap: refFullName.current.value,
          email: refEmail.current.value,
          password: refPassword.current.value,
          saldo: 1000000,
          point: 0,
        };

        await axios.post(`http://localhost:3000/users`, { ...dataToSend });
        fetchData();
        const loading = toast.loading("Loading");
        setTimeout(() => {
          toast.dismiss(loading);
          toast.success("Register Success!");
        }, 1000);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while registering.");
      }
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return (
    <>
      <div className="flex justify-center items-center w-full  h-screen ">
        <img className="bg-blue-500 w-1/2 h-full " src="https://images.unsplash.com/photo-1565035010268-a3816f98589a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80" >
          {/* <div className=" bg-blue-500  shadow-2xl rounded-xl w-full h-full p-[100px]">
            <div>
              <h1 className="text-center text-white text-4xl mb-[50px] mt-[50px] font-bold">
                HELLO!
              </h1>
              <h3 className=" text-white text-3xl leading-[50px] mb-[20px] font-semibold">
                Register to get your free 14 days Promo!!
              </h3>
              <p className=" text-white opacity-80">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </p>
            </div>
          </div> */}
        </img>
        <div className=" w-2/4 border-none xl:px-[150px] sm:px-[75px]  py-[50px] border-black rounded-xl">
          <h1 className="text-2xl mb-[20px]">SIGN UP</h1>
          <Form
            ref={refFullName}
            labelName="Fullname"
            labelFor="fullname"
            inputId="fullname"
          />
          <Form
            ref={refEmail}
            labelName="Email"
            labelFor="email"
            inputId="email"
          />
          <Form
            ref={refPassword}
            labelName="Password"
            labelFor="password"
            inputId="password"
          />
          <Button
            onClick={onSubmitBtn}
            buttonName="Sign Up"
            buttoncss="px-[32px] py-[12px] bg-blue-500 border-none mt-[50px] w-full  rounded-md mb-[20px] text-white"
          />
          <h1>
            Have an account ?{" "}
            <Link to="/login">
              <a className="text-blue-700 underline">Login</a>
            </Link>
          </h1>
        </div>

        <Toaster />
      </div>
    </>
  );
};

export default SignUp;
