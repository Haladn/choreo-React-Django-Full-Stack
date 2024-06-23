import React from "react";

function Note({ note, onDelete }) {
    // to make date look nicer
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")
  return (
    <div className="border rounded p-2">
      <p>{note.title}</p>
      <p>{note.content}</p>
      <p>{formattedDate}</p>
      <button className="btn btn-danger" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}

export default Note;
