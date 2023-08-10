import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../../Components/Button/Button";
import Form from "../../Components/FormGroup/Form";
import toast, { Toaster } from "react-hot-toast";

const Cardpage = () => {
  const { eventId } = useParams(); // get event Id
  const [dataEvent, setDataEvent] = useState(null); // 
  const [dataUser, setDataUser] = useState(null); // all data user 
  const [storeUser, setStoreUser] = useState(localStorage.getItem("user")); // localstorage user
  const [newData, setNewData] = useState(null); 
  const [btnDisable, setBtnDisable] = useState(false);
  const [btnReff, setBtnReff] = useState(false);
  const [reff, setReff] = useState(null);  

  const refCodeRefferal = useRef(); // value input code Reff

  const getApi = async () => {
    const event = await axios.get(`http://localhost:3000/events/${eventId}`); //get  Event Id
    const dataBase = await axios.get(`http://localhost:3000/users`); // get semua database
    const resp = await axios.get(`http://localhost:3000/users/${storeUser}`); // data user di local storage

    setNewData(resp.data);
    setDataEvent(event.data);
    setDataUser(dataBase.data);
  };

  useEffect(() => {
    getApi();
  }, [eventId]);

  if (dataEvent === null) {
    return <h1>Loading...</h1>;
  }
  const discountedPrice =
    dataEvent.biaya - (dataEvent.biaya * dataEvent.discount) / 100; // Total biaya discount
  const normalPrice = dataEvent.biaya; // normal price
  // handle Code Refferal
  const handleApplyRefferal = async (e) => {
    try {
      // console.log(e);
      setBtnReff(true);
      const refferal = await axios.get(
        `http://localhost:3000/cetak_tiket?kode_referal=${e}`
      );
      setReff(refferal.data);
      if (refferal.data.length === 0) {
        toast.error("Refferal Invalid");
        setBtnReff(false);
      } else {
        const applyRefferal = { ...dataEvent, biaya: discountedPrice };

        const resp = await axios.put( 
          `http://localhost:3000/events/${eventId}`,
          applyRefferal
        );
        setDataEvent(resp.data);
        console.log(dataEvent);
        toast.success("Code Refferal Applied");
      }
    } catch (error) {
      console.log(">>>", error);
    }
  };
  ////

  // handle Ticket Buy
  const handleBuyTicket = async (e) => {
    try {
      const refferal1 = await axios.get(
        `http://localhost:3000/cetak_tiket?kode_referal=${e}` // get refferal code array
      );
      console.log("Reff 1  >>>", refferal1);
      if (!storeUser) {
        toast.error("Please login to buy tickets");
      } else if (newData.biaya === "0") {
        // kalo biaya event free
        toast.success("Buy Success");
      } else if (newData.saldo >= dataEvent.biaya && reff === null) {
        // kalo reff kosong dan saldo > biaya
        const updatedUser = {
          ...newData,
          saldo: newData.saldo - normalPrice,
        };
        const res = await axios.put(
          // update saldo user dari id
          `http://localhost:3000/users/${newData.id}`,
          updatedUser
        );

        const updatedParticipate = {
          ...dataEvent,
          max_peserta: dataEvent.max_peserta - 1,
        };
        const response = await axios.put(
          // update max peserta user dari id event
          `http://localhost:3000/events/${e}`,
          updatedParticipate
        );

        const loading = toast.loading("Loading");
        setBtnDisable(true);

        setTimeout(() => {
          toast.dismiss(loading);

          console.log(res.data);
          console.log(response.data);
          getApi();

          toast.success("Buy Success");
        }, 1000);
      } else if (newData.saldo >= dataEvent.biaya && reff.length > 0) {
        // klo pake code reff
        console.log("update");
        const updatedUser = {
          ...newData,
          saldo: newData.saldo - discountedPrice,
          point: newData.point + 1,
        };

        const res = await axios.put(
          `http://localhost:3000/users/${newData.id}`,
          updatedUser
        );
        console.log(res.data);

        const updatedParticipate = {
          ...dataEvent,
          max_peserta: dataEvent.max_peserta - 1,
        };
        const response = await axios.put(
          `http://localhost:3000/events/${e}`,
          updatedParticipate
        );

        const loading = toast.loading("Loading");
        setBtnDisable(true);
        setTimeout(() => {
          toast.dismiss(loading);
          toast.success("Buy Success");

          console.log(response.data);

          getApi();
        }, 1000);
      } else if (newData.saldo <= dataEvent.biaya) {
        toast.error("Insufficient Saldo");
      } else {
        toast.error("Login First ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("dataEvent:", dataEvent);
  console.log("dataUser:", dataUser);
  // console.log("storeUser:", storeUser);
  console.log("NewDATA:", newData);

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
        <div className="mb-[50px]">
          <h1 className="mt-[50px] text-xl mb-[50px]">Description</h1>
          <h1 className="text-zinc-500">{dataEvent.deskripsi_detail}</h1>
        </div>
        {dataEvent.biaya === 0 ? (
          <div></div>
        ) : (
          <>
            <Form
              labelName="Voucher / Token :"
              labelFor="token"
              inputId="token"
              ref={refCodeRefferal}
              inputcss="w-full mt-[10px]"
            />

            <Button
              buttonName="Apply Refferal"
              buttoncss="w-full bg-cyan-700 rounded-xl text-white font-bold mt-0 mb-[50px]"
              onClick={() => handleApplyRefferal(refCodeRefferal.current.value)}
              disabled={btnReff}
            />
          </>
        )}

        {dataEvent.biaya === "0" ? <div></div> : null}

        <div className="mt-[50px] mb-[30px] flex justify-between items-center">
          <h1 className="text-xl">Price :</h1>
          {dataEvent.biaya === "0" ? (
            <>
              <h1 className="text-xl">Free</h1>
            </>
          ) : (
            <div className="">
              <h1 className="text-xl text-green-600">
                Rp. {dataEvent.biaya.toLocaleString()}
              </h1>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <h1>Seat Left :</h1>
          <h1>{dataEvent.max_peserta}</h1>
        </div>

        <div>
          <div className="flex justify-between  items-center border-t-[3px] mb-[20px] mt-[75px]">
            <h1>Saldo :</h1>
            <h1>Rp. {newData.saldo.toLocaleString()}</h1>
          </div>
          <div className="flex justify-between  items-center  mb-[20px]">
            <h1>Points :</h1>
            <h1>{newData.point}</h1>
          </div>
        </div>

        <Button
          buttonName="Buy Ticket"
          buttoncss="w-full bg-cyan-700 rounded-xl text-white font-bold mt-0 mb-[50px]"
          onClick={() => handleBuyTicket(eventId)}
          disabled={btnDisable}
        />
      </div>
      <Toaster />
    </>
  );
};

export default Cardpage;
