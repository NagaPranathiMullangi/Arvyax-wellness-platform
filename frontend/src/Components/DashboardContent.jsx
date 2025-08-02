// Import necessary React hooks and modules
import React, { useEffect, useState } from "react";
import axios from "axios"; // For making HTTP requests to backend
import SessionCard from "./SessionCard"; // Reusable card component to display session data
const API_URL = import.meta.env.VITE_API_URL;
// This component is responsible for displaying all published sessions on the dashboard
export default function DashboardContent() {
  // Define a state variable to hold the list of sessions
  const [sessions, setSessions] = useState([]);

  // useEffect runs once when the component mounts (empty dependency array [])
  useEffect(() => {
    // Fetches session data from the backend
    const fetchSessions = async () => {
      try {
        // Send GET request to API endpoint to get published sessions
        const res = await axios.get(`${API_URL}/api/sessions`);

        // Store the response data (array of sessions) in state
        setSessions(res.data);

        // Log data for debugging in developer console
        console.log(res.data);
      } catch (err) {
        // Log any errors that occur during fetch
        console.error("Failed to fetch published sessions:", err);
      }
    };

    // Call the fetch function immediately on mount
    fetchSessions();
  }, []); // Empty dependency array means this runs only once (on mount)

  // Return UI for displaying sessions
  return (
    // Container div with padding and a responsive grid layout
    <div className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {/* If no sessions are found, display a message */}
      {sessions.length === 0 ? (
        <p className="col-span-full text-center text-gray-600">
          No published sessions available.
        </p>
      ) : (
        // If sessions exist, map through them and display each using the SessionCard component
        sessions.map((session) => (
          <SessionCard key={session._id} session={session} />
        ))
      )}
    </div>
  );
}
