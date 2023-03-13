'use client';

import Image from 'next/image'
import Link from 'next/link'
import { motion } from "framer-motion"
import { AiFillHeart } from 'react-icons/ai';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';



const Posts = ({ avatar, name, postTitle, id, comments, userId, myId, createdAt }) => {

    // console.log(userId, myId);

    const [isDisabled, setIsDisabled] = useState(false);
    let toastPostID: string
    const today = new Date()

    const queryClient = useQueryClient();
    const { mutate } = useMutation(
        async (data: { postId: string }) => axios.post('/api/posts/likePost', { data }),
        {
            onError: (error) => {
                console.log(error);
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, { id: toastPostID })
                }
                setIsDisabled(false);
            },
            onSuccess: (data) => {

                toast.success("Post has been made 🔥", { id: toastPostID })
                // setTitle('');
                queryClient.invalidateQueries(["details-posts"]);
                // setTimeout(() => {
                //     toast.dismiss(toastPostID)
                // }, 1000);
                setIsDisabled(false);
            }
        }
    )


    const handleLike = async (id: string) => {
        // toastPostID = toast.loading("like post", { id: toastPostID })
        // console.log(toastPostID); 

        setIsDisabled(true);
        mutate({ postId: id })
    }

    const postDate = new Date(createdAt).toLocaleString("en-us");
    return (
        <motion.div animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ ease: "easeOut" }}
            className="bg-white my-8 p-8 rounded-lg" >
            <div className="flex justify-between items-center gap-2">
                <div className='flex gap-2 items-center'>
                    <Image className='rounded-full' width={34} height={34} src={avatar} alt='avatar' />
                    <h3 className='font-bold text-gray-700'> {name} {userId !== undefined && myId !== undefined ? userId === myId && ' (You)' : ''}</h3>
                </div>
                <h2 className="text-sm"> {new Date(createdAt).getDate() == today.getDate() ? 'Today' + postDate.split(',')[1] : postDate}</h2>
            </div>
            <div className='mt-8 mb-6'>
                <p className="break-all">{postTitle}</p>
            </div>
            <div className='flex gap-2 cursor-pointer items-center'>
                <button className="text-center" onClick={() => handleLike(id)}>
                    <AiFillHeart />
                </button>
                <Link href={`/post/${id}`}>
                    <p className='text-sm font-bold text-gray-600 transition-all hover:bg-blue-700 px-6 py-2 rounded-md hover:text-white active:bg-blue-800'>
                        Comments ({comments?.length > 99 ? '99+' : comments.length})
                    </p>
                </Link>
            </div>
        </motion.div>
    )
}

export default Posts