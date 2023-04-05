'use client';

import Image from 'next/image'
import Link from 'next/link'
import { motion } from "framer-motion"
import { AiFillHeart } from 'react-icons/ai';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";


type data = {
    success: Boolean,
}

const Posts = ({ avatar, name, postTitle, id, comments, userId, myId, createdAt, likes }) => {

    // console.log(userId, myId);
    const [likesCount, setLikesCount] = useState(likes);
    const [isDisabled, setIsDisabled] = useState(false);
    let toastPostID: string
    const today = new Date()
    const user = useSession();
 
    console.log(myId);
    

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
            onSuccess: (res) => {
                if (res.data.success) {
                    if (res?.data.isLike === 1) {
                        setLikesCount([...likesCount, { email: user?.data?.user?.email }]);
                    }
                    else {
                        let liks = likesCount.filter(function (obj) {
                            return obj.email !== myId;
                        });
                        setLikesCount(liks);
                    }
                }
                // toast.success("Post has been made 🔥", { id: toastPostID })
            }
        }
    )



    // useEffect(() => {
    //     return () => {
    //         likes.map((item) => {
    //             console.log(item);
    //                 setLikesCount({ userId: item.postUserEmail, like: likesCount.like + 1 });
    //             // console.log(item.isLike);
    //         });
    //     }
    // }, [])



    const handleLike = async (id: string) => {
        mutate({ postId: id })
    }

    const postDate = new Date(createdAt).toLocaleString("en-us");

    return (
        <motion.div animate={{ opacity: 1, scale: 1, translateY: 0 }}
            initial={{ opacity: 0, scale: .8, translateY: 60 }}
            transition={{ ease: "easeOut", delay: .2 }}
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

                <motion.button
                    className="text-center flex gap-2 items-center"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLike(id)}
                >
                    <AiFillHeart className={`${likesCount.find(o => o.email === myId) && 'text-red-600'}`} /> {likesCount.length}
                </motion.button>
                <Link href={`/post/${id}`}>
                    <motion.button
                        className='text-sm font-bold text-gray-600 transition-all hover:bg-blue-700 px-6 py-2 rounded-md hover:text-white active:bg-blue-800'
                        whileTap={{ scale: 0.95 }}
                    >
                        Comments ({comments?.length > 99 ? '99+' : comments.length})
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    )
}

export default Posts