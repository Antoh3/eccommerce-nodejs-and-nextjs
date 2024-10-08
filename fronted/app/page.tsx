"use client";

import Navbar from "@/components/Navbar";
import img1 from "/public/images/image-product-1.jpg";
import img2 from "/public/images/image-product-2.jpg";
import img3 from "/public/images/image-product-3.jpg";
import img4 from "/public/images/image-product-4.jpg";
import Image, { StaticImageData } from "next/image";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    img: img1,
  },
  {
    img: img2,
  },
  {
    img: img3,
  },
  {
    img: img4,
  },
];

interface Slide {
  img: StaticImageData;
}

export default function Home() {
  const [itemCount, setItemCount] = useState<number>(1);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [cartBadgeCount, setCartBadgeCount] = useState<number>(0);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);
  const [curentIndex, setCurrentindex] = useState<number>(0);
  const [slidesModalOpen, setSlidesModalOpen] = useState<boolean>(false);

  console.log(itemCount);

  const addToCart = () => {
    setCartBadgeCount((prevCount) => prevCount + 1);

    if (itemCount !== 1) {
      setCartItemCount((prevCount) => (prevCount += itemCount));
      setItemCount(1);
    } else {
      setCartItemCount((prevCount) => prevCount + 1);
    }

    setAddedToCart(true);
    // Set addedToCart to false after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000); // 2000 milliseconds = 2 seconds
  };

  const addCount = () => {
    setItemCount((prevCount) => prevCount + 1);
  };

  const minusCount = () => {
    if (itemCount !== 1) {
      setItemCount((prevCount) => prevCount - 1);
    }
  };

  const prevSlide = () => {
    const isFirstSlide = curentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : curentIndex - 1;
    setCurrentindex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = curentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : curentIndex + 1;
    setCurrentindex(newIndex);
  };

  const gotoSlideIndex = (index: number) => {
    setCurrentindex(index);
    setSlidesModalOpen(true);
  };

  return (
    <main className="w-full h-full bg-white">
      {/* Container */}
      <div className="w-full h-full min-h-screen max-w-[1000px] mx-auto">
        {/* Navbar  */}
        <Navbar
          cartItemCount={cartItemCount}
          cartBadgeCount={cartBadgeCount}
          setCartBadgeCount={setCartBadgeCount}
          setCartItemCount={setCartItemCount}
        />

        {/* Content  */}
        <div className="w-full h-full lg:flex justify-center items-center gap-20 pt-16 md:py-32">
          {/* Image  */}
          <div className="">
            <div className="relative w-full">
              <Image
                src={slides[curentIndex].img}
                alt="shoe image 1"
                className="lg:hidden lg:rounded-xl"
              />
              <Image
                src={slides[0].img}
                alt="shoe image 1"
                className="hidden lg:block lg:rounded-xl"
              />
              <BsChevronCompactLeft
                size={30}
                className="w-10 h-10 lg:hidden absolute top-1/2 left-5 text-gray-900 font-black p-2 bg-white rounded-full cursor-pointer hover:bg-gray-200 hover:scale-105 duration-200"
                onClick={prevSlide}
              />
              <BsChevronCompactRight
                size={30}
                className="w-10 h-10 lg:hidden absolute top-1/2 right-5 text-gray-900 font-black p-2 bg-white rounded-full cursor-pointer hover:bg-gray-200 hover:scale-105 duration-200"
                onClick={nextSlide}
              />
            </div>
            <div className="hidden lg:flex justify-between items-center mt-8">
              {slides.map((slide, index) => (
                <Image
                  key={index}
                  src={slide.img}
                  alt={`shoe image ${index + 1}`}
                  className="w-20 rounded-xl cursor-pointer hover:scale-105 duration-200"
                  onClick={() => gotoSlideIndex(index)}
                />
              ))}
            </div>
          </div>
          {/* Product Details */}
          <div className="p-6">
            <h1 className="text-orange-500 lg:text-sm font-bold uppercase tracking-widest">
              Sneaker Company
            </h1>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-4">
              Fall Limited Edition Sneakers
            </h1>
            <p className="text-gray-500 leading-7 mt-4">
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer sole, they&rsquo;ll withstand
              everything the the weather can offer.
            </p>
            <div className="flex lg:flex-col justify-between lg:items-start items-center mt-6">
              <div className="flex items-center font-bold gap-2">
                <h1 className="text-2xl  text-gray-900">$125.00 </h1>
                <span className="text-base ms-2 text-orange-600 bg-orange-100  px-2 rounded">
                  50%
                </span>
              </div>
              <p className="text-gray-400 font-semibold line-through ">
                $250.00
              </p>
            </div>
            <div className="w-full lg:flex items-center gap-6">
              <div className="w-full md:w-2/5 flex justify-between items-center mt-8 lg:mt-4 text-orange-600 text-2xl font-bold rounded-xl bg-gray-100 py-4 lg:py-2 px-6">
                <p
                  onClick={minusCount}
                  className="hover:scale-125 duration-200 cursor-pointer"
                >
                  -
                </p>
                <p className="text-lg text-gray-900">{itemCount}</p>
                <p
                  onClick={addCount}
                  className="hover:scale-125 duration-200 cursor-pointer"
                >
                  +
                </p>
              </div>
              <button
                onClick={addToCart}
                className="w-full md:w-3/5 flex justify-center items-center gap-4 py-4 lg:py-2 mt-4 rounded-xl bg-orange-500 text-white font-bold hover:scale-105 duration-200 active:bg-orange-600"
              >
                <AiOutlineShoppingCart size={20} /> Add to cart
              </button>
            </div>
          </div>
        </div>

        {/* overlay  */}
        {slidesModalOpen && (
          <div className="fixed hidden lg:block top-0 left-0 w-full h-screen bg-black/60 z-20" />
        )}

        {/* Slides Modal  */}
        <div
          className={
            slidesModalOpen
              ? "w-[400px] h-[400px] hidden lg:block rounded-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform z-30 pt-5 ease-in duration-300"
              : "w-[400px] h-[400px] rounded-xl fixed top-[-150%] left-1/2 -translate-x-1/2 -translate-y-1/2 transform z-30 pt-5 ease-in duration-300"
          }
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[curentIndex].img}
              alt="shoe image 1"
              className="w-full h-full lg:rounded-xl"
            />
            <BsChevronCompactLeft
              size={30}
              className="w-10 h-10 absolute top-1/2 -left-5 text-gray-900 font-black p-2 bg-white rounded-full cursor-pointer hover:bg-gray-200 hover:scale-105 duration-200"
              onClick={prevSlide}
            />
            <BsChevronCompactRight
              size={30}
              className="w-10 h-10 absolute top-1/2 -right-5 text-gray-900 font-black p-2 bg-white rounded-full cursor-pointer hover:bg-gray-200 hover:scale-105 duration-200"
              onClick={nextSlide}
            />
            <AiOutlineClose
              onClick={() => setSlidesModalOpen(false)}
              size={20}
              className="absolute -top-8 right-0 font-bold text-white cursor-pointer hover:scale-125 duration-200"
            />
          </div>
        </div>

        {/* added to cart modal  */}
        <AnimatePresence>
          {addedToCart && (
            <motion.div
              className="fixed h-20 w-[300px] flex justify-center items-center text-white text-xl font-semibold bg-black/60 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl"
              exit={{ opacity: 0 }}
            >
              item has been added
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
