import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const BlogContext = createContext(null);

const BlogContextProvider = (props) => {
  const [savedBlogs, setSavedBlogs] = useState({});
  const [blogList, setBlogList] = useState([]);
  const [token, setToken] = useState("");
  const url = "http://localhost:3000"
  const saveBlog = async (blogId) => {
    if (!savedBlogs[blogId]) {
      setSavedBlogs((prev) => ({ ...prev, [blogId]: true }));
      if (token) {
        try {
          await axios.post(
            `${url}/api/blog/save`,
            { blogId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          console.error("Failed to save blog:", error);
        }
      }
    }
  }
  const removeBlog = async (blogId) => {
    if (savedBlogs[blogId]) {
      setSavedBlogs((prev) => {
        const updatedBlogs = { ...prev };
        delete updatedBlogs[blogId];
        return updatedBlogs;
      });
      if (token) {
        try {
          await axios.post(
            `${url}/api/blog/remove`,
            { blogId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          console.error("Failed to remove blog:", error);
        }
      }
    }
  };
  const fetchBlogList = async () => {
    try {
      const response = await axios.get(`${url}/api/blog/list`);
      setBlogList(response.data.blogs);
    } catch (error) {
      console.error("Failed to fetch blog list:", error);
    }
  };
  const loadSavedBlogs = async (userToken) => {
    try {
      const response = await axios.get(`${url}/api/blog/saved`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setSavedBlogs(response.data.savedBlogs);
    } catch (error) {
      console.error("Failed to load saved blogs:", error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchBlogList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadSavedBlogs(storedToken);
      }
    };
    initializeData();
  }, []);

  const contextValue = {
    blogList,
    savedBlogs,
    saveBlog,
    removeBlog,
    token,
    setToken,
  };

  return (
    <BlogContext.Provider value={contextValue}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;


