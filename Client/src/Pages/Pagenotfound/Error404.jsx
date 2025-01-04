import React from "react";
import error from "../../assets/gif/gif/error.gif";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-9xl font-bold">404</h1>
      <img src={error} alt="Error Illustration" className="w-96 my-4" />
      <div className="text">
        <h2 className="text-2xl font-semibold">Look like you're lost</h2>
        <p className="text-sm font-light">
          The page you are looking for is not available
        </p>
        <Link to="/" className="text-blue-500 hover:underline">
        <button className="bg-blue-500 text-white w-52 h-10 mt-4 rounded-full font-semibold hover:bg-blue-600">
          Go To Home
        </button>
        </Link>
      </div>
      <p className="mt-4">
       Hamro <span className="text-red-500">Blog</span>
      </p>
    </div>
  );
};

export default Error404;
