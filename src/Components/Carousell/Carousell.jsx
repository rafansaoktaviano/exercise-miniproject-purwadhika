import React from "react";
import { Carousel } from "flowbite-react";

export default function Carousell() {
  return (
    <div className="h-[600px] object-cover">
      <Carousel slideInterval={5000}>
        <div className="carousel-image">
          <img
            alt="..."
            src="https://assets.prod.bandsintown.com/images/homeIcon/heroBanner.webp"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="carousel-image">
          <img
            alt="..."
            src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2023/06/01/71d27e86-e401-455e-ad8a-77e3191fd3ea-1685625489373-57a70c10edcaf69e81f53ce09f6d0b09.jpg"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="carousel-image">
          <img
            alt="..."
            src="https://media.karousell.com/media/photos/products/2023/7/2/wts_1x_cat_2_lauv_malaysia_con_1688268795_e1600116_progressive.jpg"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="carousel-image">
          <img
            alt="..."
            src="https://static.mothership.sg/1/2023/05/cover-image-bpmerch.png"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="carousel-image">
          <img
            alt="..."
            src="https://images.dailyhive.com/20161003071800/adele1.jpg"
            className="object-contain h-full w-full"
          />
        </div>
      </Carousel>
    </div>
  );
}
