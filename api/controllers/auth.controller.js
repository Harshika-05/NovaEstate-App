import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async(req , res)=>{
    const {username , email , password} = req.body;

    try{
        // Validation - Check required fields
        if(!username || !email || !password) {
            return res.status(400).json({message : "Username, email and password are required"});
        }

        // Validation - Password minimum length
        if(password.length < 6) {
            return res.status(400).json({message : "Password must be at least 6 characters"});
        }

        // Validation - Email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({message : "Please provide a valid email"});
        }

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if(existingUser) {
            if(existingUser.email === email) {
                return res.status(400).json({message : "Email already in use"});
            }
            if(existingUser.username === username) {
                return res.status(400).json({message : "Username already taken"});
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password , 10);
        console.log("User registration attempt:", {username, email});

        // Create a new user and save to db
        const newUser = await prisma.user.create({
            data : {
                username, 
                email, 
                password : hashedPassword,
            },
        });

        console.log("User created successfully:", newUser.id);
        res.status(201).json({message : "User created successfully"});

    }catch(err) {
        console.error("Registration error:", err.message);
        
        // Handle Prisma unique constraint errors
        if(err.code === 'P2002') {
            const field = err.meta?.target?.[0] || 'field';
            return res.status(400).json({message : `${field} already exists`});
        }
        
        res.status(500).json({message : "Failed to create user"})
    }
}

export const login = async (req , res)=>{
    const {username , password} = req.body;
    try{
        // Validation - Check required fields
        if(!username || !password) {
            return res.status(400).json({message : "Username and password are required"});
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where : {username}
        })

        if(!user) return res.status(401).json({message : "Invalid credentials"});
        
        // Check if the password is correct 
        const isPasswordValid = await bcrypt.compare(password , user.password);

        if(!isPasswordValid) return res.status(401).json({message : "Invalid credentials"});

        // Generate cookie token and send it to user
        const age = 1000*60*60*24*7; // 7 days

        const token = jwt.sign({
            id : user.id,
            isAdmin : false,
        } , process.env.JWT_SECRET_KEY , {expiresIn : age});

        const {password : userPassword , ...userInfo} = user

        res.cookie("token" , token , {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : "lax",
            maxAge : age
        }).status(200).json(userInfo)

    }catch(err) {
        console.error("Login error:", err.message);
        res.status(500).json({message : "Failed to login"})
    }
}

export const logout = (req , res)=>{
    res.clearCookie("token").status(200).json({message : "logout successful"})
}