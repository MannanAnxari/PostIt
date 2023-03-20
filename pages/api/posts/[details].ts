const { default: connectDB } = require("/middleware/mongoose");
const { default: posts } = require("/models/Posts");
const { default: users } = require("/models/User");
import { unstable_getServerSession } from "next-auth";
import Comment from "../../../models/Comment";
import { authOptions } from "../auth/[...nextauth]";
// import { connectDB } from "./../../../middleware/mongoose";
// import { posts } from "./../../../models/Posts";
// import { users } from "./../../../models/User";


const handler = async (req, res) => {

    if (req.method === 'GET') {

        // get auth users post
        try {
            // const user = await users.find({}).where('email').equals(session?.user?.email);
            // const data = await posts.find().where('userId').equals(user[0]?._id).populate({ path: 'user comments', select: ['name', 'image', 'message'] });
            const data = await posts.find().where('_id').equals(req.query.details).populate({ path: 'user comments likes', select: ['name', 'email', 'image', 'message', 'userId', 'isLike', 'likePostId', 'likeUserId'] });
            // console.log(data?.comments);

            // let usrs = [];
            // data[0]?.comments?.map(async (item) => {
            //     const user = await users.find().where('_id').equals(item.userId);
            //     console.log(item, user.name);
            //     usrs.push({ name: user.name, avatar: user.image, message: item.message })
            // })

            var dta = await Comment.find().where('postId').equals(req.query.details).populate({ path: 'userId', select: ['name', 'email', 'image', 'createdAt'] })


            res.status(200).json({ success: true, data:data[0], comments: dta })

        } catch (error) {
            console.log(error);

            res.status(403).json({ success: false, message: 'error has occured while making a post!' })
        }
    }
    else {
        res.status(500).json({ success: false, message: 'internal server error!' })
    }
}

export default connectDB(handler);