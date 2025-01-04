import Message from "../models/message.model.js";
import User from "../models/user.model.js"
// Send a message
export const sendMessage = async (req, res) => {
    const userId = req.params.userId; // Receiver's ID
    const { content } = req.body;
    console.log(content)

    try {
        // Fetch the receiver's user data to verify their role
        const receiver = await User.findById(userId);

        if (!receiver) {
            return res.status(404).json({ message: "Receiver not found" });
        }

        // Allow messages if the sender or receiver is admin
        if (req.user.role !== "admin" && receiver.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        // Create the message
        const message = await Message.create({
            senderId: req.user._id, // Current user sending the message
            receiverId: userId,    // Receiver's ID
            content,
        });

        res.status(201).json(message);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Failed to send message" });
    }
};


// Get all messages between a user and the admin
export const getMessages = async (req, res) => {
    const userId = req.params.userId; // ID of the other participant in the chat
    console.log("Fetching messages for chat with:", userId);

    try {
        const messages = await Message.find({
            $or: [
                { senderId: req.user._id, receiverId: userId }, // User to admin
                { senderId: userId, receiverId: req.user._id }, // Admin to user
            ],
        }).sort({ createdAt: 1 }); // Sort messages by creation time

        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Failed to fetch messages" });
    }
};
