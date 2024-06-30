import Conversation from "../models/conversation.model.js";
import Message from "../models/messages.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      paricipants: {
        $all: [senderId, reciverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        paricipants: [senderId, reciverId],
      });
    }

    const newMessage = new Message({
      senderId,
      reciverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // this will run sequentially
    // await newMessage.save()
    // await conversation.save()

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error in send Messages Controller SendMessage",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      paricipants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // Retuerns messages instead of refId

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error in get Messages Controller SendMessage",
    });
  }
};
