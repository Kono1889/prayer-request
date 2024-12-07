import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom"; // For navigation
import "../App.css";
import { app } from "../firebase";
import { getDatabase, ref, set, push } from "firebase/database";
import BackgroundImage from "../assets/priscilla-du.jpg";

function User() {
  const messageRef = useRef();
  const [alertMessage, setAlertMessage] = useState(null);
  const [isError, setIsError] = useState(false); // State to check if the alert is an error

  // const navigate = useNavigate(); // React Router's navigation hook

  const handleSave = (e) => {
    e.preventDefault();

    const message = messageRef.current.value.trim();
    if (!message) {
      setAlertMessage("Please enter a prayer request.");
      setIsError(true); // Set error state
      return;
    }

    const db = getDatabase(app);
    const newDocRef = push(ref(db, "prayer-requests"));

    set(newDocRef, {
      message,
      timestamp: new Date().toISOString(),
    })
      .then(() => {
        setAlertMessage("Prayer request submitted successfully!");
        setIsError(false); // Reset error state for success
        messageRef.current.value = "";
      })
      .catch((error) => {
        console.error(error);
        setAlertMessage(`Error: ${error.message}`);
        setIsError(true); // Set error state for submission failure
      });
  };

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 h-screen">
      {/* "Go to Admin" Button */}
      {/* <button
        onClick={() => navigate("/adminLogin")} // Navigate to the Admin page
        className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white border border-black text-black text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-black hover:text-white transition-colors duration-300"
      >
        Go to Admin
      </button> */}

      {/* Left Section with Background Image */}
      <div
        className="flex flex-col items-center justify-center bg-cover bg-center text-white p-4 sm:p-8 h-[300px] lg:h-full"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 drop-shadow-md text-center">
          Welcome to Our Platform
        </h1>
        <p className="text-sm sm:text-lg lg:text-xl text-gray-200 mb-6 drop-shadow-sm text-center leading-relaxed">
          Drop your prayer requests, our dedicated team of prayer warriors will be standing in the gap for you.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center justify-center text-center bg-white h-1/2 lg:h-full">
        <div>
          <p className="text-sm sm:text-lg lg:text-xl font-semibold mb-6">
            Worship in Good Faith
          </p>
          <p className="text-sm text-gray-600 sm:text-lg lg:text-[0.9rem]">
            Your prayer requests are anonymous and treated with confidentility 
          </p>
        </div>

        <form onSubmit={handleSave} className="w-full max-w-xs sm:max-w-sm md:max-w-md p-6">
          <div>
            <textarea
              ref={messageRef}
              placeholder="Enter prayer request"
              rows="5"
              className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
          </div>
          <div>
            <button
              type="submit"
              className="border border-black rounded-lg p-3 px-6 bg-black text-white font-semibold hover:bg-white hover:text-black w-full transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Display Alert Message */}
        {alertMessage && (
          <div
            className={`mt-4 p-3 rounded-md ${
              isError
                ? "bg-red-200 text-red-700 border border-red-500"
                : "bg-blue-100 text-blue-700 border border-blue-500"
            }`}
          >
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
