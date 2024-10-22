"use client";
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination]);

const Galeri = () => {
  return (
    <section className="py-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Galeri</h2>
      <Swiper navigation pagination={{ clickable: true }} className="mySwiper">
        <SwiperSlide><img src="/images/masjid.jpg" alt="Gallery Image 1" className="rounded-lg"/></SwiperSlide>
        <SwiperSlide><img src="/images/masjid.jpg" alt="Gallery Image 2" className="rounded-lg"/></SwiperSlide>
        <SwiperSlide><img src="/images/masjid.jpg" alt="Gallery Image 3" className="rounded-lg"/></SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Galeri;
