import Form from "../../Components/FormGroup/Form";
import { Link } from "react-router-dom";
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
          saldo: 100000,
          point: 0,
        };

        await axios.post(`http://localhost:3000/users`, { ...dataToSend });
        fetchData();
        toast.success("Register Success!");
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

      <div className="flex justify-center items-center  h-screen">
        <div className="border-[2px] px-[100px] py-[50px] border-black rounded-xl">
          <h1 className="text-4xl mb-[20px]">SIGN UP</h1>
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
            buttoncss="px-[32px] py-[12px] border-[2px] mt-[50px] w-full border-black rounded-md mb-[20px]"
          />
        </div>

        <Toaster />
      </div>
    </>
  );
};

export default SignUp;
