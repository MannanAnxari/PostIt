'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Toggle from './Toggle';
import { motion } from "framer-motion"
import { TfiDownload } from 'react-icons/tfi';

export default function EditPost({ avatar, name, title, comments, id, userId, likes, image }) {

    const [toggle, setToggle] = useState(false);
    let deleteToastId: string;
    let queryClient = useQueryClient();

    const { mutate } = useMutation(
        async (id: string) => await axios.delete('/api/posts/deletePost', { data: id }),
        {
            onError: (error) => {
                console.log(error);
                toast.error('Error Occured deleting this post', { id: deleteToastId });
            },
            onSuccess: (data) => {
                toast.success('Post Deleted Successfully!', { id: deleteToastId });
                queryClient.invalidateQueries(['myposts'])
            }
        }
    )

    const deletePost = () => {
        // deleteToastId = toast.loading('Deleting your post...', { id: deleteToastId })
        mutate(id);

    }

    const downloadFile = async (e) => {
        try {
            const res = await fetch(e);
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Send It';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <motion.div
                animate={{ opacity: 1, scale: 1, translateY: 0 }}
                initial={{ opacity: 0, scale: .8, translateY: 100 }}
                transition={{ ease: "easeOut" }}
                className="bg-white my-8 p-8 rounded-lg " >
                <div className='flex items-center gap-2'>

                    <Image width={34} height={34} src={avatar} alt="avatar" className='rounded-full' />
                    <h3 className='font-bold text-gray-700'>{name}</h3>
                </div>
                <div className='mt-8 mb-6'>
                    <p className="break-all">{title}</p>
                </div>
                {image &&
                    <div className="my-6 bg-gray-100 rounded-lg relative">
                        <Image className='max-h-80 object-contain relative h-full' fill={true} src={image} alt='image' />
                        <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} className="absolute bottom-6 right-6" onClick={() => downloadFile(image)}><TfiDownload />
                        </motion.button>
                    </div>
                }
                <div className='flex items-center gap-4'>
                    <p className="text-sm font-bold text-gray-700">
                        Comments ({comments?.length})
                    </p>

                    <button className="text-sm font-semibold text-red-600 hover:bg-red-700 hover:text-white transition-all py-2 px-6 rounded-md" onClick={() => setToggle(true)}>
                        Delete
                    </button>
                </div>
            </motion.div>
            {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
        </>
    )
}
