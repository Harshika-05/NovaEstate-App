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
app.use(cors({origin : ["https://nova-estate-app.vercel.app" , "http://localhost:5173"] , credentials : true}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth' , authRoute);
app.use('/api/users' , userRoute);
app.use('/api/posts' , postRoute);
app.use('/api/test' , testRoute);
app.use('/api/chats' , chatRoute);
app.use('/api/messages' , messageRoute);
app.listen(8000 , ()=>{
    console.log("server is running")
})
