import React from "react";
const API_URL = import.meta.env.VITE_API_URL;

// Component to display a single session's details in a card format
export default function SessionCard({
  session, // The session object containing details (title, tags, URL, etc.)
  showToggleButton, // Boolean to decide whether to show the "Publish/Draft" toggle button
  onToggleStatus, // Callback function when toggle button is clicked
  showEditButton, // Boolean to decide whether to show the "Edit" button
  onEdit, // Callback function when edit button is clicked
}) {
  // Function to handle toggling the status of a session
  const handleToggle = () => {
    if (onToggleStatus) onToggleStatus(session);
  };

  return (
    <div
      className="bg-white border border-[#ffc2d4] rounded-xl p-5 w-full 
                    shadow-[0_2px_8px_rgba(255,122,158,0.3)] 
                    hover:shadow-[0_4px_10px_rgba(255,122,158,0.5)] 
                    transform transition duration-300">
      {/* Display the session title */}
      <h3 className="text-2xl font-bold text-[#560737] mb-4">
        {session.title}
      </h3>

      {/* Display the tags associated with the session */}
      <div className="mb-2 flex items-start gap-4">
        <span className="text-xl font-bold text-[#7d4f50]">Tags:</span>
        <span className="text-bold text-gray-800">
          {Array.isArray(session.tags) && session.tags.length > 0
            ? session.tags.join(", ") // Show comma-separated tags
            : "None"}{" "}
          // Fallback if no tags available
        </span>
      </div>

      {/* Display the JSON file URL associated with the session */}
      <div className="mb-2">
        <span className="text-xl font-bold text-[#7d4f50]">Json Url: </span>
        <a
          href={session.json_file_url} // URL to the JSON file
          target="_blank" // Open link in a new tab
          rel="noopener noreferrer" // Security best practice
          className="text-gray-800 underline hover:text-blue-800 text-bold">
          {session.json_file_url}
        </a>
      </div>

      {/* Display session creation and update timestamps */}
      <div>
        <p className="mb-2 flex items-start gap-4">
          <span className="text-xl font-bold text-[#7d4f50]">Created: </span>
          {/* Format date if available, else show N/A */}
          {session.created_at
            ? new Date(session.created_at).toLocaleString()
            : "N/A"}
        </p>
        <p className="mb-2 flex items-start gap-4">
          <span className="text-xl font-bold text-[#7d4f50]">Updated: </span>
          {session.updated_at
            ? new Date(session.updated_at).toLocaleString()
            : "N/A"}
        </p>
      </div>

      {/* Conditional action buttons */}
      <div className="flex flex-wrap gap-3 mt-2">
        {/* Toggle Button: shown only if `showToggleButton` is true */}
        {showToggleButton && (
          <button
            onClick={handleToggle} // Call handler to toggle draft/published
            className="px-3 py-1.5 rounded-md bg-[#e7d7c1] text-black text-md font-medium 
                       hover:bg-[#B9375E] hover:text-white transition">
            {/* Change label based on current status */}
            {session.status === "draft" ? "Publish" : "Revert to Draft"}
          </button>
        )}

        {/* Edit Button: shown only if `showEditButton` is true */}
        {showEditButton && (
          <button
            onClick={onEdit} // Trigger the provided `onEdit` callback
            className="px-3 py-1.5 rounded-md bg-green-600 text-white text-sm font-medium 
                       hover:bg-green-700 transition">
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
