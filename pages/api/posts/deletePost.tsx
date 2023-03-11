const { default: connectDB } = require("/middleware/mongoose");
const { default: posts } = require("/models/Posts");
const { default: users } = require("/models/User");
import { unstable_getServerSession } from "next-auth";
import Comment from "../../../models/Comment";
import { authOptions } from "../auth/[...nextauth]";


const handler = async (req, res) => {

    if (req.method === 'DELETE') {
        const session = await unstable_getServerSession(req, res, authOptions);



        if (!session)
            return res.status(401).json({ success: false, message: 'Please signin in!' });

        const id = req.body;


        // get auth users post
        try {
            const data = await posts.find().where('_id').equals(id).remove();

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