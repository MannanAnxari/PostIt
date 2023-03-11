'use client';

import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import AddComment from "../../components/AddComment";
import Posts from "../../components/Posts";
import { PostType } from "../../types/Post";

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`);
    return response.data;
}

type URL = {
    params: {
        slug: string
    }
}
export default function PostDetail(url: URL) {
    const { data, isLoading } = useQuery<PostType[]>({
        queryKey: ['details-posts'],
        queryFn: () => fetchDetails(url.params.slug)
    });

    if (isLoading) return 'loading...'
    console.log(data.comments);

    return (
        <div>
            <Posts comments={data?.data[0]?.comments} key={data?.data[0]?._id} avatar={data?.data[0]?.user?.image} id={data?.data[0]?._id} name={data?.data[0]?.user?.name} postTitle={data?.data[0]?.title} />
            <AddComment id={data?.data[0]?._id} />
            {data?.comments.map((item) => {
                return <div key={item._id} className="my-6 bg-white p-8 rounded-md">
                    <div className="flex items-center gap-2">
                        <Image src={`${item?.userId?.image}`} width={34} height={34} alt='avatar' className="rounded-full" />
                        <h3 className="font-bold">{item?.userId?.name}</h3>
                        <h2 className="text-sm">{item.createdAt}</h2>
                    </div>
                    <div className="pt-4">
                        {item.message}
                    </div>
                </div>
            })}
        </div>
    )
}
