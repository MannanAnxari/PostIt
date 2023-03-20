'use client';

import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import AddComment from "../../components/AddComment";
import Posts from "../../components/Posts";
// import { PostType } from "../../types/Post";
import { motion } from "framer-motion"
import { useSession } from "next-auth/react";

const fetchDetails = async (slug) => {
    const response = await axios.get(`/api/posts/${slug}`);
    return response.data;
}

// type URL = {
//     params: {
//         slug: string
//     }
// }

// type data = {
//     data: {
//         data: [
//             _id: string,
//             comments: [

//             ],
//             title: string,
//             user: {
//                 image: string,
//                 name: string
//             },

//         ]
//     },
//     isLoading: boolean
// }

// type PostType = {

// }

export default function PostDetail(url) {
    const user = useSession();
    const { data, isLoading } = useQuery({
        queryKey: ['details-posts'],
        queryFn: () => fetchDetails(url.params.slug)
    });
    if (isLoading) return 'loading...'
    // console.log(data?.data?.likes);

    return (
        <div>
            <Posts comments={data?.data?.comments} key={data?.data?._id} likes={data?.data?.likes} createdAt={data?.data?.createdAt} userId={data?.data?.user?.email} myId={user?.data?.user?.email} avatar={data?.data?.user?.image} id={data?.data?._id} name={data?.data?.user?.name} postTitle={data?.data?.title} />
            <motion.div
                animate={{ opacity: 1, scale: 1, translateY: 0 }}
                initial={{ opacity: 0, scale: .8, translateY: 100 }}
                transition={{ ease: "easeOut", delay: .2 }}
            >   <AddComment id={data?._id} />  </motion.div>
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
