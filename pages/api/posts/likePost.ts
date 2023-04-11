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
            return res.status(401).json({ success: false, message: 'Please signin to like a post!' });


        const userDB = await users.find({}).where('email').equals(session?.user?.email);

        const { postId } = req.body.data;
        // console.log(postId);

        // create comment
        try {


            // var type;
            // other concept start
            // post.title = 'ssssssss';
            // function setLikes() {
            // var dd;
            // post?.likes?.map(async (item) => {
            //     const dta = await likes.findById(item)

            //     if (dta?.likeUserId?.toString() != userDB[0]?._id?.toString()) {
            //         const result = new likes({ likeUserId: userDB[0]?._id, likePostId: postId, isLike: 1, postUserEmail: userDB[0]?.email });
            //         await result.save((err, result) => {
            //             if (err) {
            //                 console.log(err);
            //             }
            //             else {
            //                 dd = 'asda'

            //                 posts.findById(postId, (err, data) => {
            //                     if (err) {
            //                         console.log(err);
            //                     }
            //                     else {
            //                         console.log("asdasd");

            //                         data.likes.push(result);
            //                         data.save();
            //                     }
            //                 })
            //             }
            //         });
            //         type = 1
            //         // res.status(200).json({ success: true, isLike: 1 });
            //     } else {

            //         if (dta.isLike === '1') {
            //             dta.isLike = '0';
            //             dta.save();
            //             console.log("asd");

            //             dd = 'asda'
            //             type = 0
            //             // res.status(200).json({ success: true, isLike: 0 });
            //         } else {
            //             dta.isLike = '1';
            //             dta.save();
            //             console.log("asdasd");

            //             dd = 'asda'
            //             type = 1

            //         }
            //         // res.status(200).json({ success: true, isLike: type });
            //         // req.end();
            //     }
            //     // type = await dta.isLike === 1 ? 0 : 1;
            // });
            //     return 71;

            // }


            // post.save();
            // console.log(setLikes());

            // (async () => {
            //     console.log("asd ", setLikes())
            // })()

            // setLikes().then(function (res) {
            //     console.log("type: ", res);
            // })
            // res.status(200).json({ success: true, isLike: type });

            // if (post.likes.length === 0) {

            //     console.log("zero");
            //     type = 1;
            //     const result = new likes({ likeUserId: userDB[0]?._id, likePostId: postId, isLike: 1, postUserEmail: userDB[0]?.email });
            //     await result.save((err, result) => {
            //         if (err) {
            //             console.log(err);
            //         }
            //         else {
            //             posts.findById(postId, (err, data) => {
            //                 if (err) {
            //                     console.log(err);
            //                 }
            //                 else {
            //                     data.likes.push(result);
            //                     data.save();
            //                 }
            //             })
            //         }
            //     });
            //     return res.status(200).json({ success: true, isLike: 1 });
            // } else {
            //     console.log("else");

            //     post?.likes?.map(async (item: String) => {

            //         const dta = await likes.findById(item)
            //         // type = await dta.isLike === 1 ? 0 : 1;
            //         if (dta.isLike === '1') {
            //             dta.isLike = '0';
            //             await dta.save();
            //             return res.status(200).json({ success: true, isLike: 0 });
            //         } else {
            //             dta.isLike = '1';
            //             await dta.save();
            //             return res.status(200).json({ success: true, isLike: 1 });
            //         }

            //     })
            //     // console.log("else");

            // }
            // res.status(200).json({ success: true, isLike: 1 });
            // // console.log(post);
            // console.log(post);

            // other concept end 


            // res.status(500).json({ success: false, });

            // // const allPosts = await posts.find();

            // const user = await users.find({}).where('email').equals(session?.user?.email);
            // // const data = await posts.find().where('userId').equals(user[0]?._id).populate({ path: 'user comments', select: ['name', 'image', 'message'] });
            // // const data = await posts.find().where('_id').equals(postId).populate({ path: 'user likes', select: ['name', 'userId', 'postId', 'email', 'image', 'message', 'userId'] });
            // const data = await posts.find().where('_id').equals(postId).populate({ path: 'likes', select: ['userId', 'postId', 'isLike'] });



            // data[0].likes?.map(async (item) => {
            //     if (item.userId.toString() === user[0]?._id.toString()) {
            //         if (item.isLike === '1') {
            //             // item.isLike = '0' 
            //             posts.findById(postId, (err, post) => {
            //                 if (err) {
            //                     console.log(err);
            //                 }
            //                 else {
            //                     post.likes = [];
            //                     post.save(); 
            //                 }
            //             });
            //             const result = new likes({ userId: userDB[0]?._id, postId: postId, isLike: 0 });
            //             await result.save((err, result) => {
            //                 if (err) {
            //                     console.log(err);
            //                 }
            //                 else {
            //                     posts.findById(postId, (err, post) => {
            //                         if (err) {
            //                             console.log(err);
            //                         }
            //                         else {
            //                             console.log("post saved");

            //                             post.likes.push(result);
            //                             post.save();
            //                         }
            //                     })
            //                 }
            //             });
            //         }
            //         else {
            //             posts.findById(postId, (err, post) => {
            //                 if (err) {
            //                     console.log(err);
            //                 }
            //                 else {
            //                     post.likes = [];
            //                     post.save();
            //                 }
            //             });
            //             const result = new likes({ userId: userDB[0]?._id, postId: postId, isLike: 1 });
            //             await result.save((err, result) => {
            //                 if (err) {
            //                     console.log(err);
            //                 }
            //                 else {
            //                     posts.findById(postId, (err, post) => {
            //                         if (err) {
            //                             console.log(err);
            //                         }
            //                         else {
            //                             console.log("post saved");
            //                             post.likes.push(result);
            //                             post.save();
            //                         }
            //                     })
            //                 }
            //             });
            //         }
            //     } else {
            //         posts.findById(postId, (err, post) => {
            //             if (err) {
            //                 console.log(err);
            //             }
            //             else {
            //                 post.likes = [];
            //                 post.save();
            //             }
            //         });
            //         const result = new likes({ userId: userDB[0]?._id, postId: postId, isLike: 1 });
            //         await result.save((err, result) => {
            //             if (err) {
            //                 console.log(err);
            //             }
            //             else {
            //                 posts.findById(postId, (err, post) => {
            //                     if (err) {
            //                         console.log(err);
            //                     }
            //                     else {
            //                         console.log("post saved");
            //                         post.likes.push(result);
            //                         post.save();
            //                     }
            //                 })
            //             }
            //         });
            //     }
            // });

            // const result = await posts.find().where('_id').equals(postId).populate({ path: 'likes', select: ['userId', 'postId', 'isLike'] });


            // console.log(data[0].likes);


            // const result = new likes({ userId: userDB[0]?._id, postId: postId, isLike: 1 });

            // result.save(async (err, result) => {
            //     if (err) {
            //         console.log(err);
            //     }
            //     else {
            //         const data = await posts.find().where('_id').equals(postId).populate({ path: 'likes', select: ['userId', 'postId', 'isLike'] });
            //         // posts.findById(postId, (err, post) => {
            //         //     if (err) {
            //         //         console.log(err);
            //         //     }
            //         //     else {
            //         //         // post.comments.push(result);
            //         //         // post.save();
            //         //         // console.log(data);



            //         //     }
            //         // });
            //         // console.log(data);
            //         data[0].likes?.map(async (item) => {
            //             if (item.userId.toString() === user[0]?._id.toString()) {
            //                 if (item.isLike === '1') {
            //                     item.isLike = '0'
            //                     console.log("eeeeeeee");



            //                     // item.save()
            //                 }
            //                 else {
            //                     item.isLike = '1'
            //                     console.log("eeee");

            //                     // item.save()
            //                 }
            //             } else {
            //                 console.log("aaaa");
            //                 const result = new likes({ userId: userDB[0]?._id, postId: postId, isLike: 1 });
            //                 await result.save((err, result) => {
            //                     if (err) {
            //                         console.log(err);
            //                     }
            //                     else {
            //                         posts.findById(postId, (err, post) => {
            //                             if (err) {
            //                                 console.log(err);
            //                             }
            //                             else {
            //                                 post.likes.push(result);
            //                                 post.save();
            //                             }
            //                         })
            //                     }
            //                 });
            //             }
            //         });

            //     }
            // });

            // console.log(data[0].likes);
            // data.save();

            // var result;
            // let usrs = [];
            // if (data[0]?.likes.length > 0) {
            //     console.log("no");
            //     data[0]?.likes?.map(async (item) => {
            //         const user = await likes.find().where('postId').equals(item.postId);
            //         // user.flat()[0]
            //         // console.log(item.userId === user.flat()[0]);
            //         // console.log(user.flat());

            //         user.flat().map(async (lik) => {
            //             if (lik.userId.toString() === item.userId.toString()) {
            //                 // console.log(item.postId.toString());

            //                 posts.findById(item.postId.toString(), (err, post) => {
            //                     if (err) {
            //                         console.log(err);
            //                     }
            //                     else {
            //                         result = new likes({ userId: userDB[0]?._id, postId: postId, isLike: 0 });
            //                         post.likes.push(result);
            //                         post.save();
            //                         console.log(result, " unlike");
            //                     }
            //                 })
            //             }

            //             // const pst = await likes.find().where('postId').equals(item.postId);

            //         })

            //         // usrs.push({ name: user.name, avatar: user.image, message: item.message })
            //     })

            // } else {
            //     const result = new likes({ userId: userDB[0]?._id, postId: postId, isLike: 1 });
            //     await result.save((err, result) => {
            //         if (err) {
            //             console.log(err);
            //         }
            //         else {
            //             posts.findById(postId, (err, post) => {
            //                 if (err) {
            //                     console.log(err);
            //                 }
            //                 else {
            //                     post.likes.push(result);
            //                     post.save();
            //                 }
            //             })
            //         }
            //     });
            // }
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
            // const dta = await likes.find()

            const likez = await posts.find({ _id: postId, likes: userDB[0]?._id })

            if (likez?.length) {


                posts.findByIdAndUpdate(postId, {
                    $pull: { likes: userDB[0]?._id }
                }, {
                    new: true
                }).exec((err, data) => {
                    if (err) { return res.status(422).json({ success: false, message: err }) }
                    else {

                        return res.status(200).json({ success: true, isLike: 0 });
                        
                    }
                })
            } else {

                posts.findByIdAndUpdate(postId, {
                    $push: { likes: userDB[0]?._id }
                }, {
                    new: true
                }).exec((err, data) => {
                    if (err) { return res.status(422).json({ success: false, message: err }) }
                    else { return res.status(200).json({ success: true, isLike: 1 }); }
                })

            }



        } catch (error) {
            console.log(error);

            res.status(403).json({ success: false, message: 'error has occured while making a comment!' })
        }
    }
    else {
        res.status(500).json({ success: false, message: 'internal server ersssror!' })
    }
}

export default connectDB(handler);