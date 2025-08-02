import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default function SessionForm({ sessionId, onSaveSuccess, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    json_file_url: "",
  });

  const token = localStorage.getItem("token");
  const timerRef = useRef(null);

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetails();
    } else {
      setFormData({ title: "", tags: "", json_file_url: "" });
    }

    startAutoSaveTimer();
    return () => clearTimeout(timerRef.current);
  }, [sessionId]);

  const fetchSessionDetails = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/my-sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const session = res.data;
      setFormData({
        title: session.title,
        tags: session.tags.join(", "),
        json_file_url: session.json_file_url,
      });
    } catch (err) {
      console.error("Failed to fetch session:", err);
    }
  };

  const startAutoSaveTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleSave("save-draft");
    }, 5 * 60 * 1000);
  };

  const handleInputChange = (e) => {
    clearTimeout(timerRef.current);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    startAutoSaveTimer();
  };

  const handleSave = async (status) => {
    const url = `${API_URL}/api/my-sessions/${status}`;
    const payload = {
      id: sessionId,
      title: formData.title,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      json_file_url: formData.json_file_url,
    };

    try {
      await axios.post(url, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSaveSuccess();
    } catch (err) {
      console.error("Error saving session:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="relative mb-6 p-6 border rounded-lg bg-white shadow-lg w-full max-w-xl space-y-4">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold"
            title="Close">
            ✕
          </button>
        )}

        <h3 className="text-xl font-bold text-[#d81159] mb-2">
          {sessionId ? "Edit Session" : "Create New Session"}
        </h3>

        <label className="block text-medium font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          placeholder="Session title"
        />

        <label className="block text-medium font-medium text-gray-700">
          Tags
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          placeholder="Comma separated tags"
        />

        <label className="block text-medium font-medium text-gray-700">
          JSON File URL
        </label>
        <input
          type="text"
          name="json_file_url"
          value={formData.json_file_url}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          placeholder="https://example.com/session.json"
        />

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => handleSave("save-draft")}
            className="bg-[#f2a65a] text-white px-4 py-2 rounded hover:bg-[#f58549]">
            Save as Draft
          </button>
          <button
            onClick={() => handleSave("publish")}
            className="bg-[#76c893] text-white px-4 py-2 rounded hover:bg-[#52b69a]">
            Save as Publish
          </button>
        </div>
      </div>
    </div>
  );
}
