import { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", comment: "" });

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments?blogId=${blogId}`);
      setComments(response.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/comments", { ...form, blogId });
      setForm({ name: "", email: "", comment: "" });
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Leave a Comment:</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="block w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="block w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Comment"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          className="block w-full mb-2 p-2 border rounded"
          required
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded">
          Submit
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold">Comments:</h3>
        {comments.map((c) => (
          <div key={c._id} className="mt-4">
            <p className="text-gray-800 font-semibold">{c.name}</p>
            <p className="text-gray-600">{c.comment}</p>
            <p className="text-gray-400 text-sm">
              {new Date(c.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;