"use client";

import { useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // ================= USERS =================

  const fetchUsers = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    console.log("Fetched Users:", data);
    setUsers(data);
  };

  const handleUserCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    console.log("Created User:", data);
    fetchUsers();
    e.target.reset();
  };

  const handleUserUpdate = async (id, e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    userData.id = id;

    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    console.log("Updated User:", data);
    fetchUsers();
  };

  const handleUserDelete = async (id) => {
    await fetch("/api/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  };

  // ================= POSTS =================

  const fetchPosts = async () => {
    const res = await fetch("/api/post");
    const data = await res.json();
    console.log("Fetched Posts:", data);
    setPosts(data);
  };

  const handlePostCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const postData = Object.fromEntries(formData.entries());

    const res = await fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    const data = await res.json();
    console.log("Created Post:", data);
    fetchPosts();
    e.target.reset();
  };

  const handlePostUpdate = async (id, e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const postData = Object.fromEntries(formData.entries());
    postData.id = id;

    const res = await fetch("/api/post", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    const data = await res.json();
    console.log("Updated Post:", data);
    fetchPosts();
  };

  const handlePostDelete = async (id) => {
    await fetch("/api/post", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchPosts();
  };

  // ================= UI =================
  return (
    <div className="p-6 space-y-8">
      {/* Create User */}
      <div>
        <h1 className="text-3xl font-bold underline mb-4">Create new User</h1>
        <form onSubmit={handleUserCreate}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border p-2 mb-2"
            required
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 mb-2"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 mb-2"
            required
          />
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Create User
          </button>
        </form>
      </div>

      {/* Create Post */}
      <div>
        <h1 className="text-3xl font-bold underline mb-4">Create new Post</h1>
        <form onSubmit={handlePostCreate}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border p-2 mb-2"
            required
          />
          <br />
          <textarea
            name="content"
            placeholder="Content"
            className="border p-2 mb-2"
            required
          ></textarea>
          <br />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="border p-2 mb-2"
          />
          <br />
          <input
            type="text"
            name="authorId"
            placeholder="Author ID"
            className="border p-2 mb-2"
            required
          />
          <br />
          <button
            type="submit"
            className="bg-green-500 text-white rounded-md px-4 py-2"
          >
            Create Post
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div>
        <h1 className="text-xl font-bold">All Users</h1>
        <button
          onClick={fetchUsers}
          className="bg-purple-500 text-white rounded-md px-4 py-2 my-2"
        >
          Fetch Users
        </button>

        {users.length > 0 && (
          <table className="border-collapse border w-full mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="border px-4 py-2">{u.id}</td>
                  <td className="border px-4 py-2">{u.name}</td>
                  <td className="border px-4 py-2">{u.email}</td>
                  <td className="border px-4 py-2 space-x-2">
                    {/* Update Form */}
                    <form
                      onSubmit={(e) => handleUserUpdate(u.id, e)}
                      className="inline-block"
                    >
                      <input
                        type="text"
                        name="name"
                        placeholder="New Name"
                        className="border p-1 mr-2"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="New Email"
                        className="border p-1 mr-2"
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Update
                      </button>
                    </form>
                    {/* Delete */}
                    <button
                      onClick={() => handleUserDelete(u.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Posts Table */}
      <div>
        <h1 className="text-xl font-bold">All Posts</h1>
        <button
          onClick={fetchPosts}
          className="bg-yellow-500 text-white rounded-md px-4 py-2 my-2"
        >
          Fetch Posts
        </button>

        {posts.length > 0 && (
          <table className="border-collapse border w-full mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Author ID</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td className="border px-4 py-2">{p.id}</td>
                  <td className="border px-4 py-2">{p.title}</td>
                  <td className="border px-4 py-2">{p.category}</td>
                  <td className="border px-4 py-2">{p.authorId}</td>
                  <td className="border px-4 py-2 space-x-2">
                    {/* Update Form */}
                    <form
                      onSubmit={(e) => handlePostUpdate(p.id, e)}
                      className="inline-block"
                    >
                      <input
                        type="text"
                        name="title"
                        placeholder="New Title"
                        className="border p-1 mr-2"
                      />
                      <input
                        type="text"
                        name="category"
                        placeholder="New Category"
                        className="border p-1 mr-2"
                      />
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Update
                      </button>
                    </form>
                    {/* Delete */}
                    <button
                      onClick={() => handlePostDelete(p.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
