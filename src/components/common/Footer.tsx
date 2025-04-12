import React from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#210000] text-[#F5E1DA] py-8">
        <img src="/Footer/line.png" alt="Decorative Line" className="w-full mb-8 " />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* First Column: Logos */}
        <div className="flex items-center justify-center space-x-6 md:space-x-6 md:justify-start ml-10">
  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#F5E1DA] text-4xl md:text-8xl hover:text-white"
  >
    <FaInstagram />
  </a>
  <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#F5E1DA] text-4xl md:text-8xl hover:text-white"
  >
    <FaFacebook />
  </a>
  <a
    href="https://whatsapp.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#F5E1DA] text-4xl md:text-8xl hover:text-white"
  >
    <FaWhatsapp />
  </a>
</div>

        {/* Second Column: Menu */}
        <ul className="text-center space-y-6 font-antolia font-normal text-[68px] leading-[100%] tracking-[0%]">
  <li><a href="/" className="hover:underline">Home</a></li>
  <li><a href="/events" className="hover:underline">Events</a></li>
  <li><a href="/team" className="hover:underline">Team</a></li>
  <li><a href="/gallery" className="hover:underline">Gallery</a></li>
</ul>

        {/* Third Column: Picture and Regalia */}
        <div className="flex flex-col items-center">
          <img src="/Footer/guitar.png" alt="Regalia Logo" className=" w-[629.32px]  mb-2" />
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;