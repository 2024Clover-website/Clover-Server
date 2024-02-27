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
        const commentCollection=conn.collection('comment');
        const podcastComment=await commentCollection.find({"team_id":teamNumber,"type":"docent"}).toArray();
        const docentCollection=conn.collection('docent');
        const docentData=await docentCollection.find({teamId:teamId}).toArray();
        console.log("도슨트 데이터",docentData);
        const usersCollection=conn.collection('player');
        const userData=await usersCollection.find({team_id:data.team,leader:"1"}).toArray();
        console.log("유저 데이터",userData);
        const result={
            "title":docentData[0].title,
            "record":docentData[0].record,
            "background":docentData[0].background,
            "member":userData,
            "comment_count":podcastComment.length
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
        const commentCollection=conn.collection('comment');
        const podcastComment=await commentCollection.find({"team_id":teamNumber,"type":"docent"}).toArray();
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
            "background":podcastData[0].background,
            "record":podcastData[0].record,
            "member":userData,
            "comment_count":podcastComment.length
        }
        console.log("결과",result);
        return result
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

}
export const getDocentScriptInformation=async(data)=>{
    try {
        console.log(data);
        const conn=await connectToDatabase();
        const scriptCollection= conn.collection('script');
        const scriptData= await scriptCollection.find({team_id:Number(data.team),type_name:"도슨트"}).toArray()
        const usersCollection= conn.collection('player');
        const teamNumber=Number(data.team);
        console.log("도슨트 데이터",scriptData);
        
        const result=[];
        for(let i=0; i<scriptData.length;i++){
            const user=[]
            const userInformaition=await usersCollection.find({"name":scriptData[i].user1}).toArray();
            // console.log("유저정보",userInformaition);
            user.push(userInformaition[0].profile);
            result.push({
                "start_time":scriptData[i].start_time,
                "end_time":scriptData[i].end_time,
                "spend_time":scriptData[i].end_time-scriptData[i].start_time,
                "script":scriptData[i].script,
                "user":scriptData[i].user1,
                
                "profile":user
            })
            
        }

        
        console.log("결과",result);
        return result
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
export const getPodcastScriptInformation=async(data)=>{
    try {
        console.log(data);
        const conn=await connectToDatabase();
        let teamNumber=Number(data.team)
        let teamString=data.team
        
        const scriptCollection= conn.collection('script');
        const scriptData= await scriptCollection.find({team_id:data.team,type_name:"팟캐스트"}).toArray()
        console.log("스크립트",scriptData);
        const usersCollection= conn.collection('player');
        const usersData=[];
        if(teamNumber===6||teamNumber===5){
            teamNumber=5;
            teamString="5";
            const users=await usersCollection.find({team_id:teamString},{team_id:6}).toArray();
            console.log("유저데이터",users);
            for(let i=0;i<users.length;i++){
                usersData.push(
                    users[i].profile
                )
            }
        }else{
            const users=await usersCollection.find({team_id:data.team}).toArray();
            console.log("유저데이터",users);
            for(let i=0;i<users.length;i++){
                usersData.push(
                    users[i].profile
                )
            }
        }

        const result=[];
        for(let i =0; i<scriptData.length;i++){
            if(scriptData[i].user1.includes('모두')){
                result.push({
                    "start_time":scriptData[i].start_time,
                    "end_time":scriptData[i].end_time,
                    "spend_time":scriptData[i].end_time-scriptData[i].start_time,
                    "script":scriptData[i].script,
                    "user":scriptData[i].user1,
                    "profile":usersData
                })
            }else{
                const user=[]
                const userInformaition=await usersCollection.find({"name":scriptData[i].user1}).toArray();
                // console.log("유저정보",userInformaition);
                user.push(userInformaition[0].profile);
                result.push({
                    "start_time":scriptData[i].start_time,
                    "end_time":scriptData[i].end_time,
                    "spend_time":scriptData[i].end_time-scriptData[i].start_time,
                    "script":scriptData[i].script,
                    "user":scriptData[i].user1,
                    "profile":user
                })
            }
        }
        // console.log("결과",result);
        return result;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const addScriptDao=async(data)=>{

    const timeStampData=[];
    for(let i=0;i<data.segments.length;i++){
        timeStampData.push({
            "start_time":data.segments[i].start/1000,
            "end_time":data.segments[i].end/1000,
            "text":data.segments[i].textEdited
        })
    }
    const conn=await connectToDatabase();
    const docentCollection= conn.collection('docent');
    const podcastCollection=conn.collection('podcast');
    const teamCollection=conn.collection('teams');
    const teamNumber=Number(data.team)
    const team= await teamCollection.findOne({_id:teamNumber});
    console.log(team);
    const teamId=team._id;
    
    let typeName=""
    const typeData=[];
    if(data.type.includes("podcast")){
        const typeId=await docentCollection.find({teamId:teamId}).toArray();
        typeData.push(typeId[0])
         typeName="팟캐스트"
    }else{
        const typeId=await docentCollection.find({teamId:teamId}).toArray();
        typeData.push(typeId[0])
        
        typeName="도슨트"
    }
    const scriptCollection=conn.collection('script');
    for(let i =0; i<timeStampData.length;i++){
        
        const scriptData=await scriptCollection.insertOne({
            "start_time":timeStampData[i].start_time,
            "end_time":timeStampData[i].end_time,
            "script":timeStampData[i].text,
            "team_id":teamId,
            "type_id":typeData[0]._id,
            "type_name":typeName
        })
    }
    return "success";
}