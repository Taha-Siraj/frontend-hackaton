import React from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CustomRoutes = () => {

  useGSAP(() => {
    gsap.from(".card", {
      opacity: 0,
      rotate: 360,
      y: -100,
      duration: 2,
      scrollTrigger: {
        trigger: ".card",
        markers: true,
        start: "top 80%",
        end: "bottom 50%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div>
      {/* Top Section - for scroll spacing */}
      <div className='h-screen bg-gray-700'></div>

      {/* ScrollTrigger section */}
      <div className='min-h-screen bg-gray-900 flex justify-center items-center flex-wrap gap-y-10 py-5 px-10 gap-x-10'>
        <div className='card w-[300px] bg-gray-600 border-2 rounded-lg border-red-500 font-mono px-5 py-5 text-center text-white'>
          <h1>Hello React</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit...</p>
        </div>
        <div className='card w-[300px] bg-gray-600 border-2 rounded-lg border-red-500 font-mono px-5 py-5 text-center text-white'>
          <h1>Hello React</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit...</p>
        </div>
        <div className='card w-[300px] bg-gray-600 border-2 rounded-lg border-red-500 font-mono px-5 py-5 text-center text-white'>
          <h1>Hello React</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit...</p>
        </div>
        <div className='card w-[300px] bg-gray-600 border-2 rounded-lg border-red-500 font-mono px-5 py-5 text-center text-white'>
          <h1>Hello React</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit...</p>
        </div>
        <div className='card w-[300px] bg-gray-600 border-2 rounded-lg border-red-500 font-mono px-5 py-5 text-center text-white'>
          <h1>Hello React</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit...</p>
        </div>
        <div className='card w-[300px] bg-gray-600 border-2 rounded-lg border-red-500 font-mono px-5 py-5 text-center text-white'>
          <h1>Hello React</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit...</p>
        </div>
      </div>
    </div>
  );
}

export default CustomRoutes;
