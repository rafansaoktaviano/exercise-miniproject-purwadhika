import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Refferalpage = () => {
  const { idReffCard } = useParams();
  const [dataEvent, setDataEvent] = useState(null);
  const [userLocalId, setUserLocalId] = useState(localStorage.getItem("user"));
  const [getReff, setGetReff] = useState(null);
  const getApi = async (props) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/events?id=${idReffCard}`
      );
      const response = await axios.get(
        `http://localhost:3000/cetak_tiket?id=${idReffCard}`
      );
    const tiket = await axios.get(`http://localhost:3000/cetak_tiket`)
    console.log(tiket.data[tiket.data]);
      //   console.log(response.data);
      setGetReff(response.data[0]);
      setDataEvent(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("userId: ", userLocalId);
  console.log("DataEvent :", dataEvent);
  console.log("Reff Kode", getReff);

  useEffect(() => {
    getApi();
  }, [idReffCard]);

  if (getReff === null) {
    return <h1>loading</h1>;
  }
  return (
    <div className="h-screen px-[100px] w-full  flex justify-center items-center ">
      <div className="w-full bg-blue-500  h-[500px] rounded-[75px] text-white px-[100px] flex flex-col justify-between py-[100px]">
        <div className="flex justify-center ">
          <div className="text-4xl">{dataEvent.nama_event}</div>
        </div>
        <div className="justify-between flex ">
          <div>Category :</div>
          <div>{dataEvent.kategori_event}</div>
        </div>
        <div className="justify-between flex ">
          <div>Date :</div>
          <div>{dataEvent.date}</div>
        </div>

        <div className="justify-between flex ">
          <div>kota :</div>
          <div>{dataEvent.kota}</div>
        </div>
        <div className="justify-between flex ">
          <div>detail_lokasi :</div>
          <div>{dataEvent.detail_lokasi}</div>
        </div>
        <div className="justify-between flex ">
          <div>time :</div>
          <div>{dataEvent.time}</div>
        </div>
        <div className="justify-between flex ">
          <div>Price :</div>
          <div>{getReff.Price}</div>
        </div>
        <div className="justify-center flex text-4xl  gap-[50px]">
          <div>Your Code Refferal :</div>
          <div>{getReff.kode_referal}</div>
        </div>
      </div>
    </div>
  );
};

export default Refferalpage;
