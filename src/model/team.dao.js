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
export const getDocentInformation=async(data)=>{
    try {
        console.log(data);
        const conn=await connectToDatabase();
        const teamCollection=conn.collection('teams');
        const teamNumber=Number(data.team)
        const team= await teamCollection.findOne({_id:teamNumber});
        console.log(team);
        const teamId=team._id;
        const docentCollection=conn.collection('docent');
        const docentData=await docentCollection.find({teamId:teamId}).toArray();
        console.log("도슨트 데이터",docentData);
        const usersCollection=conn.collection('player');
        const userData=await usersCollection.find({team_id:data.team}).toArray();
        console.log("유저 데이터",userData);
        const result={
            "title":docentData[0].title,
            "record":docentData[0].record,
            "member":userData
        }
        console.log("결과",result);
        return result

    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getPodcastInformation=async(data)=>{
    try {
        console.log(data);
        const conn=await connectToDatabase();
        const teamCollection=conn.collection('teams');
        const teamNumber=Number(data.team)
        const team= await teamCollection.findOne({_id:teamNumber});
        console.log(team);
        const teamId=team._id;
        const podcastCollection=conn.collection('podcast');
        const podcastData=await podcastCollection.find({team_id:teamId}).toArray();
        console.log("도슨트 데이터",podcastData);
        const usersCollection=conn.collection('player');
        const userData=await usersCollection.find({team_id:data.team}).toArray();
        console.log("유저 데이터",userData);
        if(teamNumber===5){
            const userDataResult=await usersCollection.find({team_id:"6"}).toArray()
            for(let i=0;i<userDataResult.length;i++){
                userData.push(userDataResult[i]);
            }
            
        }else if (teamNumber===6){
            const userDataResult=await usersCollection.find({team_id:"5"}).toArray()
            userData.push(userDataResult[0]);
        }
        console.log("유저 데이터",userData);
        const result={
            "title":podcastData[0].title,
            "record":podcastData[0].record,
            "member":userData
        }
        console.log("결과",result);
        return result
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

}
