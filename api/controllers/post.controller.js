import prisma from "../lib/prisma.js";
//import { Jwt } from "jsonwebtoken";

export const getPosts = async (req, res) => {
try{
    const tokenUserId = req.userId;
    const query = req.query;

    const posts = await prisma.post.findMany({
        where:{ buyerId: tokenUserId
         },
        include: {
            bets: true},
    });
   
    res.status(200).json(posts)
}catch(err){
    res.status(500).json({message:"Failed to get posts"})
}
};

export const getPost = async (req, res) => {
    const id = req.params.id
    const tokenUserId = req.userId;
    
    try{
        const post = await prisma.post.findUnique({
            where:{buyerId: tokenUserId ,id},
            include: {
                bets: true},
            
        });
        
        res.status(200).json(post)
    }catch(err){
        res.status(500).json({message:"Failed to get post"})
    }
    };

    export const addPost = async (req, res) => {
        
        const body = req.body;
        const tokenUserId = req.userId;

        try{
            const newPost = await prisma.post.create({
                data:{
                    ...body.postData,
                    buyerId: tokenUserId,
                    bets: {
                            createMany:{
                                data:body.bets,
                            }
                        
                    }
            
            },
            include:{
                bets:true,
            },
            })
            
            
            res.status(200).json(newPost)
        }catch(err){
            console.log(err);
            res.status(500).json({message:"Failed to add post"})
        }
        };