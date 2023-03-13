const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    isLike: { type: String, required: false },
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
export default mongoose.model('Like', LikeSchema)