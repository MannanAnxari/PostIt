const { default: connectDB } = require("/middleware/mongoose");
const { default: posts } = require("/models/Posts");
const { default: users } = require("/models/User");
const { default: comment } = require("/models/Comment");

const handler = async (req, res) => {

    if (req.method === 'GET') {

        //  fetch post 
        try {

            const data = await posts.find().populate({ path: 'user comments', select: ['name', 'image', 'message'] })
            // const data = await posts.find().populate({ path: 'comments', select: ['message'] })
            // const data = await posts.find();

            // const result = new comment({ message: "asdasd", userId: 'asdasd', postIt: 223 });
            // result.save();
            // res.status(200).json({ result })

            // const data = await posts.find()


            // const data = await posts.aggregate([
            //     {
            //         $lookup: {
            //             from: "user",
            //             pipeline: [
            //                 { $project: { user: 1 } }
            //             ],
            //             as: "roleDescription"
            //         }
            //     }
            // ])

            // const dd = await posts.find()  
            //     .populate(['userId'])      

            // const dta = await posts.find({ userId: currentUser._id }).sort({ createdAt: -1 }).populate('userId', '_id name email')
            // const dta = await posts.find({ userId: data._id }).populate('userId', '_id name email')


            // const data = await posts.find({}).populate('user')
            //     .exec(function (error, result) {
            //         console.log(error, result);
            //     }); 
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