import React, { useRef, useState } from 'react';
import '../App.css'; 
import { app } from '../firebase';
import { getDatabase, ref, set, push } from 'firebase/database';
import BackgroundImage from '../assets/priscilla-du.jpg';

function User() {
  const messageRef = useRef();
  const [alertMessage, setAlertMessage] = useState(null);
  const [isError, setIsError] = useState(false); // State to check if the alert is an error

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
    <div className="grid grid-cols-2 h-screen">
      {/* Left Section with Background Image */}
      <div
        className="flex flex-col items-center justify-center bg-cover bg-center text-white p-8"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-4xl font-bold mb-4 drop-shadow-md text-center">
          Welcome to Our Platform
        </h1>
        <p className="text-xl text-gray-200 mb-6 drop-shadow-sm text-center leading-relaxed">
          Drop your prayer requests, our dedicated team of prayer warriors will be standing in the gap for you.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center justify-center text-center bg-white">
        <div>
          <p className="text-xl font-semibold mb-6">You're Welcome to Prayer Request</p>
        </div>
        
        <form onSubmit={handleSave} className="w-full max-w-md p-6">
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
