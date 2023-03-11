'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CreatePost from "./components/AddPost";
import Posts from "./components/Posts";

const allPosts = async () => {
  const response = await axios.get('/api/posts/getPost');
  return response.data;
}


const HomePage = () => {

  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ['posts']
  });

  if (error) return error
  if (isLoading) return 'Loading...'
  console.log(data.data);

  return (
    <div>
      <CreatePost />
      {data?.data?.map((post) => <Posts comments={post.comments} key={post._id} avatar={post.user?.image} id={post._id} name={post.user?.name} postTitle={post.title} />)}
    </div>
  );
};

export default HomePage;
