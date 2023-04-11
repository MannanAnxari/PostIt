'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditPost from "./EditPost";

const fetchAuthPosts = async () => {
    const response = await axios.get('/api/posts/authPosts');
    return response.data;
}


type data = {
    _id: string,
    comments: [

    ],
    title: string,
    userId: string,
    user: {
        image: string,
        name: string
    },
    likes: []
}

export default function MyPosts() {


    const { data, error, isLoading } = useQuery({
        queryFn: fetchAuthPosts,
        queryKey: ['myposts']
    });


    if (error) return (<p>Something went wrong!</p>)
    if (isLoading) return (<p>Loading...</p>)
    else {
        return (
            <>
                {/* {data?.data.map((item) => <EditPost avatar={item ?} />)}} */}
                <div className="mt-4">
                    {!data?.data.length ? 'No posts yet! 😣' :
                        data?.data?.map((post: data) => <EditPost likes={post.likes} comments={post.comments} userId={post.userId} key={post._id} avatar={post.user?.image} id={post._id} name={post.user?.name} title={post.title} />)
                    }
                </div>

            </>
        )
    }
}
