// import 'dotenv/config'
import mongoose, { model, mongo, Mongoose, Types } from 'mongoose'
import { MONGO_URI} from '../config/config';
mongoose.connect(MONGO_URI);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }

}, { timestamps: true});

export const User = mongoose.model("User", userSchema);


const contentTypes = ["image", "video", "article", "audio", "youtube", "twitter"]

const contentSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: contentTypes,
        // required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Tag',
        default: []
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true})

export const Content = mongoose.model("Content", contentSchema);

const linkSchema = new mongoose.Schema({
    hash: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const Links = mongoose.model("Links", linkSchema);