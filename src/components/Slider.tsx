import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const data: string[] = [
    "https://puresense.co.in/cdn/shop/articles/1_d95e1a0b-2e3f-4a0b-a604-6b2eef1d498c.jpg?v=1668491116",
    "https://cdn.shopify.com/s/files/1/0012/1657/7656/files/what-does-an-avocado-face-mask-do.jpg?v=1648143909",
    "https://www.treehugger.com/thmb/bYYpomvhjeG99rXf37FCto_Hrbw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1-e84f1eb2c3f74fe3be2293178679396a.jpg",
  ];
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative overflow-hidden h-screen">
      <div className="absolute inset-0 flex justify-center items-center">
        <div
          className="container flex min-w-full px-0"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {data.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className="min-w-full h-full object-cover"
              style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <h2 className="text-white text-4xl font-bold mb-4 animate-text-running">
          Welcome to Innisfree!
        </h2>
        <p className="text-white mb-6 animate-text-running">
          Discover the latest skincare product with Innisfree. Your Skincare is
          Your healthcare!
        </p>
      </div>

      <div className="icons absolute bottom-10 left-0 right-0 mx-auto flex justify-center">
        <div
          className="icon bg-white p-2 rounded-full shadow-md cursor-pointer"
          onClick={prevSlide}
        >
          <BsChevronLeft className="text-gray-700" />
        </div>
        <div
          className="icon bg-white p-2 rounded-full shadow-md cursor-pointer ml-4"
          onClick={nextSlide}
        >
          <BsChevronRight className="text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
