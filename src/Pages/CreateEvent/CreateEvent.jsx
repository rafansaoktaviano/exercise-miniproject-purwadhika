import React from "react";
import axios from "axios";
import Form from "../../Components/FormGroup/Form";
import { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../Components/Button/Button";
const CreateEvent = () => {
  const [eventData, setEventData] = useState(null);
  const refEventname = useRef();
  const refCategoryEvent = useRef();
  const refDate = useRef();
  const refTime = useRef();
  const refCity = useRef();
  const refLocation = useRef();
  const refEventType = useRef();
  const refPrice = useRef();
  const refImageLink = useRef();
  const refMaxParticipate = useRef();
  const refDescriptionDetails = useRef();
  const refDescLil = useRef();
  const refDiscount = useRef();

  //   const [imageUrl, setImageUrl] = useState("");

  const getApi = async () => {
    try {
      const response = await axios.get("http://localhost:3000/events");
      setEventData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateEvent = async () => {
    try {
      const datas = {
        nama_event: refEventname.current.value,
        kategori_event: refCategoryEvent.current.value,
        date: refDate.current.value,
        time: refTime.current.value,
        kota: refCity.current.value,
        detail_lokasi: refLocation.current.value,
        jenis_event: refEventType.current.value,
        biaya: refPrice.current.value,
        image_link: refImageLink.current.value,
        max_peserta: refMaxParticipate.current.value,
        deskripsi_detail: refDescriptionDetails.current.value,
        deskripsi_singkat: refDescLil.current.value,
        discount: refDiscount.current.value,
        userId: localStorage.getItem("user"),
      };
      const res = await axios.post("http://localhost:3000/events", {
        ...datas,
      });
      console.log(res.data);
      toast.success("Create Event Success");
    } catch (error) {
      toast.error("Error creating event");
    }
  };

  useEffect(() => {
    getApi();
  }, []);
  if (eventData === null) return <h1>SABAR</h1>;
  console.log(eventData);
  return (
    <div className="mt-[62px]">
      {/* <Form
        ref={refEventname}
        labelName="Event Name"
        inputId="eventname"
        labelFor="eventname"
      />
      <Form
        ref={refCategoryEvent}
        labelName="Category Event"
        inputId="category"
        labelFor="category"
      />
      <Form
        ref={refDate}
        labelName="Date"
        inputId="date"
        labelFor="date"
        type="date"
      />
      <Form
        ref={refTime}
        labelName="Time"
        inputId="time"
        labelFor="time"
        type="time"
      />
      <Form
        ref={refCity}
        labelName="City"
        inputId="city"
        labelFor="city"
        type="text"
      />
      <Form
        ref={refLocation}
        labelName="Location"
        inputId="location"
        labelFor="location"
        type="text"
      />
      <Form
        ref={refEventType}
        labelName="Event Type"
        inputId="event-type"
        labelFor="event-type"
        type="text"
      />
      <Form
        ref={refPrice}
        labelName="Price"
        inputId="price"
        labelFor="price"
        type="number"
      />
      <Form
        ref={refImageLink}
        labelName="Image Link"
        inputId="image"
        labelFor="image"
        type="text"
      />
      <Form
        ref={refMaxParticipate}
        labelName="Max Participate"
        inputId="participate"
        labelFor="participate"
        type="number"
      />
      <Form
        ref={refDescriptionDetails}
        labelName="Description Details"
        inputId="desc"
        labelFor="desc"
        type="text"
      />
      <Form
        ref={refDescLil}
        labelName="Desc lil"
        inputId="lildesc"
        labelFor="lildesc"
        type="text"
      />
      <Form
        ref={refDiscount}
        labelName="Discount"
        inputId="discount"
        labelFor="discount"
        type="number"
      />
      <Button onClick={onCreateEvent} buttonName="Create Event" buttoncss=""/> */}
      <div className="border md:px-40 flex flex-col py-10">
        <span className="text-4xl m-auto font-bold justify-center items-center align-middle">
          Create Your Event{" "}
        </span>
        <form
          action=""
          className="rounded-lg shadow-gray-500 py-10 px-16 grid md:grid-cols-2 gap-3"
        >
          <Form
            ref={refEventname}
            labelName="Event Name"
            inputId="eventname"
            labelFor="eventname"
          />

          <Form
            ref={refDate}
            labelName="Date"
            inputId="date"
            labelFor="date"
            type="date"
          />
          <Form
            ref={refTime}
            labelName="Time"
            inputId="time"
            labelFor="time"
            type="time"
          />

          <Form
            ref={refLocation}
            labelName="Location"
            inputId="location"
            labelFor="location"
            type="text"
          />

          <Form
            ref={refPrice}
            labelName="Price"
            inputId="price"
            labelFor="price"
            type="number"
          />
          <Form
            ref={refImageLink}
            labelName="Image Link"
            inputId="image"
            labelFor="image"
            type="text"
          />
          <Form
            ref={refMaxParticipate}
            labelName="Max Participate"
            inputId="participate"
            labelFor="participate"
            type="number"
          />

          <Form
            ref={refDescLil}
            labelName="Desc lil"
            inputId="lildesc"
            labelFor="lildesc"
            type="text"
          />
          <Form
            ref={refDiscount}
            labelName="Discount"
            inputId="discount"
            labelFor="discount"
            type="number"
          />
          <Form

            labelName="Other"
            inputId="discount"
            labelFor="discount"
            type="number"
          />
        

          <select
            required
            ref={refCategoryEvent}
            name="kategori_event"
            className="  mb-6 text-sm border rounded w-full text-slate-700 placeholder:opacity-50"
          >
            <option>Kategori Event</option>
            <option value="anime">Anime</option>
            <option value="seni">Seni</option>
            <option value="olahraga">Olahraga</option>
            <option value="komedi">Komedi</option>
            <option value="edukasi">Edukasi</option>
          </select>

          <select
            required
            ref={refCity}
            name="kota"
            className="mb-6 text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50"
          >
            <option>Pilih Kota</option>
            <option value="jakarta">Jakarta</option>
            <option value="bogor">Bogor</option>
            <option value="tangerang">Tangerang</option>
            <option value="bekasi">Bekasi</option>
          </select>

          <select
            required
            ref={refEventType}
            name="jenis_event"
            className="mb-6 text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50"
          >
            <option>Online / Ofline</option>
            <option value="online">Online</option>
            <option value="ofline">Ofline</option>
          </select>

          <textarea
            required
            ref={refDescriptionDetails}
            name="deskripsi_detail"
            placeholder="deskripsi detail"
            className=""
          >
            Deskripsi Detail
          </textarea>
        <Button
          onClick={onCreateEvent}
          buttonName="Create Event"
          buttoncss="bg-blue-500 text-white w-full "
        />
        </form>
      </div>



      <Toaster />
    </div>
  );
};

export default CreateEvent;
