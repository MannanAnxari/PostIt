'use client';

import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import AddComment from "../../components/AddComment";
import Posts from "../../components/Posts";
import { PostType } from "../../types/Post";
import { motion } from "framer-motion"
import { useSession } from "next-auth/react";

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`);
    return response.data;
}

type URL = {
    params: {
        slug: string
    }
}

type data = {
    data: {
        data: [
            _id: string,
            comments: [

            ],
            title: string,
            user: {
                image: string,
                name: string
            },

        ]
    },
    isLoading: boolean
}

export default function PostDetail(url: URL) {
    const user = useSession();
    const { data, isLoading } = useQuery<PostType[]>({
        queryKey: ['details-posts'],
        queryFn: () => fetchDetails(url.params.slug)
    });
    if (isLoading) return 'loading...'

    return (
        <div>
            <Posts comments={data?.data[0]?.comments} key={data?.data[0]?._id} createdAt={data?.data[0]?.createdAt} userId={data?.data[0]?.user?.email} myId={user?.data?.user?.email} avatar={data?.data[0]?.user?.image} id={data?.data[0]?._id} name={data?.data[0]?.user?.name} postTitle={data?.data[0]?.title} />
            <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ ease: "easeOut" }}

            >   <AddComment id={data?.data[0]?._id} />  </motion.div>
            {data?.comments.map((item) => {
                return <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    transition={{ ease: "easeOut" }}
                    className="my-6 bg-white p-8 rounded-md"
                    key={item._id}
                >
                    <div className="justify-between flex items-center gap-2">
                        <div className="flex items-center gap-2">

                            <Image src={`${item?.userId?.image}`} width={34} height={34} alt='avatar' className="rounded-full" />
                            <h3 className="font-bold">{item?.userId?.name}</h3>
                            <h3 className='font-bold text-gray-700'> {name} {item?.userId?.email === user?.data?.user?.email && ' (You)'}</h3>
                        </div>
                        <h2 className="text-sm">{new Date(item.createdAt).toLocaleString("en-us")}</h2>
                    </div>
                    <div className="pt-4">
                        {item.message}
                    </div>

                </motion.div>
            })}
        </div>
    )
}
