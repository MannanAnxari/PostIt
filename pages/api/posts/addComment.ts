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


        const userDB = await users.find({}).where('email').equals(session?.user?.email);
        console.log(req.body);



        const { title, postId } = req.body.data;
        console.log(title, postId);


        if (title.length > 300)
            return res.status(403).json({ success: false, message: 'Please write a shorter comment!' });

        if (!title.length)
            return res.status(403).json({ success: false, message: 'Please dont leave comment empty!' });

        // create comment
        try {
            const result = new Comment({ message: title, userId: userDB[0]?._id, postId: postId });
            result.save((err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    posts.findById(postId, (err, post) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            post.comments.push(result);
                            post.save();
                        }
                    })
                }
            });

            res.status(200).json({ success: true, result })

        } catch (error) {
            res.status(403).json({ success: false, message: 'error has occured while making a comment!' })
        }
    }
    else {
        res.status(500).json({ success: false, message: 'internal server error!' })
    }
}

export default connectDB(handler);