'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CreatePost from "./components/AddPost";
import Posts from "./components/Posts";
import { useSession } from "next-auth/react";


const allPosts = async () => {
  const response = await axios.get('/api/posts/getPost');
  return response.data;
}

type data = {
  _id: string,
  comments: [

  ],
  title: string,
  userId: string,
  image: string,
  createdAt: string,
  user: {
    image: string,
    name: string,
    email: string,
  },
  likes: []
}

export default function Home() {

  const user = useSession();

  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ['posts']
  });

  if (error) return (<p> error</p>)
  if (isLoading) return (<p> Loading...</p>)

  return (
    <div>
      <CreatePost />
      {data?.data?.sort((a, b) => b.likes.length - a.likes.length).map((post: data) => <Posts createdAt={post.createdAt} userId={post.user?.email} likes={post.likes} image={post.image} myId={user?.data?.user?.email} comments={post.comments} key={post._id} avatar={post.user?.image} id={post._id} name={post.user?.name} postTitle={post.title} />)}
    </div>
  );
};