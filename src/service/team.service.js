import { BaseError } from "../../config/error.js";
import {status} from "../../config/response.status.js"
import {joinDocentComment,joinShowcaseComment,getComment} from "../model/team.dao.js"

export const insertDocentComment= async (data)=>{
    const getCommentData=await joinDocentComment(data);
    console.log(getCommentData);
    return {"id":getCommentData};
}

export const insertShowcaseComment= async (data)=>{
    const getCommentData=await joinShowcaseComment(data);
    console.log(getCommentData);
    return {"id":getCommentData};
}
export const viewComment=async(data)=>{
    const getCommentData=await getComment(data);
    return getCommentData;
}