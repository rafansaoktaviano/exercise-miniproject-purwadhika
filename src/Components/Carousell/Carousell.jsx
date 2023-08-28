import React from "react";
import { Carousel } from "flowbite-react";

export default function Carousell() {
  return (
    <div className="h-[400px] md:h-[600px] object-cover mt-[62px]">
      <Carousel slideInterval={5000}>
        <div className="carousel-image">
          <img
            alt="..."
            src="https://assets.prod.bandsintown.com/images/homeIcon/heroBanner.webp"
            className="object-cover h-full w-full"
            style={{ objectPosition: "center top" }}
          />
        </div>
        <div className="carousel-image">
          <img
            alt="..."
            src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2023/06/01/71d27e86-e401-455e-ad8a-77e3191fd3ea-1685625489373-57a70c10edcaf69e81f53ce09f6d0b09.jpg"
            className="object-cover h-full w-full"
            style={{ objectPosition: "center top" }}
          />
        </div>
        <div className="carousel-image">
          <img
            alt="..."
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/music-fest-banner-design-template-18dbf359ea8b6ed79120e784f3dafa1e_screen.jpg?ts=1609512529"
            className="object-cover h-full w-full"
            style={{ objectPosition: "center top" }}
          />
        </div>
        <div className="carousel-image">
          <img
            alt="..."
            src="https://static.mothership.sg/1/2023/05/cover-image-bpmerch.png"
            className="object-cover h-full w-full"
            style={{ objectPosition: "center top" }}
          />
        </div>
        <div className="carousel-image">
          <img
            alt="..."
            src="https://images.dailyhive.com/20161003071800/adele1.jpg"
            className="object-contain h-full w-full"
            style={{ objectPosition: "center top" }}
          />
        </div>
      </Carousel>
    </div>
  );
}
