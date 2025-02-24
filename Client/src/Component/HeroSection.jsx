import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ scrollToHome }) => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // Background Image Zoom-in & Fade-in on Load
    gsap.fromTo(
      bgRef.current,
      { scale: 1.3, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
    );

    // Parallax Effect on Scroll
    gsap.to(bgRef.current, {
      scale: 1.05,
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Text Fade-in & Slide-up Animation
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.3 }
    );

    // Button Hover Animation
    gsap.fromTo(
      buttonRef.current,
      { scale: 1 },
      {
        scale: 1.05,
        boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)",
        duration: 0.3,
        paused: true,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[85vh] mt-14 flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/860887528/photo/whats-your-story-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=IkAjduoBDMOkFdqvJXpIN-8HoT7oUTdupABbl6p_nRE=')",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Content */}
      <div ref={textRef} className="relative z-10 text-center text-white px-6 md:px-12">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 text-shadow-md">
          Welcome to WriteOn
        </h1>
        <p className="text-lg md:text-2xl mb-6 text-shadow-md">
          Your source for insightful articles and fresh perspectives.
        </p>
        <button
          ref={buttonRef}
          onClick={scrollToHome}
          className="bg-blue-500 text-white py-3 px-6 text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        >
          Explore Blogs
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
