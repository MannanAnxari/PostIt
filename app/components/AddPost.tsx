'use client';

import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from 'axios'
import { useState, useRef } from "react";
import { toast } from 'react-hot-toast';
import { motion } from "framer-motion"
import { CiImageOn } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';



const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [isDisabled, seIsDisabled] = useState(false);
    const queryClient = useQueryClient();
    let toastPostID: string;
    const img = useRef(null);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dmfeom3v4'

    // create post 
    const { mutate } = useMutation(
        async ([title, imgUrl]: [any, any]) => await axios.post('/api/posts/addPost', { title, imgUrl }), {
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
            setImage(null);
            setImageUrl('');
            img.current.value = '';
            queryClient.invalidateQueries(["posts"]);
            setTimeout(() => {
                toast.dismiss(toastPostID)
            }, 1000);
            seIsDisabled(false);
        }
    });



    const handlePost = async (e: React.FormEvent) => {

        e.preventDefault();

        seIsDisabled(true);

        if (!title) {
            seIsDisabled(false);
            return toast.error('Please don\'t leave it empty!');
        };

        const imgUrls = await uploadImage();

        if (imgUrls.success === false) {
            seIsDisabled(false);
            console.log(imgUrls);
            return toast.error(imgUrls.error);
        }

        const imgUrl = imgUrls.url !== undefined ? imgUrls.url : null;

        mutate([title, imgUrl]);

    }

    const uploadImage = async () => {

        if (!imageUrl) return { success: true };

        const data = new FormData();

        data.append('file', imageUrl)
        data.append('upload_preset', 'crl4gmtt')
        data.append('cloud_name', 'dmfeom3v4');


        try {
            const response = await axios({
                method: 'post',
                url: `${CLOUDINARY_URL}/image/upload`,
                data
            });
            return { success: true, url: response.data.url };
        } catch (error) {
            console.log({ success: false, error: error.response.data.error.message });
            return { success: false, error: error.response.data.error.message };
        }

    }


    const handleUpload = (event) => {
        setImageUrl(event.target.files[0])
        setImage(URL.createObjectURL(event.target.files[0]));
    }

    return (

        <motion.div
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            initial={{ opacity: 0, scale: .8, translateY: 100 }}
            transition={{ ease: "easeOut", }}

            className="bg-white my-8 p-8 rounded-md">

            <form onSubmit={handlePost}>
                <div className="flex flex-col my-4">
                    <textarea onChange={(e) => setTitle(e.target.value)} value={title} className={`p-4 text-lg rounded-md my-2 bg-gray-200 outline-2 transition-all ${title.length > 300 ? 'outline-red-600' : 'outline-black'}`} name="title" placeholder="What is in your mind... 🤔"> </textarea>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <p className={`font-mono text-sm ${title.length > 300 ? 'text-red-700' : 'text-black'}`}>{`${title.length}/300`}</p>
                    <div className="flex items-center gap-4">
                        {image &&
                            <div className="relative">
                                <img src={image} alt="uploaded image" className="w-10 h-10 object-contain rounded-md" />
                                <button type="button" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white bg-opacity-70 rounded-md opacity-0 w-full h-full flex items-center justify-center text-lg hover:opacity-100 transition-opacity duration-300" onClick={() => { img.current.value = ''; setImage(null); setImageUrl(null) }}><IoCloseOutline /></button>
                            </div>
                        }
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="text-2xl relative cursor-pointer"
                        >
                            <CiImageOn className={'text-blue-700'} />
                            <input type="file" accept="image/jpeg, image/png, image/jpg" ref={img} onChange={handleUpload} className="w-full h-full absolute top-0 left-0 opacity-0" />
                        </motion.button>
                        <motion.button
                            className="text-sm bg-blue-700 rounded-md disabled:opacity-25 text-white transition-all hover:bg-blue-500 px-6 py-2 active:bg-blue-800" type="submit" disabled={isDisabled}
                            whileTap={{ scale: 0.95 }}
                        >
                            Create a post
                        </motion.button>
                    </div>
                </div>
            </form>
        </motion.div>
    )
}

export default CreatePost