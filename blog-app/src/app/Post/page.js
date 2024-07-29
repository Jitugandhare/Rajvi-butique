import BlogForm from "@/CustomComp/BlogForm";
import { fetchIndividualBlog } from "@/Redux/Slices/BlogSlice";
import getCookie from "@/utils/cookies";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function EditBlogPage() {
  const searchParams = useSearchParams();
  const blogId = searchParams.get('edit');
  const dispatch = useDispatch();

  useEffect(() => {
    if (blogId) {
      const token = getCookie("token");

      const fetchBlogDetails = async () => {
        try {
          const response = await axios.get(`/api/post/${blogId}`, {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          });

          dispatch(fetchIndividualBlog(response.data.data));
        } catch (error) {
          console.error("Error fetching blog details:", error);
        }
      };

      fetchBlogDetails();
    }
  }, [blogId, dispatch]);

  return (
    <BlogForm id={blogId} />
  );
}
