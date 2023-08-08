import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../Components/Button/Button";
import Form from "../../Components/FormGroup/Form";
import toast, { Toaster } from "react-hot-toast";
const Cardpage = () => {
  const { eventId } = useParams();
  const [dataEvent, setDataEvent] = useState(null);
  const [dataUser, setDataUser] = useState(null);
  const [storeUser, setStoreUser] = useState(
    localStorage.getItem("user")
  );
    const [newData, setNewData] = useState(null)


  const getApi = async () => {
    const res = await axios.get(`http://localhost:3000/events/${eventId}`);
    const response = await axios.get(`http://localhost:3000/users`);
    const resp = await axios.get(`http://localhost:3000/users/${storeUser}`)

    setDataEvent(res.data);
    setDataUser(response.data);
    setNewData(resp.data)
  };
  console.log(newData);
  useEffect(() => {
    getApi();
  }, [eventId]);

  if (dataEvent === null) {
    return <h1>Loading...</h1>;
  }

  const handleBuyTicket = async () => {
    if (newData && newData.saldo >= discounted) {
      const updatedUser = { ...newData, saldo: newData.saldo - discounted };
      const res = await axios.put(`http://localhost:3000/users/${storeUser}`, updatedUser)
      console.log(res.data);
      const updatedParticipate = {...dataEvent, max_peserta: dataEvent.max_peserta - 1}

      const resp = await axios.put(`http://localhost:3000/events/${eventId}`, updatedParticipate)
      console.log(resp.data);

      setDataEvent((prevDataEvent) => ({
        ...prevDataEvent,
        max_peserta: dataEvent.max_peserta - 1,
      }));

    } else {
      toast.error("Insufficient Saldo / Login First");
    }
  };

  console.log("dataEvent:", dataEvent);
  console.log("dataUser:", dataUser);
  console.log("storeUser:", storeUser);
  const discounted = (dataEvent.biaya * (100 - dataEvent.discount)) / 100;

  return (
    <>
      <div className="px-[100px] mt-[50px] ">
        <img
          className="w-full h-[500px] object-contain"
          src={dataEvent.image_link}
          alt={dataEvent.nama_event}
        />
        <div className="w-full border-b-[5px]">
          <div className=" mt-[40px] mb-[50px] w-full ">
            <h1 className="text-6xl ">{dataEvent.nama_event}</h1>
          </div>
        </div>

        <div className=" p-[50px] flex mt-[20px] justify-between bg-cyan-700 rounded-3xl">
          <div className="">
            <h1 className=" text-xl text-white ">{dataEvent.kota}</h1>
            <h1 className="text-white">{dataEvent.detail_lokasi}</h1>
          </div>
          <div className="">
            <h1 className="text-xl text-white">{dataEvent.date}</h1>
            <h1 className="text-xl text-white">{dataEvent.time}</h1>
          </div>
        </div>
        <div>
          <h1 className="mt-[50px] text-xl">Description</h1>
          <h1 className="text-zinc-500">{dataEvent.deskripsi_detail}</h1>
        </div>
        <div className="mt-[50px] mb-[30px] flex justify-between items-center">
          <h1 className="text-xl">Price :</h1>
          {dataEvent.biaya === "0" ? (
            <h1 className="text-xl">Free</h1>
          ) : (
            <div className="">
              <h1 className="text-xl text-red-600 line-through">
                Rp. {dataEvent.biaya}
              </h1>
              <h1 className="text-xl text-green-400">Rp. {discounted}</h1>
            </div>
          )}
        </div>
        <Form
          labelName="Voucher / Token :"
          labelFor="token"
          inputId="token"
          inputcss="w-full mt-[10px]"
        />
        <Button
          buttonName="Buy Ticket"
          buttoncss="w-full bg-cyan-700 rounded-xl text-white font-bold mt-0 mb-[50px]"
          onClick={handleBuyTicket}
        />
      </div>
      <Toaster />
    </>
  );
};

export default Cardpage;
