'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CreatePost from "../components/AddPost";
import Posts from "../components/Posts";
import { AuthPosts } from "../types/AuthPost";
import EditPost from "./EditPost";

const fetchAuthPosts = async () => {
    const response = await axios.get('/api/posts/authPosts');
    return response.data;
}

export default function MyPosts() {


    const { data, error, isLoading } = useQuery({
        queryFn: fetchAuthPosts,
        queryKey: ['myposts']
    });


    if (error) return error
    if (isLoading) return 'Loading...'

    console.log(data.data);



    return (
        <div>
            {/* {data?.data.map((item) => <EditPost avatar={item ?} />)}} */}
            {data?.data?.map((post) => <EditPost comments={post.comments} key={post._id} avatar={post.user?.image} id={post._id} name={post.user?.name} title={post.title} />)}

        </div>
    )
}
