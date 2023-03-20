'use client';

import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { motion } from "framer-motion"

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [isDisabled, seIsDisabled] = useState(false);
    const queryClient = useQueryClient();
    let toastPostID: string

    // create post 
    const { mutate } = useMutation(
        async (title: string) => await axios.post('/api/posts/addPost', { title }),
        {
            onError: (error) => {
                console.log(error);
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, { id: toastPostID })
                }
                seIsDisabled(false);

            },
            onSuccess: (data) => {
                toast.success("Post has been made 🔥", { id: toastPostID })
                setTitle('');
                queryClient.invalidateQueries(["posts"]);
                setTimeout(() => {
                    toast.dismiss(toastPostID)
                }, 1000);
                seIsDisabled(false);
            }
        }

    );

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        // toastPostID = toast.loading("Creating your post", { id: toastPostID })
        // console.log(toastPostID);
        seIsDisabled(true);
        mutate(title)
    }



    return (

        <motion.div
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            initial={{ opacity: 0, scale: .8, translateY: 100 }}
            transition={{ ease: "easeOut", }}

            className="bg-white my-8 p-8 rounded-md">

            <form onSubmit={handlePost}>
                <div className="flex flex-col my-4">
                    <textarea onChange={(e) => setTitle(e.target.value)} value={title} className={`p-4 text-lg rounded-md my-2 bg-gray-200 outline-2 transition-all ${title.length > 300 ? 'outline-red-600' : 'outline-black'}`} name="title" placeholder="What is in your mind..."> </textarea>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <p className={`font-mono text-sm ${title.length > 300 ? 'text-red-700' : 'text-black'}`}>{`${title.length}/300`}</p>
                    <motion.button
                        className="text-sm bg-blue-700 rounded-md disabled:opacity-25 text-white transition-all hover:bg-blue-500 px-6 py-2 active:bg-blue-800" type="submit" disabled={isDisabled}
                        whileTap={{ scale: 0.95 }}
                    >
                        Create a post
                    </motion.button>
                </div>
            </form>
        </motion.div>
    )
}

export default CreatePost