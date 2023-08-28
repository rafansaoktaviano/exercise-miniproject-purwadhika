import React, { useEffect, useState } from "react";
import DefaultNavbar from "../../Components/Nav/Nav";
import Carousell from "../../Components/Carousell/Carousell";
import { useNavigate } from "react-router-dom";
import Cards from "../../Components/Card/Card";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Search from "../../Components/Search/Search";
const MainPage = () => {
  const [dataEvent, setDataEvent] = useState([]);
  const [category, setCategory] = useState("All Categories");
  const navigate = useNavigate();

  const getApiEvents = async () => {
    const res = await axios.get("http://localhost:3000/events");
    const response = await axios.get("http://localhost:3000/cetak_tiket");
    setDataEvent(res.data);
  };

  const filterEvent = (category) => {
    setCategory(category);
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
        localStorage.setItem("eventID", id);
      }, 3000);
    }
  };
  useEffect(() => {
    getApiEvents();
  }, []);

  console.log(dataEvent);
  return (
    <div className="grid ">
      <div className="bg-[url('https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')]  w-full h-[443px] mt-[62px] bg bg-black object-cover  flex justify-center flex-col">
        <h1 className="text-center text-5xl text-white mb-[20px]">
          The safest way to buy and sell tickets
        </h1>
        <div>
          <Search className="px-[600px]" />
        </div>
      </div>

      <div className="flex px-[100px] justify-between mt-[70px] items-center">
        <h1 className="border-2 px-[24px] py-[12px]">Trending</h1>
        <h1>See More</h1>
      </div>
      <div className="flex px-[100px] gap-[40px] flex-wrap mb-[100px]">
        {dataEvent.map((item) => {
          return (
            <Cards
              onClick={() => onClickCard(item.id)}
              key={item.id}
              srcImg={item.image_link}
              eventName={item.nama_event}
              descLil={item.deskripsi_singkat}
              city={item.kota}
              date={item.date}
              // location={item.detail_lokasi}
            />
          );
        })}
      </div>
      <div className="px-[100px]  flex gap-[20px]">
        <button
          onClick={() => filterEvent("All Categories")}
          className="px-[24px] py-[12px] border-[2px]"
        >
          All Categories
        </button>
        <button
          onClick={() => filterEvent("Anime")}
          className="px-[24px] py-[12px] border-[2px]"
        >
          Anime
        </button>
        <button
          onClick={() => filterEvent("Music")}
          className="px-[24px] py-[12px] border-[2px]"
        >
          Music
        </button>
        <button
          onClick={() => filterEvent("Gaming")}
          className="px-[24px] py-[12px] border-[2px]"
        >
          Gaming
        </button>
        <button
          onClick={() => filterEvent("Food & Drink")}
          className="px-[24px] py-[12px] border-[2px]"
        >
          Food & Drink
        </button>
      </div>
      <div className="flex px-[100px] gap-[40px] flex-wrap mb-[100px]">
        {dataEvent
          .filter((item) => {
            return (
              category === "All Categories" || item.kategori_event === category
            );
          })
          .map((item) => {
            return (
              <Cards
                onClick={() => onClickCard(item.id)}
                key={item.id}
                srcImg={item.image_link}
                eventName={item.nama_event}
                descLil={item.deskripsi_singkat}
                city={item.kota}
                date={item.date}
                // location={item.detail_lokasi}
              />
            );
          })}
      </div>

      <Toaster />
    </div>
  );
};

export default MainPage;
