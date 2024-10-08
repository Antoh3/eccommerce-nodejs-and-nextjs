"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import img1 from "/public/images/image-product-1.jpg";
import profile from "/public/profile.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  cartItemCount: number;
  cartBadgeCount: number;
  setCartBadgeCount: Dispatch<SetStateAction<number>>;
  setCartItemCount: Dispatch<SetStateAction<number>>;
}

const Navbar = ({
  cartItemCount,
  cartBadgeCount,
  setCartBadgeCount,
  setCartItemCount,
}: NavbarProps) => {
  const [nav, setNav] = useState<boolean>(false);
  const [cartModal, setCartModal] = useState<boolean>(false);
  const [hasOrdered, setHasOrdered] = useState<boolean>(false);

  const handleOrder = () => {
    setCartBadgeCount(0);
    setCartItemCount(0);
    setHasOrdered(true);
    // Set HassetHasOrdered to false after 1 seconds
    setTimeout(() => {
      setHasOrdered(false);
    }, 1000); // 1000 milliseconds = 1 seconds
  };

  // console.log(hasOrdered);

  const openCartModal = () => {
    setCartModal(true);
    setCartBadgeCount(0);
  };

  const closeCartModal = () => {
    setCartModal(false);
    setCartBadgeCount(0);
  };

  const deleteCartItems = () => {
    setCartItemCount(0);
    setCartBadgeCount(0);
  };

  return (
    <>
      <div className="fixed max-w-[1000px] mx-auto bg-white w-full h-16 md:h-20 flex justify-between items-center px-8 lg:px-0 border-b z-10">
        <div className=" flex items-center gap-4  font-bold text-gray-600">
          <GiHamburgerMenu
            onClick={() => setNav(true)}
            className="md:hidden text-xl md:text-2xl cursor-pointer"
          />
          <h1 className="text-2xl text-gray-700">sneakers</h1>
          <ul className="hidden md:flex items-center gap-6 font-normal ms-8 text-sm text-gray-500 ">
            <li>Collections</li>
            <li>Men</li>
            <li>Women</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="flex items-center gap-4 md:gap-8 text-2xl font-bold text-gray-600 z-20">
          <div className="relative">
            <AiOutlineShoppingCart
              className="cursor-pointer hover:scale-110 duration-200"
              onClick={openCartModal}
            />
            <div
              className={
                cartBadgeCount > 0
                  ? "w-5 h-5 absolute -top-2.5 -right-2.5 text-xs flex justify-center items-center text-white p-1 rounded-full bg-red-500"
                  : ""
              }
            >
              {cartBadgeCount > 0 ? cartItemCount : ""}
            </div>
            <AnimatePresence>
              {cartModal && (
                <motion.div
                  className="fixed w-[95%] sm:w-[70%] md:w-[400px] min-h-[200px] h-[47%] top-[220px] lg:top-[228px] left-1/2 md:left-3/4 bg-white rounded-xl transform -translate-x-1/2 -translate-y-1/2 shadow-2xl border"
                  exit={{ opacity: 0 }}
                >
                  <div
                    onClick={closeCartModal}
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-300 hover:text-white cursor-pointer transform duration-300 "
                  >
                    <AiOutlineClose />
                  </div>
                  <h1 className="m-5 font-bold text-gray-900">Cart</h1>
                  <hr className="shadow" />
                  <div className="w-full m-5">
                    {cartItemCount > 0 ? (
                      <div className="w-full h-full flex flex-col justify-between gap-6 sm:gap-0">
                        <div className="w-full h-[40%] flex justify-between items-center gap-2">
                          <Image
                            src={img1}
                            alt="shoe image 1"
                            className="w-1/5 rounded-xl"
                          />
                          <div className="flex w-4/5 justify-around items-center text-sm sm:text-base">
                            <div>
                              <h1>Fall Limited Edition Sneakers</h1>
                              <p>
                                $125.00 x {cartItemCount + " "}
                                <span className="font-bold text-gray-900">
                                  ${cartItemCount * 375}.00
                                </span>
                              </p>
                            </div>
                            <BsFillTrashFill
                              onClick={deleteCartItems}
                              size={25}
                              className="w-1/5 me-2 cursor-pointer hover:scale-105 text-gray-500 duration-200 hover:text-gray-600"
                            />
                          </div>
                        </div>
                        <button
                          onClick={handleOrder}
                          className="w-[90%] py-3 rounded-xl bg-orange-500 mt-6 text-white text-sm font-semibold"
                        >
                          Checkout
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full mt-20 flex justify-center items-center">
                        <h1 className="text-gray-500 me-10">
                          Your cart is empty
                        </h1>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="https://justinelapura.vercel.app/">
            <Image
              src={profile}
              alt="profile image"
              className="w-8 rounded-full"
            />
          </Link>
        </div>
      </div>

      {/* Overlay  */}
      {nav && (
        <div className="fixed md:hidden top-0 left-0 w-full h-screen bg-black/70 z-40" />
      )}
      {/* Nav Menu */}
      <div
        className={
          nav
            ? "fixed md:hidden top-0 left-0 h-screen w-[60%] sm:w-[40%] bg-white p-5  ease-in duration-300 overflow-scroll z-40"
            : "fixed md:hidden top-0 left-[-500px] h-screen w-[60%] bg-white p-5 ease-in duration-300 overflow-scroll z-40"
        }
      >
        <div
          onClick={() => setNav(false)}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-300 hover:text-white cursor-pointer transform duration-300 "
        >
          <AiOutlineClose />
        </div>
        <div className="absolute top-3 left-3 flex items-center gap-4">
          <Link href="https://justinelapura.vercel.app/">
            <Image
              src={profile}
              alt="profile image"
              className="w-8 sm:w-10 rounded-full cursor-pointer hover:scale-105 duration-300"
            />
          </Link>
          <h1 className="font-bold text-gray-700 text-xs sm:text-sm">
            Justine Lapura
          </h1>
        </div>
        <ul className="font-semibold text-gray-800 space-y-4 mt-12">
          <li className="cursor-pointer hover:animate-pulse">Collections</li>
          <li className="cursor-pointer hover:animate-pulse">Men</li>
          <li className="cursor-pointer hover:animate-pulse">Women</li>
          <li className="cursor-pointer hover:animate-pulse">About</li>
          <li className="cursor-pointer hover:animate-pulse">ajshdvahjdv</li>
          <li className="cursor-pointer hover:animate-pulse">Login</li>
        </ul>
      </div>

      {/* added to cart modal  */}
      <AnimatePresence>
        {hasOrdered && (
          <motion.div
            className="fixed h-20 w-[300px] flex justify-center items-center text-white text-xl font-semibold bg-black/70 top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl z-50"
            exit={{ opacity: 0 }}
          >
            Order Successful
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
