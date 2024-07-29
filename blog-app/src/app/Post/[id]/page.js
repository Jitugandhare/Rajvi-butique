import BlogDetailsPage from "@/CustomComponent/BlogDetailsPage";
import { fetchIndividualBlog } from "@/Redux/Slices/BlogSlice";
import getCookie from "@/utils/cookies";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function BlogPage() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const token = getCookie("token");
      const fetchBlogDetails = async () => {
        try {
          const response = await axios.get(`/api/post/${id}`, {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          });
          setBlogData(response.data.data);
          dispatch(fetchIndividualBlog(response.data.data));
        } catch (error) {
          console.error("Error fetching blog details:", error);
        }
      };

      fetchBlogDetails();
    }
  }, [id, dispatch]);

  return <BlogDetailsPage blog={blogData} />;
}
