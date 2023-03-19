// const mongoose = require('mongoose');
import { mongoose } from "mongoose"


const LikeSchema = new mongoose.Schema({
    isLike: { type: String, required: true },
    likePostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    likeUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postUserEmail: {
        type: String,
        required: true
    },
}, { timestamps: true })

mongoose.models = {}
export default mongoose.model('Like', LikeSchema)