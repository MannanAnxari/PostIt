const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    message: { type: String, required: true },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })

mongoose.models = {}
export default mongoose.model('Comment', CommentsSchema)