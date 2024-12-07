import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, remove } from "firebase/database";
import { app } from "../firebase";

const Admin = () => {
  const [prayer, setPrayer] = useState([]); // Holds prayer requests
  const [error, setError] = useState(null); // Handles errors

  // Function to fetch prayer requests from the database
  const fetchData = async () => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, "prayer-requests");
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        // Get prayer requests along with their keys
        const prayerList = Object.entries(snapshot.val()).map(([key, value]) => ({
          id: key, // Store unique Firebase key for deletion
          ...value,
        }))

        .sort((a,b)=> b.timestamp - a.timestamp)

        console.log('Fetched prayer request', prayerList.reverse())

        setPrayer(prayerList);
      } else {
        setError("No prayer requests found.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching data.");
    }
  };

  // Function to delete a prayer request from Firebase
  const handleDelete = async (id) => {
    try {
      const db = getDatabase(app);
      const prayerRef = ref(db, `prayer-requests/${id}`);
      await remove(prayerRef);

      // Remove the deleted prayer from the state
      setPrayer((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      setError("An error occurred while deleting the request.");
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin p-6">
      <h1 className="text-2xl font-bold mb-4">Prayer Requests</h1>

      {/* Display error message */}
      {error && (
        <div className="text-red-500 bg-red-100 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Display prayer requests */}
      <ul className="space-y-4">
        {prayer.length > 0 ? (
          prayer.map((item) => (
            <li
              key={item.id}
              className="p-4 bg-gray-100 rounded-md shadow-md border border-gray-300 flex justify-between items-start"
            >
              <div>
                <p className="font-semibold">Message: {item.message}</p>
                <p className="text-sm text-gray-600">
                  Timestamp: {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
                >
                  Answered to
                </button>
            </li>
          ))
        ) : (
          !error && (
            <p className="text-gray-500">No prayer requests available yet.</p>
          )
        )}
      </ul>
    </div>
  );
};

export default Admin;
