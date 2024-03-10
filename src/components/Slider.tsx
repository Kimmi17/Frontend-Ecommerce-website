import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const data: string[] = [
    "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center transition-opacity duration-500 ease-in-out opacity-100">
        <h2 className="text-white text-4xl font-bold mb-4">
          Welcome to Vascara
        </h2>
        <p className="text-white mb-6">
          Discover the latest trends in summer fashion. Elevate your style with
          Vascara's exclusive collection.
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
