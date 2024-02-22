import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";


export const joinDocentComment=async(data)=>{
    try {
        console.log(data);
        const conn=await connectToDatabase();
        const teamCollection=conn.collection('teams');
        const teamNumber=Number(data.team)
        const team= await teamCollection.findOne({_id:teamNumber});
        console.log(team);
        const teamId=team._id;

        const docentCollection=conn.collection('docent');
        const docent=await docentCollection.findOne({teamId:teamId});
        const docentId=docent._id;

        const commentCollection=conn.collection('comment');
        const result = await commentCollection.insertOne({
            team_id:teamId,
            type:"docent",
            comment:data.comment,
            created_at:data.created_at
        })
        console.log(result);
        return result.insertedId;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
export const joinShowcaseComment=async(data)=>{
    try {
        console.log(data);
        const conn=await connectToDatabase();
        const teamCollection=conn.collection('teams');
        const teamNumber=Number(data.team)
        const team= await teamCollection.findOne({_id:teamNumber});
        console.log(team);
        const teamId=team._id;

        const docentCollection=conn.collection('podcast');
        const docent=await docentCollection.findOne({team_id:teamId});
        const docentId=docent._id;

        const commentCollection=conn.collection('comment');
        const result = await commentCollection.insertOne({
            team_id:teamId,
            type:"podcast",
            comment:data.comment,
            created_at:data.created_at
        })
        console.log(result);
        return result.insertedId;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
export const getComment=async(data)=>{
    try {
        
        console.log(data);
        const conn=await connectToDatabase();
        const teamCollection=conn.collection('teams');
        const teamNumber=Number(data.team)
        const team= await teamCollection.findOne({_id:teamNumber});
        console.log(team);
        const teamId=team._id;
        const commentCollection=conn.collection('comment');
        const result=await commentCollection.find({team_id:teamId,type:data.type}).toArray();
        console.log(result);
        return result;
    } catch (error) {
        
    }
}
