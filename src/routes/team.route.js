import express from "express";
import {addDocentComment, addShowcaseComment,getComment} from "../controllers/team.controller.js";

export const teamsRoute=express.Router();


teamsRoute.post('/:teamId/comment/docent',async(req,res)=>{
    const result = await addDocentComment(req,res);
})

teamsRoute.post('/:teamId/comment/showcase',async(req,res)=>{
    const result =await addShowcaseComment(req,res);
})

teamsRoute.get('/:teamId/comment/:type',async(req,res)=>{
    const result = await getComment(req,res);
})