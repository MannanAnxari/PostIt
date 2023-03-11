const { default: connectDB } = require("/middleware/mongoose");
const { default: posts } = require("/models/Posts");
const { default: users } = require("/models/User");
import { unstable_getServerSession } from "next-auth";
import Comment from "../../../models/Comment";
import { authOptions } from "../auth/[...nextauth]";


const handler = async (req, res) => {

    if (req.method === 'POST') {
        const session = await unstable_getServerSession(req, res, authOptions);



        if (!session)
            return res.status(401).json({ success: false, message: 'Please signin to make a post!' });

        const { title } = req.body;

        const userDB = await users.find({}).where('email').equals(session?.user?.email);

        // const result = new Comment({ message: title, userId: userDB[0]?._id, postId: '640ce997b3adb0f59a71ad2b' });
        // result.save((err, result) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         posts.findById('640ce997b3adb0f59a71ad2b', (err, post) => {
        //             if (err) {
        //                 console.log(err);
        //             }
        //             else {
        //                 post.comments.push(result);
        //                 post.save();
        //             }
        //         })
        //         console.log("post: ", result);
        //     }
        // });

        if (title.length > 300)
            return res.status(403).json({ success: false, message: 'Please write a shorter post!' });

        if (!title.length)
            return res.status(403).json({ success: false, message: 'Please dont leave post empty!' });

        // create post 
        try {
            const result = new posts({ title: title, user: userDB[0]?._id, userId: userDB[0]?._id });
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