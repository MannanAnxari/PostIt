const { default: connectDB } = require("/middleware/mongoose");
const { default: posts } = require("/models/Posts");
const { default: users } = require("/models/User");
import { unstable_getServerSession } from "next-auth";
import Comment from "../../../models/Comment";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';



type session = {
    user: {
        email: string
    }
}

const upload = multer();


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const session: session = await unstable_getServerSession(req, res, authOptions);

        if (!session) return res.status(401).json({ success: false, message: 'Please signin to make a post!' });

        const { title, imgUrl } = req.body;

        const userDB = await users.find({}).where('email').equals(session?.user?.email);

        if (title.length > 300)
            return res.status(403).json({ success: false, message: 'Please write a shorter post!' });

        if (!title.length)
            return res.status(403).json({ success: false, message: 'Please don\'t leave it empty!' });

        // create post
        try {

            const result = new posts({ title: title, user: userDB[0]?._id, userId: userDB[0]?._id, image: imgUrl || null });

            result.save();

            res.status(200).json({ success: true, result })

        } catch (error) {
            res.status(403).json({ success: false, message: 'error has occured while making a post!' })
        }
    }
    else {
        res.status(500).json({ success: false, message: 'internal server error!' })
    }
}

export default connectDB(handler);