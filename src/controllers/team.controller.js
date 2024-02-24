
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import {insertDocentComment,insertShowcaseComment,viewComment} from "../service/team.service.js"
import { viewDocent,viewPodcast,viewDocentScript,viewPodcastScript} from "../service/team.service.js";

export const  addDocentComment= async (req,res)=>{
    try {
        const time= new Date()
        console.log("도슨트 댓글 추가를 요청하셨습니다.");
        const data={
            "team":req.params.teamId,
            "comment":req.body.comment,
            "created_at":time
        }
        res.send(response(status.SUCCESS,await insertDocentComment(data)));
    } catch (error) {
        res.send(response(status.BAD_REQUEST,error));
    }
}
export const  addShowcaseComment= async (req,res)=>{
    try {
        const time= new Date()
        console.log("팟케스트 댓글 추가를 요청하셨습니다.");
        const data={
            "team":req.params.teamId,
            "comment":req.body.comment,
            "created_at":time
        }
        res.send(response(status.SUCCESS,await insertShowcaseComment(data)));
    } catch (error) {
        res.send(response(status.BAD_REQUEST,error));
    }
}
export const getComment=async(req,res)=>{
    try{
        const data={
            "team":req.params.teamId,
            "type":req.params.type
        }
        res.send(response(status.SUCCESS,await viewComment(data)));
    }catch(error){
        res.send(response(status.BAD_REQUEST,error));
    }
}

export const getDocent= async(req,res)=>{
    try {
        const data={
            "team":req.params.teamId
        }
        res.send(response(status.SUCCESS,await viewDocent(data)));
    } catch (error) {
        res.send(response(status.BAD_REQUEST,error));
    }
}

export const getPodcast = async(req,res)=>{
    try {
        const data={
            "team":req.params.teamId
        }
        res.send(response(status.SUCCESS,await viewPodcast(data)));
    } catch (error) {
        res.send(response(status.BAD_REQUEST,error));
    }
}

export const getDocentScript= async(req,res)=>{
    try {
        const data={
            "team":req.params.teamId
        }
        res.send(response(status.SUCCESS,await viewDocentScript(data)));
    } catch (error) {
        res.send(response(status.BAD_REQUEST,error));
    }
}
export const getPodcastScript= async(req,res)=>{
    try {
        const data={
            "team":req.params.teamId
        }
        res.send(response(status.SUCCESS,await viewPodcastScript(data)));
    } catch (error) {
        res.send(response(status.BAD_REQUEST,error));
    }
}