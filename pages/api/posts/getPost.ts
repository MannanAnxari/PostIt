const { default: connectDB } = require("/middleware/mongoose");
const { default: posts } = require("/models/Posts");
const { default: users } = require("/models/User");
const { default: likes } = require("/models/Like");
const { default: comment } = require("/models/Comment");

const handler = async (req, res) => {

    if (req.method === 'GET') {

        //  fetch post 
        try {

            const data = await posts.find().sort({ createdAt: -1 }).populate({ path: 'user comments likes', select: ['name', 'userId', 'postUserEmail', 'image', 'email', 'message', 'isLike', 'likePostId', 'likeUserId'] })

            // console.log(data);

            res.status(200).json({ success: true, data })

        } catch (error) {
            console.log(error);
            res.status(403).json({ success: false, message: 'error has occured while fetching a posts!' })
        }
    }
    else {
        res.status(500).json({ success: false, message: 'internal server error!' })
    }
}

export default connectDB(handler);