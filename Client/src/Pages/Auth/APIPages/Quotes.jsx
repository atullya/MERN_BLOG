import React, { useEffect, useState } from "react";

const Quotes = () => {
  const [quote, setQuote] = useState(null); // State to store the quote
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    // Fetch the quote when the component mounts
    fetch("https://api.api-ninjas.com/v1/quotes", {
      method: "GET",
      headers: {
        "X-Api-Key": "+QSRa+Vn43LM0PY4ltR8bA==Pg5ubnXHgv6Bj7gp",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setQuote(data[0]); // Assuming the API returns an array of quotes
      })
      .catch((err) => {
        console.error("Error fetching the quote:", err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-xl w-full">
   

        {error && <p className="text-red-500 text-center">Error: {error}</p>}

        {quote ? (
          <div className="text-center">
            <p className="text-lg text-gray-700 font-medium mb-4">
              &quot;{quote.quote}&quot;
            </p>
         
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Quotes;
