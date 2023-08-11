import React, { useEffect, useState } from "react";
import DefaultNavbar from "../../Components/Nav/Nav";
import Carousell from "../../Components/Carousell/Carousell";
import { useNavigate } from "react-router-dom";
import Cards from "../../Components/Card/Card";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const MainPage = () => {
  const [dataEvent, setDataEvent] = useState([]);
  const navigate = useNavigate();
  const getApiEvents = async () => {
    const res = await axios.get("http://localhost:3000/events");
    setDataEvent(res.data);
  };

  const isLoggedIn = localStorage.getItem("user");

  const onClickCard = (id) => {
    if (isLoggedIn) {
      navigate(`/cardpage/${id}`);
    } else {
      const login = toast.error("Login First");

      setTimeout(() => {
        toast.dismiss(login);
        navigate("/login");
      }, 3000);
    }
  };
  useEffect(() => {
    getApiEvents();
  }, []);

  console.log(dataEvent);
  return (
    <div className="grid">
      <Carousell />
      <div className="flex px-[100px] justify-between mt-[70px] items-center">
        <h1 className="border-2 px-[24px] py-[12px]">Trending</h1>
        <h1>See More</h1>
      </div>
      <div className="flex px-[100px] gap-[40px] flex-wrap">
        {dataEvent.map((item) => {
          return (
            <Cards
              onClick={() => onClickCard(item.id)}
              key={item.id}
              srcImg={item.image_link}
              eventName={item.nama_event}
              descLil={item.deskripsi_singkat}
              city={item.kota}
              location={item.detail_lokasi}
            />
          );
        })}
      </div>
      <Toaster />
    </div>
  );
};

export default MainPage;
