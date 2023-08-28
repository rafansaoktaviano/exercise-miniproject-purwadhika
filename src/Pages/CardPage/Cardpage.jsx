import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../../Components/Button/Button";
import Form from "../../Components/FormGroup/Form";
import toast, { Toaster } from "react-hot-toast";

const Cardpage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams(); // get event Id
  const [dataEvent, setDataEvent] = useState(null); //
  const [dataUser, setDataUser] = useState(null); // all data user
  const [storeUser, setStoreUser] = useState(localStorage.getItem("user")); // localstorage user
  const [newData, setNewData] = useState(null); // data dari local storage
  const [btnDisable, setBtnDisable] = useState(false); // set btn disable atau engga
  const [btnReff, setBtnReff] = useState(false); //  set button disable atau ga pada reff btn
  const [reff, setReff] = useState([]);

  const [userTest, setUserTest] = useState(null);
  const [sumDiscount, setSumDiscount] = useState(null);
  const [ticket, setTicket] = useState(null);

  const refCodeRefferal = useRef(); // value input code Reff

  const getApi = async () => {
    const event = await axios.get(`http://localhost:3000/events/${eventId}`); //get  Event Id
    const dataBase = await axios.get(`http://localhost:3000/users`); // get semua database
    const localId = await axios.get(`http://localhost:3000/users/${storeUser}`); // data user di local storage
    const ticket = await axios.get(`http://localhost:3000/cetak_tiket`);

    setTicket(ticket.data);
    setNewData(localId.data);
    setDataEvent(event.data);
    setDataUser(dataBase.data);
  };

  function getRandomCode() {
    let result = "";
    for (let i = 0; i < 6; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      result += randomDigit;
    }
    return result;
  }

  useEffect(() => {
    getApi();
  }, [eventId]);

  if (dataEvent === null) {
    return <h1>Loading...</h1>;
  }
  // console.log(">>>", reff);
  // setSumDiscount(discountedPrice)
  console.log("BIAYA", dataEvent.biaya);
  console.log("BIAYA DISCOUNT", sumDiscount);
  const discountedPrice = (dataEvent.biaya * dataEvent.discount) / 100; // Total biaya discount
  // console.log(discountedPrice);
  // handle Code Refferal

  console.log(reff);
  const handleApplyRefferal = async (e) => {
    try {
      setBtnReff(true);
      const refferal = await axios.get(
        // cari kode Ref di data base
        `http://localhost:3000/cetak_tiket?kode_referal=${e}`
      );
      setReff(refferal.data);
      console.log("ref", refferal);
      console.log("eve", eventId);
      if (storeUser === ticket.userId) {
        toast.error("Refferal Already Used");
      } else if (refferal.data.length === 0) {
        setBtnReff(false);
        toast.error("Invalid Refferal 1");
      } else if (
        refferal.data.length > 0 &&
        refferal.data[0].eventId != eventId
      ) {
        // klo refferal kosong
        setBtnReff(false);

        if (refferal.data.length > 0 && refferal.data[0].eventId !== eventId) {
          setSumDiscount(dataEvent.biaya); // Reset sumDiscount when referral is not applied
        } else {
          setSumDiscount(dataEvent.biaya - discountedPrice);
        }
        toast.error("Refferal Invalid 2");
      } else if (
        refferal.data[0].eventId == eventId &&
        refferal.data.length > 0
      ) {
        // klo user apply refferal

        console.log("reeferal", refferal.data);

        // const userss = await axios.get(
        //   `http://localhost:3000/users/${refferal.data[0].userId}`
        // );

        // const test = { ...userss.data, point: userss.data.point + 1 };

        // const res = await axios.put(
        //   `http://localhost:3000/users/${refferal.data[0].userId}`,
        //   test
        // );

        // console.log(res);
        if (refferal.data.length > 0) {
          setSumDiscount(dataEvent.biaya - discountedPrice);
        } else {
          setSumDiscount(dataEvent.biaya); // Reset sumDiscount when referral is not applied
        }
        console.log(dataEvent);
        // console.log(response);
        toast.success("Code Refferal Applied");
      } else {
        toast.error("Refferal test");
      }
    } catch (error) {
      console.log(">>>", error);
    }
  };
  ////

  // handle Ticket Buy
  const handleBuyTicket = async (e) => {
    try {
      // const refferal1 = await axios.get(
      //   `http://localhost:3000/cetak_tiket?kode_referal=${e}` // get refferal code array
      // );
      // // console.log("Reff 1  >>>", refferal1);

      if (dataEvent.max_peserta === 0) {
        toast.error("FULL BOOKED");
      } else if (!storeUser && dataEvent.max_peserta > 0) {
        toast.error("Please login to buy tickets");
      } else if (newData.biaya === "0" && dataEvent.max_peserta > 0) {
        // kalo biaya event free
        toast.success("Buy Success");
      } else if (
        newData.saldo >= dataEvent.biaya &&
        reff.length === 0 &&
        dataEvent.max_peserta > 0
      ) {
        // kalo reff kosong dan saldo > biaya
        const updatedUser = {
          ...newData,
          saldo: newData.saldo - dataEvent.biaya,
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
          navigate(`/test/${eventId}`);

          toast.success("Buy Success");
        }, 1000);
      } else if (
        newData.saldo >= dataEvent.biaya &&
        reff.length > 0 &&
        dataEvent.max_peserta > 0
      ) {
        // klo pake code reff

        const checkReff = await axios.get(
          // cari kode Ref di data base
          `http://localhost:3000/cetak_tiket?kode_referal=${refCodeRefferal.current.value}`
        );

        const userReff = await axios.get(
          `http://localhost:3000/users/${checkReff.data[0].userId}`
        );

        console.log(userReff);

        const test = { ...userReff.data, point: userReff.data.point + 1 };
        const re2 = await axios.put(
          `http://localhost:3000/users/${checkReff.data[0].userId}`,
          test
        );
        // const resp = await axios.put();

        // console.log(resp);
        console.log(newData);
        const updatedUser = {
          ...newData,
          saldo: newData.saldo - sumDiscount,
          point: newData.point + 1,
        };

        const res = await axios.put(
          // ngurangin saldo dan nambah point in point by ID
          `http://localhost:3000/users/${newData.id}`,
          updatedUser
        );
        console.log(res.data);

        const updatedParticipate = {
          ...dataEvent,
          max_peserta: dataEvent.max_peserta - 1,
        };
        const response = await axios.put(
          // update max peserta
          `http://localhost:3000/events/${e}`,
          updatedParticipate
        );

        const setTicketData = {
          Price: sumDiscount,
          userId: storeUser,
          eventId: dataEvent.id,
          kode_referal: getRandomCode(),
        };

        const printTicket = await axios.post(
          `http://localhost:3000/cetak_tiket`,
          setTicketData
        );

        const loading = toast.loading("Loading");
        setBtnDisable(true);
        setTimeout(() => {
          toast.dismiss(loading);
          toast.success("Buy Success");
          console.log("test2", re2.data);
          console.log(response.data);
          console.log(printTicket.data);

          getApi();
        }, 1000);
        setTimeout(() => {
          navigate(`/test/${eventId}`);
        }, 3000);
      } else if (newData.saldo <= dataEvent.biaya) {
        // klo saldo nya kurang
        toast.error("Insufficient Saldo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("dataEvent:", dataEvent);
  console.log("dataUser:", dataUser);
  // console.log("storeUser:", storeUser);
  console.log("NewDATA:", newData);
  console.log("Reff", reff);
  console.log(eventId);

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

        <div className=" p-[50px] flex mt-[20px] justify-between bg-blue-500 rounded-3xl">
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
              buttoncss="w-full bg-blue-500 rounded-xl text-white font-bold mt-0 mb-[50px]"
              onClick={() => handleApplyRefferal(refCodeRefferal.current.value)}
              disabled={btnReff}
            />
          </>
        )}

        {dataEvent.biaya === "0" ? <div></div> : null}

        <div className="mt-[50px] mb-[30px] flex justify-between items-center">
          <h1 className="text-xl">Price :</h1>
          {dataEvent.biaya == 0 ? (
            <>
              <h1 className="text-xl">Free</h1>
            </>
          ) : (
            <div className="">
              <h1 className="text-xl text-green-600">
                {reff.length === 0 ? (
                  <>
                    <div>{dataEvent?.biaya.toLocaleString()}</div>
                  </>
                ) : (
                  <>
                    <div className="text-red-700 line-through">{dataEvent?.biaya.toLocaleString()}</div>
                    <div> {sumDiscount?.toLocaleString()}</div>
                  </>
                )}
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
          buttoncss="w-full bg-blue-500 rounded-xl text-white font-bold mt-0 mb-[50px]"
          onClick={() => handleBuyTicket(eventId)}
          disabled={btnDisable}
        />
      </div>
      <Toaster />
    </>
  );
};

export default Cardpage;
