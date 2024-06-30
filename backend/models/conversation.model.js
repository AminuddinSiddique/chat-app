import mongoose, { mongo } from "mongoose";

const conversationSchema = new mongoose.Schema({
    paricipants : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        }
    ],
    messages : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Message",
            default : []
        }
    ]
}, {timestamps:true});

const Conversation = mongoose.model("Conversations",conversationSchema);
export default Conversation;