import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const EsewaPayment = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    amount: location.state.price,
    productName: location.state.plan,
    transactionId: "",
  });
  const merchantCode = "EPAYTEST"; // Replace with your actual merchant code
  const secretKey = "8gBm/:&EnhH.1/q"; // Replace with your actual secret key
  const successUrl = "http://yourdomain.com/payment-success"; // Replace with your success URL
  const failureUrl = "http://yourdomain.com/payment-failure"; // Replace with your failure URL

  // Function to generate eSewa signature
  const generateEsewaSignature = (
    secretKey,
    amount,
    transactionUuid,
    merchantCode
  ) => {
    const signatureString = `total_amount=${amount},transaction_uuid=${transactionUuid},product_code=${merchantCode}`;
    const encoder = new TextEncoder();
    const key = encoder.encode(secretKey);
    const message = encoder.encode(signatureString);

    return crypto.subtle
      .importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
      .then((cryptoKey) => crypto.subtle.sign("HMAC", cryptoKey, message))
      .then((signature) =>
        btoa(String.fromCharCode(...new Uint8Array(signature)))
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { amount, productName, transactionId } = formData;

    if (!amount || !productName || !transactionId) {
      alert("Please fill out all fields.");
      return;
    }

    const transactionUuid = `txn-${Date.now()}`; // Unique identifier for the transaction

    try {
      const signature = await generateEsewaSignature(
        secretKey,
        amount,
        transactionUuid,
        merchantCode
      );

      // Prepare eSewa payment parameters
      const esewaConfig = {
        amount,
        tax_amount: "0",
        total_amount: amount,
        transaction_uuid: transactionUuid,
        product_code: merchantCode,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: successUrl,
        failure_url: failureUrl,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature,
      };

      // Create a form dynamically and submit to eSewa
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      for (const [key, value] of Object.entries(esewaConfig)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error generating eSewa signature:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    console.log(location);
    console.log(location.state.price);
  }, [location]);

  return (
    <div class="container mx-auto my-10 p-5 bg-white shadow-lg rounded-lg max-w-lg">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8 animate__animated animate__fadeIn">
        eSewa Payment
      </h1>
      <form onSubmit={handleSubmit} class="space-y-6">
        <div>
          <label htmlFor="amount" class="block text-lg text-gray-700">
            Amount:
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            readOnly
            class="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          />
        </div>

        <div>
          <label htmlFor="productName" class="block text-lg text-gray-700">
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            readOnly
            class="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          />
        </div>

        <div>
          <label htmlFor="transactionId" class="block text-lg text-gray-700">
            Transaction ID:
          </label>
          <input
            type="text"
            id="transactionId"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            required
            class="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          />
        </div>

        <div class="flex justify-center">
          <button
            type="submit"
            class="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Pay with eSewa
          </button>
        </div>
      </form>
    </div>
  );
};

export default EsewaPayment;
