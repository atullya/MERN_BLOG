import React from "react";

const HeroSection = ({ scrollToHome }) => {
  return (
    <section
      className="relative bg-cover bg-center h-[85vh] mt-14 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/860887528/photo/whats-your-story-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=IkAjduoBDMOkFdqvJXpIN-8HoT7oUTdupABbl6p_nRE=')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white px-6 md:px-12">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 text-shadow-md">
          Welcome to HamroBlog
        </h1>
        <p className="text-lg md:text-2xl mb-6 text-shadow-md">
          Your source for insightful articles and fresh perspectives.
        </p>
        <button
          onClick={scrollToHome} // Trigger the scroll when clicked
          className="bg-blue-500 text-white py-3 px-6 text-lg font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Explore Blogs
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
