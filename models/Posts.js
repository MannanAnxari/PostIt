const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    published: { type: Boolean, default: false },
    userId: { type: String, required: true },

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