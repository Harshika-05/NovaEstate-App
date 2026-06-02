import jwt from "jsonwebtoken";
export const shouldBeLoggedIn = async (req , res)=>{

    console.log(req.userId);
    res.status(200).json({message : "You are authenticated"})
}

export const shouldBeAdmin = async (req , res) =>{

    const token = req.cookies.token;
    if(!token) {return res.status(401).json({message : "Not Authenticated!"})}

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!payload.isAdmin)
        {
            return res.status(403).json({message : "Not Authorized"})
        }
        res.status(200).json({message : "You are authenticated"})
    } catch(err) {
        return res.status(403).json({message : "Token is not valid!"})
    }
}
