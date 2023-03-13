const { default: connectDB } = require("/middleware/mongoose");
const { default: posts } = require("/models/Posts");
const { default: users } = require("/models/User");
const { default: likes } = require("/models/Like");
import { unstable_getServerSession } from "next-auth";
import Comment from "../../../models/Comment";
import { authOptions } from "../auth/[...nextauth]";

type session = {
    user: {
        email: string
    }
}
const handler = async (req, res) => {

    if (req.method === 'POST') {

        const session: session = await unstable_getServerSession(req, res, authOptions);

        if (!session)
            return res.status(401).json({ success: false, message: 'Please signin to make a post!' });


        const userDB = await users.find({}).where('email').equals(session?.user?.email);

        const { postId } = req.body.data;
        // console.log(postId);


        // create comment
        try {
            // const allPosts = await posts.find();

            // const user = await users.find({}).where('email').equals(session?.user?.email);
            // const data = await posts.find().where('userId').equals(user[0]?._id).populate({ path: 'user comments', select: ['name', 'image', 'message'] });
            const data = await posts.find().where('_id').equals(postId).populate({ path: 'user likes', select: ['name', 'userId', 'postId', 'email', 'image', 'message', 'userId'] });
            // console.log(data?.comments);
            // console.log(data[0]);
            // console.log("asdasd");
            var result;
            // let usrs = [];
            if (data[0]?.likes.length > 0) {
                console.log("no");

                data[0]?.likes?.map(async (item) => {
                    const user = await likes.find().where('postId').equals(item.postId);
                    // user.flat()[0]
                    // console.log(item.userId === user.flat()[0]);
                    // console.log(user.flat());

                    user.flat().map(async (lik) => {
                        if (lik.userId.toString() === item.userId.toString()) {
                            // console.log(item.postId.toString());

                            posts.findById(item.postId.toString(), (err, post) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    result = new likes({ userId: userDB[0]?._id, postId: postId, isLike: 0 });
                                    post.likes.push(result);
                                    post.save();
                                    console.log(result, " unlike");
                                }
                            })
                        }

                        // const pst = await likes.find().where('postId').equals(item.postId);

                    })

                    // usrs.push({ name: user.name, avatar: user.image, message: item.message })
                })

            } else {
                const result = new likes({ userId: userDB[0]?._id, postId: postId, isLike: 1 });
                await result.save((err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        posts.findById(postId, (err, post) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                post.likes.push(result);
                                post.save();
                            }
                        })
                    }
                });
            }
            // res.status(200).json({ success: true, item, user })

            // const result = new likes({ userId: userDB[0]?._id, postId: postId, isLike: 1 });
            // await result.save((err, result) => {
            //     if (err) {
            //         console.log(err);
            //     }
            //     else {
            //         posts.findById(postId, (err, post) => {
            //             if (err) {
            //                 console.log(err);
            //             }
            //             else {
            //                 post.likes.push(result);
            //                 post.save();
            //             }
            //         })
            //     }
            // });
            res.status(200).json({ success: true, result })


        } catch (error) {
            res.status(403).json({ success: false, message: 'error has occured while making a comment!' })
        }
    }
    else {
        res.status(404).json({ success: false, message: 'internal server ersssror!' })
    }
}

export default connectDB(handler);