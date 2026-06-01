import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();

// CORS configuration - Allow localhost and Vercel
app.use(cors({
    origin: [
        "https://nova-estate-app.vercel.app", 
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/test', testRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});