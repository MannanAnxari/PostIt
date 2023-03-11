'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Toggle from './Toggle';

export default function EditPost({ avatar, name, title, comments, id }) {

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
        deleteToastId = toast.loading('Deleting your post...', { id: deleteToastId })
        mutate(id);

    }
    return (
        <>
            <div className='bg-white my-8 p-8 rounded-lg'>
                <div className='flex items-center gap-2'>

                    <Image width={34} height={34} src={avatar} alt="avatar" className='rounded-full' />
                    <h3 className='font-bold text-gray-700'>{name}</h3>
                </div>
                <div className='my-8'>
                    <p className="break-all">{title}</p>
                </div><div className='flex items-center gap-4'>
                    <p className="text-sm font-bold text-gray-700">
                        Comments ({comments?.length})
                    </p>
                    <button className="text-sm font-bold text-red-600" onClick={() => setToggle(true)}>
                        Delete
                    </button>
                </div>
            </div>
            {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
        </>
    )
}
