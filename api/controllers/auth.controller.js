import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req,res)=>{
     const { number, username, password } = req.body;
try{
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await prisma.user.create({
        data:{
            number,
            username,
            password: hashedPassword,
        },
    });

    res.status(201).json({ message: "User created successfully" });
}catch(err){
    res.status(500).json({message:"Failed to create user"});


}    
};

export const login = async (req,res)=>{
    const { number,password } = req.body;

    try{

        const user = await prisma.user.findUnique({
            where:{number},
        });

        if(!user) return res.status(400).json({message:"Invalid"});

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

      //res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
      const age = 1000 * 60 * 60 * 24 ;  
     
      const token = Jwt.sign(
        {
        id:user.id
      },
      process.env.JWT_SECRET_KEY,{expiresIn: age}
      );
      
      const { password:userPassword , ...userInfo} = user;

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
             sameSite: 'none',
            maxAge: age,
        })
        .status(200)
        .json(userInfo);

    }catch(err){
        res.status(500).json({message:"failed to login"})
    }
}

export const logout = (req,res)=>{
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
}
