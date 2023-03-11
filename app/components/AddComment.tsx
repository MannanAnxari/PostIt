'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';


export default function AddComment({ id }: { id?: string }) {
    const [title, setTitle] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    let toastPostID: string

    const queryClient = useQueryClient();
    const { mutate } = useMutation(
        async (data: { title: string, postId: string }) => axios.post('/api/posts/addComment', { data }),
        {
            onError: (error) => {
                console.log(error);
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, { id: toastPostID })
                }
                setIsDisabled(false);
            },
            onSuccess: (data) => {
                console.log(data);

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

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        toastPostID = toast.loading("Creating your post", { id: toastPostID })
        // console.log(toastPostID);
        setIsDisabled(true);
        mutate({ title, postId: id })
    }

    return (
        <form className='my-8' onSubmit={handleComment}>
            <h3>Add a comment</h3>
            <div className="flex flex-col my-2">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="p-4 text-lg rounded-md my-2" placeholder='Type something to this weird post 💀' name='title' />
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className={`font-mono text-sm ${title.length > 300 ? 'text-red-700' : 'text-black'}`}>{`${title.length}/300`}</p>
                <button className='text-sm bg-blue-700 text-white rounded-md py-2 px-6' type='submit' disabled={isDisabled}>Add Comment 🔥</button>
            </div>
        </form>
    )
}
