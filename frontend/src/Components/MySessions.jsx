import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ For programmatic redirection
import axios from "axios";
import SessionCard from "./SessionCard";
const API_URL = import.meta.env.VITE_API_URL;

export default function MySessions() {
  // ✅ State to store the user's sessions fetched from the backend
  const [sessions, setSessions] = useState([]);

  // ✅ Get the authentication token from localStorage
  const token = localStorage.getItem("token");

  // ✅ Hook from React Router to navigate between pages
  const navigate = useNavigate();

  // ✅ Fetch only the sessions created by the currently logged-in user
  const fetchMySessions = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/my-sessions`, {
        headers: { Authorization: `Bearer ${token}` }, // 🛡️ Include token in request
      });
      setSessions(res.data); // ✅ Store fetched sessions in state
    } catch (err) {
      console.error("Error fetching my sessions:", err);
    }
  };

  useEffect(() => {
    // ✅ Redirect to login if user is not authenticated
    if (!token) {
      navigate("/login");
    } else {
      fetchMySessions(); // ✅ Fetch sessions once user is authenticated
    }
  }, [token, navigate]);

  // ✅ Handle toggling a session between draft and published
  const handleToggleStatus = async (session) => {
    // Choose the correct API endpoint based on current session status
    const url =
      session.status === "draft"
        ? `${API_URL}/api/my-sessions/publish` // ✅ Publish the draft
        : `${API_URL}/api/my-sessions/save-draft`; // ✅ Move published back to draft

    try {
      // Send POST request to update the session status
      await axios.post(
        url,
        {
          id: session._id,
          title: session.title,
          tags: session.tags,
          json_file_url: session.json_file_url,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // 🛡️ Include token again
        }
      );
      fetchMySessions(); // ✅ Refresh session list after status change
    } catch (error) {
      console.error("Error updating session status:", error);
    }
  };

  // ✅ Split sessions into published and drafts
  const draftSessions = sessions.filter((s) => s.status === "draft");
  const publishedSessions = sessions.filter((s) => s.status === "published");

  return (
    <div className="p-6 space-y-10">
      {/* ✅ Section for Published Sessions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Published Sessions</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {publishedSessions.length > 0 ? (
            publishedSessions.map((s) => (
              <SessionCard
                key={s._id}
                session={s}
                showToggleButton={true} // ✅ Show toggle button to change status
                onToggleStatus={handleToggleStatus} // ✅ Handle publish → draft
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No published sessions found.
            </p>
          )}
        </div>
      </div>

      {/* ✅ Section for Draft Sessions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Draft Sessions</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {draftSessions.length > 0 ? (
            draftSessions.map((s) => (
              <SessionCard
                key={s._id}
                session={s}
                showToggleButton={true} // ✅ Show toggle button to change status
                onToggleStatus={handleToggleStatus} // ✅ Handle draft → publish
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No draft sessions found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
