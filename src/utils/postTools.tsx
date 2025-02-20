import axios from "axios";

export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const postsApiInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1000,
});

export const getPosts = async () => {
  try {
    const response = await postsApiInstance.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getPost = async (id: number) => {
  try {
    const response = await postsApiInstance.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    return null;
  }
};

// ✅ Add Back the `addPost` Function
export const addPost = async (newPost: IPost) => {
  try {
    const response = await postsApiInstance.post("/posts", newPost, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding post:", error);
    return null;
  }
};
