import { useEffect, useState } from "react";
import Post from "./Components/Post";
import AddPost from "./Components/AddPost";
import { getPosts, getPost, IPost } from "./utils/postTools";

function App() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<IPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await getPosts();
      if (postData) {
        setPosts(postData.slice(0, 15));
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = async () => {
    if (!searchId.trim()) return;
    const post = await getPost(Number(searchId));
    setSearchResult(post || null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">📜 Fake Posts App</h1>

        {/* 🔍 Search Post by ID */}
        <div className="mb-6 flex items-center space-x-2">
          <input
            type="number"
            placeholder="Enter Post ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="p-3 border border-gray-700 rounded-lg w-full bg-gray-800 text-white"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

        {/* Display Search Result */}
        {searchResult && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold">🔎 Search Result:</h2>
            <Post {...searchResult} />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-center text-gray-400">Loading Posts...</p>
            ) : (
              posts.map((post) => <Post key={post.id} {...post} />)
            )}
          </div>
          <AddPost setPosts={setPosts} />
        </div>
      </div>
    </div>
  );
}

export default App;
