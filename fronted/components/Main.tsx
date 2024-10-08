// import Image, { StaticImageData } from 'next/image'
// import React from 'react'
// import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
// import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

// interface Main {
//     silde: {
//         img: StaticImageData;

//     }
// }

// const Main = () => {
//   return (
//     <div className="w-full h-full lg:flex justify-center items-center gap-20 pt-16 md:py-32">
//           {/* Image  */}
//           <div className="">
//             <div className="relative w-full">
//               <Image
//                 src={slides[curentIndex].img}
//                 alt="shoe image 1"
//                 className="lg:rounded-xl"
//               />
//               <BsChevronCompactLeft
//                 size={30}
//                 className="w-10 h-10 lg:hidden absolute top-1/2 left-5 text-gray-900 font-black p-2 bg-white rounded-full cursor-pointer hover:bg-gray-200 hover:scale-105 duration-200"
//                 onClick={prevSlide}
//               />
//               <BsChevronCompactRight
//                 size={30}
//                 className="w-10 h-10 lg:hidden absolute top-1/2 right-5 text-gray-900 font-black p-2 bg-white rounded-full cursor-pointer hover:bg-gray-200 hover:scale-105 duration-200"
//                 onClick={nextSlide}
//               />
//             </div>
//             <div className="hidden lg:flex justify-between items-center mt-8">
//               {slides.map((slide, index) => (
//                 <Image
//                   key={index}
//                   src={slide.img}
//                   alt={`shoe image ${index + 1}`}
//                   className="w-20 rounded-xl cursor-pointer hover:scale-105 duration-200"
//                   onClick={() => gotoSlideIndex(index)}
//                 />
//               ))}
//             </div>
//           </div>
//           {/* Product Details */}
//           <div className="p-6">
//             <h1 className="text-orange-500 lg:text-sm font-bold uppercase tracking-widest">
//               Sneaker Company
//             </h1>
//             <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-4">
//               Fall Limited Edition Sneakers
//             </h1>
//             <p className="text-gray-500 leading-7 mt-4">
//               These low-profile sneakers are your perfect casual wear companion.
//               Featuring a durable rubber outer sole, they&rsquo;ll withstand
//               everything the the weather can offer.
//             </p>
//             <div className="flex lg:flex-col justify-between lg:items-start items-center mt-6">
//               <div className="flex items-center font-bold gap-2">
//                 <h1 className="text-2xl  text-gray-900">$125.00 </h1>
//                 <span className="text-base ms-2 text-orange-600 bg-orange-100  px-2 rounded">
//                   50%
//                 </span>
//               </div>
//               <p className="text-gray-400 font-semibold line-through ">
//                 $250.00
//               </p>
//             </div>
//             <div className="lg:flex items-center gap-6">
//               <div className="w-full flex justify-between items-center mt-8 lg:mt-4 text-orange-600 text-2xl font-bold rounded-xl bg-gray-100 py-4 lg:py-2 px-6">
//                 <p>-</p>
//                 <p className="text-lg text-gray-900">0</p>
//                 <p>+</p>
//               </div>
//               <button className="w-full flex justify-center items-center gap-4 py-4 lg:py-2 mt-4 rounded-xl bg-orange-500 text-white font-bold ">
//                 <AiOutlineShoppingCart size={20} /> Add to cart
//               </button>
//             </div>
//           </div>
//         </div>
//   )
// }

// export default Main
