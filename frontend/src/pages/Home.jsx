import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204)
          alert("Note deleted!"); //204 return empty response when successfull
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="container-fluid ">
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>

      <h2 className="my-2 mt-4">Create a Note</h2>
      <form
        onSubmit={createNote}
        className="col-7 col-md-4 border rounded bg-light p-2 mx-auto"
      >
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          name="content"
          className="form-control"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input className="btn btn-primary" type="submit" value="submit" />
      </form>
    </div>
  );
}

export default Home;
