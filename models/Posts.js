// const mongoose = require('mongoose');
import { mongoose } from "mongoose"
import Like from "./Like"


const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    published: { type: Boolean, default: false },
    userId: { type: String, required: true },
    image: { type: String, required: false },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })

mongoose.models = {}
export default mongoose.model('Post', PostSchema)