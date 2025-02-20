import { useState } from "react";
import { addPost, IPost } from "../utils/postTools";

const AddPost = ({ setPosts }: { setPosts: (posts: IPost[]) => void }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const handleAdd = async () => {
    if (!postTitle.trim() || !postBody.trim()) return;
    
    const newPost: IPost = {
      id: Date.now(),
      title: postTitle,
      body: postBody,
      userId: 1,
    };

    const addedPost = await addPost(newPost);
    if (addedPost) {
      setPosts((prev) => [addedPost, ...prev]); // Add new post to UI
      setPostTitle("");
      setPostBody("");
    }
  };

  return (
    <div className="border border-gray-700 p-4 rounded-lg bg-gray-800">
      <h2 className="text-lg font-semibold text-white">Add New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        className="w-full p-2 border border-gray-600 bg-gray-900 text-white rounded mb-2"
      />
      <textarea
        placeholder="Content"
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}
        className="w-full p-2 border border-gray-600 bg-gray-900 text-white rounded mb-2"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={handleAdd}
      >
        Add Post
      </button>
    </div>
  );
};

export default AddPost;
