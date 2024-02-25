import express from "express";
import {addDocentComment, addShowcaseComment,getComment} from "../controllers/team.controller.js";
import {getDocent,getPodcast,getDocentScript,getPodcastScript,addScirpt} from "../controllers/team.controller.js";

export const teamsRoute=express.Router();


teamsRoute.post('/:teamId/comment/docent',async(req,res)=>{
    const result = await addDocentComment(req,res);
})

teamsRoute.post('/:teamId/comment/podcast',async(req,res)=>{
    const result =await addShowcaseComment(req,res);
})

teamsRoute.get('/:teamId/comment/:type',async(req,res)=>{
    const result = await getComment(req,res);
})
teamsRoute.get('/:teamId/docent',async(req,res)=>{
    const result = await getDocent(req,res);
})
teamsRoute.get('/:teamId/podcast',async(req,res)=>{
    const result = await getPodcast(req,res);
})
teamsRoute.get('/:teamId/docent/script',async(req,res)=>{
    const result= await getDocentScript(req,res);
})
teamsRoute.get('/:teamId/podcast/script',async(req,res)=>{
    const result= await getPodcastScript(req,res);
})
teamsRoute.post('/:teamId/:type/script',async(req,res)=>{
    const result = await addScirpt(req,res);
})
