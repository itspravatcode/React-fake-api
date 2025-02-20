import { IPost } from "../utils/postTools";

const Post = (props: IPost) => (
  <div className="border border-gray-700 p-4 rounded-lg shadow-lg bg-gray-800">
    <h2 className="text-xl font-semibold text-white">{props.title}</h2>
    <p className="text-gray-300">{props.body}</p>
  </div>
);

export default Post;
