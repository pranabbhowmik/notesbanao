import React, { useContext, useState, useEffect } from "react";
import { SlNote } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { IoSave } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Usercontext from "../context/Usercontext";

const Addnote = ({ mode }) => {
  const [notes, setNotes] = useState([]); // Track all notes
  const [selectedColors, setSelectedColors] = useState({}); // Track colors for each note
  const [noteSavedMessage, setNoteSavedMessage] = useState(false); // Track "Note Saved" message visibility
  const { user } = useContext(Usercontext); // Use context to get user

  useEffect(() => {
    // Load notes and colors from localStorage when component mounts
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    const savedColors = JSON.parse(localStorage.getItem("colors"));
    if (savedNotes) setNotes(savedNotes);
    if (savedColors) setSelectedColors(savedColors);
  }, []);

  // Function to add a new note
  const addNote = () => {
    setNotes([...notes, { id: notes.length + 1, text: "", isEditing: true }]); // Add a new note with isEditing=true
  };

  // Function to change the background color of a specific note
  const changeBackgroundColor = (noteId, color) => {
    const updatedColors = { ...selectedColors, [noteId]: color }; // Track color for each note by its id
    setSelectedColors(updatedColors);
    localStorage.setItem("colors", JSON.stringify(updatedColors)); // Save colors to localStorage
  };

  // Function to handle text change in a note
  const handleTextChange = (noteId, newText) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId ? { ...note, text: newText } : note
      )
    );
  };

  // Function to save the note and disable editing
  const saveNote = (noteId) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, isEditing: false } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Save notes to localStorage
    showNoteSavedMessage(); // Show the "Note Saved" message
  };

  // Function to show "Note Saved" message temporarily
  const showNoteSavedMessage = () => {
    setNoteSavedMessage(true); // Show message
    setTimeout(() => {
      setNoteSavedMessage(false); // Hide after 2 seconds
    }, 2000);
  };

  // Function to delete a note
  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter((n) => n.id !== noteId);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Update localStorage after deletion

    const updatedColors = { ...selectedColors };
    delete updatedColors[noteId]; // Remove the deleted note's color
    setSelectedColors(updatedColors);
    localStorage.setItem("colors", JSON.stringify(updatedColors)); // Update localStorage after deletion
  };

  return (
    <>
      <h1 className="text-2xl font-robotoMono ml-6 sm:ml-36 sm:mt-7">
        Welcome {user?.login || "Guest"}{" "}
        {/* Use optional chaining and fallback */}
      </h1>

      {/* Add-Note Button */}
      <button
        className={`fixed bottom-10 right-8 flex items-center space-x-2 py-2 px-5 w-40 border h-14 rounded-lg ${
          mode === "light"
            ? "bg-blue-600 border-white text-white"
            : "bg-white border-black border-2 text-black"
        }`}
        aria-current="page"
        onClick={addNote} // Add a new note on click
      >
        <SlNote className="w-5 h-5" />
        <span className="font-robotoMono">Add-Note</span>
      </button>

      {/* Render all notes */}
      <div className="grid grid-cols-1 sm:mx-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded-lg shadow-lg ${
              mode === "light" ? "bg-gray-200" : "bg-gray-700"
            }`}
          >
            {/* Input Field */}
            <textarea
              placeholder="Type your note here..."
              className="w-full font-robotoMono font-semibold h-52 p-2 mb-4 border rounded-lg resize-none"
              style={{
                textAlign: "left",
                verticalAlign: "top",
                
                backgroundColor:
                  selectedColors[note.id] ||
                  (mode === "light" ? "white" : "black"),
              }}
              value={note.text} // Display the note's text
              onChange={(e) => handleTextChange(note.id, e.target.value)} // Update the note's text
              disabled={!note.isEditing} // Disable input if not in editing mode
            />

            {/* Color Divs and Save/Delete Buttons */}
            <div className="flex justify-between items-center space-x-1">
              <div className="flex sm:space-x-4 space-x-2">
                {/* Color Divs */}
                <div
                  className="w-8 h-8 rounded-full bg-orange-500 cursor-pointer"
                  onClick={() => changeBackgroundColor(note.id, "#ffa500")}
                ></div>
                <div
                  className="w-8 h-8 rounded-full bg-green-500 cursor-pointer"
                  onClick={() => changeBackgroundColor(note.id, "green")}
                ></div>
                <div
                  className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer"
                  onClick={() => changeBackgroundColor(note.id, "DarkBlue")}
                ></div>
                <div
                  className="w-8 h-8 rounded-full bg-red-800 cursor-pointer"
                  onClick={() => changeBackgroundColor(note.id, "darkred")}
                ></div>
              </div>

              {/* Add margin to icons */}
              <div className="flex items-center space-x-4">
                {" "}
                {/* Adjust space between icons */}
                <span onClick={() => saveNote(note.id)}>
                  <IoSave className="w-8 h-8 text-green-500 cursor-pointer" />
                </span>
                <span
                  onClick={() => {
                    // Enable editing on click
                    setNotes(
                      notes.map((n) =>
                        n.id === note.id ? { ...n, isEditing: true } : n
                      )
                    );
                  }}
                >
                  <CiEdit className="w-8 h-8 text-purple-500 dark:text-white cursor-pointer" />
                </span>
                <span onClick={() => deleteNote(note.id)}>
                  <MdDelete className="w-8 h-8 text-red-600 cursor-pointer" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note Saved Message */}
      {noteSavedMessage && (
        <div className="fixed top-20 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Note Saved
        </div>
      )}
    </>
  );
};

export default Addnote;
