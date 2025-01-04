import React from 'react';
import Navbar from '../../Component/Navbar';
import blogIcon from "../../assets/blog.svg"; // Import as an image
const Contact = () => {
  return (
    <>

        <Navbar/>
    <div className="max-w-7xl mx-auto py-10 px-5">
      {/* Top Section: Form and Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Contact Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 mt-7 text-gray-800">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Random Image */}
        <div className="flex items-center mt-7 justify-center">
        <img src={blogIcon} alt="Blog Icon" className="w-200 h-200" />
        </div>
      </div>

      {/* Bottom Section: Contact Details and Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Details */}
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-blue-600 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span className="text-gray-700 text-lg">Email: blogs@yourblog.com</span>
          </div>
          <div className="flex items-center">
          {/* <SvgIcon className="w-12 h-12 text-blue-600" /> */}
            <svg
              className="w-6 h-6 text-blue-600 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 8V7l-3 2.29V5c0-1.1-.9-2-2-2H8C6.9 3 6 3.9 6 5v8c0 1.1.9 2 2 2h8l3 2.29V16h1V8h-1z" />
            </svg>
            <span className="text-gray-700 text-lg">Phone: +01 42657331</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-blue-600 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm1.31-7.9L12 15h-2l-.31-1.9C9.22 12.58 9 11.83 9 11c0-1.1.9-2 2-2s2 .9 2 2c0 .83-.22 1.58-.69 2.1z" />
            </svg>
            <span className="text-gray-700 text-lg">Address: NCCS,Paknajol</span>
          </div>
        </div>

        {/* Google Map */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Location</h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28259.339167919403!2d85.27684948476562!3d27.70439618759704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fc9a83c0cd%3A0xc0495456663927d4!2sNational%20College%20of%20Computer%20Studies!5e0!3m2!1sen!2snp!4v1734450645279!5m2!1sen!2snp" width="600" height="450"allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
