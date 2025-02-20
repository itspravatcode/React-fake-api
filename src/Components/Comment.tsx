import { useEffect, useState } from "react";
import { getPostComments } from "../utils/postTools";

interface IComment {
  id: number;
  email: string;
  body: string;
}

const Comment = ({ id }: { id: number }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const commentData = await getPostComments(id);
      if (commentData) {
        setComments(commentData);
      }
    };

    if (open) {
      fetchComments();
    }
  }, [id, open]);

  return (
    <div className="mt-4">
      <button
        className="w-full text-left px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        onClick={() => setOpen(!open)}
      >
        💬 {open ? "Hide Comments" : "View Comments"}
      </button>
      {open && (
        <div className="mt-3 space-y-3">
          {comments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border p-3 rounded-lg bg-white dark:bg-gray-800 shadow">
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{comment.email}</p>
                <p className="text-gray-700 dark:text-gray-300">{comment.body}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
