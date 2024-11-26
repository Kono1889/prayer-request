import React, { useRef, useState } from 'react';
import './App.css'; 
import { firestore } from './firebase';
import { addDoc, collection } from '@firebase/firestore';
import BackgroundImage from './assets/priscilla-du.jpg';

function App() {
  const messageRef = useRef();
  const [alertMessage, setAlertMessage] = useState(null);
  const ref = collection(firestore, "messages");

  const handleSave = async (e) => {
    e.preventDefault();
    
    const message = messageRef.current.value;
    if (!message) {
      setAlertMessage("Please enter a prayer request.");
      return;
    }

    const data = {
      message,
    };

    try {
      await addDoc(ref, data);
      setAlertMessage("Prayer request submitted successfully!");
      messageRef.current.value = "";
    } catch (error) {
      console.error(error);
      setAlertMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 h-screen sm:grid-cols-1">
      {/* Left Section with Background Image */}
      <div
        className="flex flex-col items-center justify-center bg-cover bg-center text-white p-8"
        style={{
          backgroundImage: `url(${BackgroundImage})`, 
          backgroundSize: 'cover',
        }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-md text-center">
          Welcome to Our Platform
        </h1>
        <p className="text-sm md:text-lg text-gray-200 mb-6 drop-shadow-sm text-center">
          Drop your prayer requests, our dedicated team of prayer warriors will be standing in the gap for you.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center justify-center text-center bg-white p-6 sm:p-4">
        <div>
          <p className="text-lg font-semibold mb-4">Type your prayer here</p>
        </div>
        
        <form onSubmit={handleSave} className="w-full max-w-md">
          <div>
            <textarea
              ref={messageRef}
              placeholder="Enter prayer request"
              rows="5"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full border border-black-500 rounded-lg p-2 px-4 bg-black text-white font-semibold hover:bg-white hover:text-black"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Display Alert Message */}
        {alertMessage && (
          <div className="mt-4 p-2 bg-blue-100 border border-blue-500 text-blue-700 rounded-md w-full max-w-md">
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
