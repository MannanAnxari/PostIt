const { default: connectDB } = require("/middleware/mongoose");
const { default: posts } = require("/models/Posts");
const { default: users } = require("/models/User");
import { unstable_getServerSession } from "next-auth";
import Comment from "../../../models/Comment";
import { authOptions } from "../auth/[...nextauth]";

type session = {
    user: {
        email: string
    }
}


const handler = async (req, res) => {

    if (req.method === 'GET') {
        const session: session = await unstable_getServerSession(req, res, authOptions);



        if (!session)
            return res.status(401).json({ success: false, message: 'Please signin in!' });




        // get auth users post
        try {
            const user = await users.find({}).where('email').equals(session?.user?.email);
            const data = await posts.find().where('userId').equals(user[0]?._id).sort({ createdAt: -1 }).populate({ path: 'user comments', select: ['name', 'email', 'image', 'message'] });

            res.status(200).json({ success: true, data })

        } catch (error) {
            // console.log(error);

            res.status(403).json({ success: false, message: 'error has occured while making a post!' })
        }
    }
    else {
        res.status(500).json({ success: false, message: 'internal server error!' })
    }
}

export default connectDB(handler);