import React, { useEffect, useState } from "react";
import axios from "axios";
import SessionCard from "./SessionCard"; // Component to display each session
import SessionForm from "./SessionForm";
// Modal form for creating/editing a session
const API_URL = import.meta.env.VITE_API_URL;

export default function SessionEditor() {
  // State to store all user's sessions
  const [sessions, setSessions] = useState([]);

  // State to track which session is currently selected for editing (null if creating a new one)
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  // State to control whether the session form modal is visible
  const [showForm, setShowForm] = useState(false);

  // Get token from local storage to authenticate API requests
  const token = localStorage.getItem("token");

  // Function to fetch all sessions created by the logged-in user
  const fetchSessions = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/my-sessions`, {
        headers: { Authorization: `Bearer ${token}` }, // send token in headers
      });
      setSessions(res.data); // store sessions in state
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  // Fetch sessions once when component is mounted
  useEffect(() => {
    fetchSessions();
  }, []);

  // Handle when user clicks the "Edit" button on a session
  const handleEditClick = (sessionId) => {
    setSelectedSessionId(sessionId); // set ID of the session to be edited
    setShowForm(true); // open the modal form
  };

  // Handle when user clicks "Create New Session"
  const handleCreateClick = () => {
    setSelectedSessionId(null); // set to null since it's a new session
    setShowForm(true); // open the modal form
  };

  // After saving a session (either create or update), refresh session list and close form
  const refreshAfterSave = () => {
    fetchSessions(); // reload sessions from API
    setShowForm(false); // close the modal form
    setSelectedSessionId(null); // reset selected session
  };

  return (
    <div className="p-6 relative">
      {/* Button to Create a New Session */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-6">
        <button
          onClick={handleCreateClick}
          className="bg-[#f5f1e3] border border-dashed border-gray-400 h-32 
                     flex items-center justify-center rounded-lg 
                     text-black font-semibold text-lg hover:bg-[#dddbcb]">
          ➕ Create New Session
        </button>
      </div>

      {/* Modal Popup for Session Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-transparent flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl relative">
            <SessionForm
              sessionId={selectedSessionId} // pass selected session ID (null if creating)
              onSaveSuccess={refreshAfterSave} // callback after form is submitted
              onClose={() => setShowForm(false)} // callback when modal is closed
            />
          </div>
        </div>
      )}

      {/* List of Session Cards (each with Edit button) */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {sessions.map((s) => (
          <SessionCard
            key={s._id}
            session={s}
            showEditButton={true} // show the "Edit" button on the card
            onEdit={() => handleEditClick(s._id)} // pass the session ID to handler
          />
        ))}
      </div>
    </div>
  );
}
